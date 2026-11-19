---
name: ver-video
description: Usa Gemini para ver y escuchar un vídeo completo (archivo subido al chat o enlace de YouTube) y devuelve qué se ve escena por escena, el texto en pantalla, la transcripción de lo que se oye, la música, el estilo y los momentos clave, con marcas de tiempo. Úsala cuando el usuario adjunte un vídeo o pegue un enlace de YouTube y diga «mira este vídeo», «descríbeme este vídeo», «qué se ve en este vídeo», «qué dice el vídeo», «escucha este vídeo», «analiza este vídeo», «cómo está hecho este vídeo» o haga cualquier pregunta sobre el contenido de un vídeo.
---

# ver-video · Gemini ve y escucha el vídeo por ti

Claude no puede reproducir vídeo ni audio. Esta skill se lo manda a Gemini (gratis, con clave de Google AI Studio),
que lo ve y lo escucha completo, y tú (Claude) le entregas al usuario la respuesta clara y en su idioma.

`M` = carpeta de esta skill + `/motor`.

## 01 · Comprobar (la primera vez de cada conversación)
```bash
python3 $M/ver_video.py comprobar
```
- Si dice ERROR por la clave: el usuario la saca gratis en https://aistudio.google.com/apikey.
  - En Claude Code en la nube: pídela con el formulario seguro de credenciales para el host
    `generativelanguage.googleapis.com`, cabecera `x-goog-api-key`. Nunca le pidas que la pegue en el chat.
  - En su ordenador: `export GEMINI_API_KEY=...` antes de abrir Claude.
- Si dice que no se puede conectar: la red no deja llegar a `generativelanguage.googleapis.com`. Díselo y explica
  que hay que permitir ese dominio.

## 02 · Mandar el vídeo
```bash
python3 $M/ver_video.py analizar <ruta_o_enlace_youtube> [--pregunta "..."] [--desde mm:ss --hasta mm:ss]
```
- Vídeo adjuntado al chat: pasa la ruta del archivo subido. Enlace de YouTube: pásalo tal cual (debe ser público).
- Otros sitios (Instagram, TikTok, Pinterest…): Gemini no los abre. Pide el archivo descargado.
- Sin `--pregunta` hace el análisis completo (resumen, escenas, texto en pantalla, transcripción, música, estilo,
  momentos clave). Con `--pregunta` responde solo a eso. Usa `--desde/--hasta` en vídeos largos si solo importa un tramo.
- Varios vídeos: lánzalos uno a uno.
- Tarda entre unos segundos y unos minutos según la duración. El archivo se borra de Google al terminar.

## 03 · Entregar
- Dale al usuario lo que pidió, breve y claro. No pegues el informe entero si solo preguntó una cosa.
- Si Gemini dice algo dudoso y tienes el archivo, compruébalo tú mismo sacando fotogramas con ffmpeg.
- Di siempre que el análisis lo hizo Gemini.

## Junto con otras skills
- **aprende**: si el método del vídeo depende de lo que se muestra en pantalla, ejecuta antes esta skill y usa su
  análisis junto con la transcripción para escribir la skill nueva.

## Reglas
- Nunca inventes lo que no está en la respuesta de Gemini.
- El plan gratis de Gemini tiene límite de usos al día y Google puede usar lo que se le envía para mejorar sus
  modelos: avisa la primera vez y no mandes vídeos privados o sensibles sin que el usuario lo confirme.
- No compartas la clave ni la escribas en ningún archivo.
