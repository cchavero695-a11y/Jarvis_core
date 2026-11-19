#!/usr/bin/env python3
"""ver_video.py · manda un vídeo (archivo o enlace de YouTube) a Gemini para que lo vea y lo escuche.

Uso:
  python3 ver_video.py comprobar
  python3 ver_video.py modelos
  python3 ver_video.py analizar <archivo|url_youtube> [--pregunta "..."] [--modelo NOMBRE]
                       [--salida archivo.md] [--desde 1:30 --hasta 2:45]

La clave se lee de GEMINI_API_KEY (o GOOGLE_API_KEY) y va en la cabecera x-goog-api-key.
Solo usa la librería estándar de Python.
"""
from __future__ import annotations

import argparse
import json
import mimetypes
import os
import re
import ssl
import sys
import time
import urllib.error
import urllib.request
from pathlib import Path

BASE = "https://generativelanguage.googleapis.com"
CTX = ssl.create_default_context(cafile=os.environ.get("SSL_CERT_FILE") or None)

PROMPT_BASE = """Analiza este vídeo completo: lo que se VE y lo que se OYE. Responde en español, en Markdown,
con estas secciones y sin inventar nada que no esté en el vídeo:

## Resumen
2-4 frases: de qué trata, para quién parece hecho y qué transmite.

## Lo que se ve, escena por escena
Lista con marca de tiempo [mm:ss] al inicio de cada escena: qué aparece, acciones, movimientos de cámara,
transiciones y efectos.

## Texto en pantalla
Todo texto visible, literal, con su [mm:ss]. Si no hay, dilo.

## Lo que se oye
- Transcripción literal de lo que se dice, con [mm:ss] y quién habla (si se distingue). Si no hay voz, dilo.
- Música y efectos de sonido: estilo, ritmo, cuándo cambian.

## Estilo y producción
Paleta de colores, tipografías, tipo de animación o grabación (3D, motion graphics, cámara real, pantalla...),
ritmo de montaje, formato y duración aproximada. Qué herramientas podrían haberse usado (indica que es una estimación).

## Momentos clave
Los 3-6 momentos más importantes con su [mm:ss] y por qué importan."""


def clave() -> str:
    k = os.environ.get("GEMINI_API_KEY") or os.environ.get("GOOGLE_API_KEY")
    # En Claude Code en la nube la clave real la pone el proxy; basta un valor de relleno.
    return k or "proxy-injected"


def _req(metodo: str, url: str, datos=None, cab: dict | None = None, tiempo=600):
    h = {"x-goog-api-key": clave()}
    h.update(cab or {})
    if isinstance(datos, (dict, list)):
        datos = json.dumps(datos).encode()
        h.setdefault("Content-Type", "application/json")
    r = urllib.request.Request(url, data=datos, headers=h, method=metodo)
    try:
        resp = urllib.request.urlopen(r, context=CTX, timeout=tiempo)
    except urllib.error.HTTPError as e:
        cuerpo = e.read().decode(errors="ignore")
        try:
            msg = json.loads(cuerpo)["error"]["message"]
        except Exception:
            msg = cuerpo[:400]
        raise RuntimeError(f"Gemini respondió {e.code}: {msg}") from None
    except urllib.error.URLError as e:
        raise RuntimeError(f"No se pudo conectar con Gemini: {e.reason}") from None
    return resp


def _json(metodo, url, datos=None, cab=None, tiempo=600) -> dict:
    with _req(metodo, url, datos, cab, tiempo) as r:
        t = r.read().decode()
    return json.loads(t) if t.strip() else {}


# ---------------------------------------------------------------- modelos
def listar_modelos() -> list[str]:
    nombres, token = [], ""
    while True:
        url = f"{BASE}/v1beta/models?pageSize=200" + (f"&pageToken={token}" if token else "")
        d = _json("GET", url)
        for m in d.get("models", []):
            if "generateContent" in m.get("supportedGenerationMethods", []):
                nombres.append(m["name"].split("/", 1)[1])
        token = d.get("nextPageToken")
        if not token:
            return nombres


def _version(n: str) -> tuple:
    m = re.search(r"gemini-(\d+(?:\.\d+)?)", n)
    return (float(m.group(1)) if m else 0.0,)


def elegir_modelo() -> str:
    """El Flash estable más nuevo que ve vídeo (sin lite, tts, imagen, live ni previews si hay estable)."""
    if os.environ.get("GEMINI_MODEL"):
        return os.environ["GEMINI_MODEL"]
    ms = [m for m in listar_modelos() if m.startswith("gemini-") and "flash" in m
          and not re.search(r"lite|tts|image|live|audio|thinking|exp|embedding|8b", m)]
    if not ms:
        return "gemini-2.5-flash"
    estables = [m for m in ms if "preview" not in m] or ms
    estables.sort(key=lambda m: (_version(m), m.endswith("latest"), -len(m)), reverse=True)
    return estables[0]


# ---------------------------------------------------------------- subir archivo
def subir(ruta: Path) -> dict:
    tam = ruta.stat().st_size
    mime = mimetypes.guess_type(str(ruta))[0] or "video/mp4"
    print(f"Subiendo {ruta.name} ({tam / 1e6:.1f} MB) a Gemini...", file=sys.stderr, flush=True)
    with _req("POST", f"{BASE}/upload/v1beta/files", {"file": {"display_name": ruta.name[:100]}}, {
        "X-Goog-Upload-Protocol": "resumable",
        "X-Goog-Upload-Command": "start",
        "X-Goog-Upload-Header-Content-Length": str(tam),
        "X-Goog-Upload-Header-Content-Type": mime,
    }) as r:
        url_subida = r.headers.get("x-goog-upload-url")
    if not url_subida:
        raise RuntimeError("Gemini no devolvió la dirección de subida")
    with open(ruta, "rb") as f:
        d = _json("POST", url_subida, f.read(), {
            "Content-Length": str(tam),
            "X-Goog-Upload-Offset": "0",
            "X-Goog-Upload-Command": "upload, finalize",
        }, tiempo=1800)
    arch = d["file"]
    # Gemini procesa el vídeo antes de poder usarlo
    t0 = time.time()
    while arch.get("state") == "PROCESSING":
        if time.time() - t0 > 900:
            raise RuntimeError("Gemini tardó más de 15 min en procesar el vídeo")
        time.sleep(4)
        arch = _json("GET", f"{BASE}/v1beta/{arch['name']}")
    if arch.get("state") != "ACTIVE":
        raise RuntimeError(f"Gemini no pudo procesar el vídeo (estado {arch.get('state')})")
    return arch


def borrar(nombre: str) -> None:
    try:
        _req("DELETE", f"{BASE}/v1beta/{nombre}").close()
    except Exception:
        pass  # Gemini los borra solo a las 48 h


# ---------------------------------------------------------------- analizar
def _seg(t: str | None):
    if not t:
        return None
    p = [int(x) for x in t.split(":")]
    s = 0
    for x in p:
        s = s * 60 + x
    return f"{s}s"


def analizar(args) -> int:
    fuente = args.fuente
    es_url = re.match(r"^https?://", fuente) is not None
    if es_url and not re.search(r"(youtube\.com|youtu\.be)/", fuente):
        print("ERROR  Gemini solo acepta enlaces de YouTube. Para otros sitios, descarga el vídeo y pasa el archivo.")
        return 1
    try:
        modelo = args.modelo or elegir_modelo()
        subido = None
        if es_url:
            parte = {"file_data": {"file_uri": fuente}}
        else:
            ruta = Path(fuente).expanduser()
            if not ruta.exists():
                print(f"ERROR  no existe {ruta}")
                return 1
            subido = subir(ruta)
            parte = {"file_data": {"mime_type": subido["mimeType"], "file_uri": subido["uri"]}}
        if args.desde or args.hasta:
            vm = {}
            if args.desde:
                vm["start_offset"] = _seg(args.desde)
            if args.hasta:
                vm["end_offset"] = _seg(args.hasta)
            parte["video_metadata"] = vm
        pregunta = PROMPT_BASE if not args.pregunta else (
            "Mira y escucha este vídeo completo y responde en español, sin inventar nada que no esté "
            "en el vídeo, citando las marcas de tiempo [mm:ss] relevantes:\n\n" + args.pregunta)
        print(f"Gemini ({modelo}) está viendo y escuchando el vídeo...", file=sys.stderr, flush=True)
        d = _json("POST", f"{BASE}/v1beta/models/{modelo}:generateContent",
                  {"contents": [{"role": "user", "parts": [parte, {"text": pregunta}]}]}, tiempo=900)
        if subido:
            borrar(subido["name"])
        cands = d.get("candidates") or []
        if not cands:
            raise RuntimeError("Gemini no devolvió respuesta: " + json.dumps(d.get("promptFeedback", d))[:300])
        texto = "".join(p.get("text", "") for p in cands[0].get("content", {}).get("parts", [])
                        if not p.get("thought"))
        if not texto.strip():
            raise RuntimeError(f"respuesta vacía (motivo: {cands[0].get('finishReason')})")
    except RuntimeError as e:
        print(f"ERROR  {e}")
        return 1
    cab = f"<!-- Análisis de Gemini · modelo {modelo} · fuente: {fuente} -->\n\n"
    if args.salida:
        Path(args.salida).expanduser().write_text(cab + texto + "\n", encoding="utf-8")
        print(f"Guardado en {args.salida}", file=sys.stderr)
    print(cab + texto)
    return 0


def comprobar(_a=None) -> int:
    if not (os.environ.get("GEMINI_API_KEY") or os.environ.get("GOOGLE_API_KEY")):
        print("AVISO  no hay GEMINI_API_KEY en el entorno (en Claude Code en la nube puede ponerla el proxy).")
    try:
        ms = listar_modelos()
    except RuntimeError as e:
        print(f"ERROR  {e}")
        print("Saca una clave gratis en https://aistudio.google.com/apikey y guárdala como GEMINI_API_KEY.")
        return 1
    print(f"OK  conexión con Gemini · {len(ms)} modelos · se usará: {elegir_modelo()}")
    return 0


def modelos(_a=None) -> int:
    try:
        for m in listar_modelos():
            print(m)
    except RuntimeError as e:
        print(f"ERROR  {e}")
        return 1
    return 0


def main() -> int:
    ap = argparse.ArgumentParser(description="Gemini ve y escucha vídeos")
    sub = ap.add_subparsers(dest="cmd", required=True)
    sub.add_parser("comprobar").set_defaults(fn=comprobar)
    sub.add_parser("modelos").set_defaults(fn=modelos)
    a = sub.add_parser("analizar")
    a.add_argument("fuente", help="archivo de vídeo/audio o enlace de YouTube")
    a.add_argument("--pregunta", help="pregunta concreta en vez del análisis completo")
    a.add_argument("--modelo", help="modelo de Gemini (por defecto, el Flash más nuevo)")
    a.add_argument("--salida", help="guardar el análisis en este archivo .md")
    a.add_argument("--desde", help="analizar solo desde mm:ss")
    a.add_argument("--hasta", help="analizar solo hasta mm:ss")
    a.set_defaults(fn=analizar)
    args = ap.parse_args()
    return args.fn(args)


if __name__ == "__main__":
    sys.exit(main())
