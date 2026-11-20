---
name: edicion-estilo-ui-minimal
description: Edita y anima vídeos y motion graphics con estilo UI minimal y premium (fondos limpios, tipografía sans-serif, tarjetas redondeadas, mucho aire, animaciones sutiles con máscara, cristal, sombras suaves y efectos de sonido UI), en Remotion o con pasos para After Effects. Úsala cuando digan «edita este vídeo con estilo minimal», «hazlo estilo UI limpio», «anímalo con el estilo premium», «estilo interfaz de móvil», «motion graphics limpios», «/edicion-estilo-ui-minimal» o pidan animar una pantalla, un texto o un anuncio con ese look.
---

# Edición estilo UI minimal

Sirve para que cualquier vídeo, anuncio o pantalla de app se vea limpio, intencional y premium: color neutro,
tipografía clara, formas redondeadas, composición centrada y movimientos sutiles, suaves y rápidos.
Trabaja por defecto en **Remotion** (plantilla en `plantilla/EstiloUI.tsx`) y da los pasos equivalentes
en **After Effects** cuando el usuario edite allí.

## Método (en este orden: primero el diseño, después el movimiento)

1. **Color** — Fondo blanco, negro o gris muy claro con una capa sólida. Nada de colores chillones ni
   complementarios ([01:24]). Paleta de la fuente ([01:38]):
   | Uso | Hex |
   |---|---|
   | Fondo claro, divisores, tarjetas | `#E5E5EA` (y blanco `#FFFFFF`) |
   | Texto deshabilitado / terciario | `#8E8E93` |
   | Texto secundario, UI sutil | `#3A3A3C` |
   | Fondo oscuro / texto principal | `#1C1C1E` |
   | Acción principal, enlaces, botones | `#007AFF` |
   | Éxito, confirmación | `#34C759` |
   | Aviso | `#FF9500` |
   Usa un solo acento por pantalla.

2. **Tipografía** — Sans-serif geométrica y limpia: **Negrita** para títulos y encabezados; **Regular o
   Medium** para subtítulos y texto pequeño ([01:46]). Texto oscuro sobre fondo blanco ya da el look.
   La fuente del tutorial es propietaria: usa **Inter** (instalada aquí) o la que el usuario tenga con
   licencia (añadido). Títulos con tracking ligeramente negativo (añadido).

3. **Formas y paneles** — Construye la UI con capas de forma (rectángulos) y **siempre esquinas
   redondeadas**: en AE `Rectangle Path › Roundness 145` sobre una tarjeta de ~1264 px ([02:36]); en
   Remotion `borderRadius` ≈ 11 % del lado menor. Para pasar de una forma a otra (cápsula → tarjeta) anima
   **tamaño y redondeo en la misma capa** con keyframes, no cambies de capa ([02:23]). Controla los
   elementos internos (iconos, números, texto) emparentándolos a un **null** ([02:29]); en Remotion, un
   contenedor padre que se mueve.

4. **Espaciado y composición** — Deja mucho espacio vacío alrededor; nada apretado ni accidental. Reduce
   la idea a su forma más simple. **Composición centrada casi siempre**: si está descompensada el ojo no
   sabe dónde mirar y se pierde la atención ([02:45]–[03:04]).

5. **Animación** (solo cuando el diseño ya está limpio) — Sutil, suave y rápida; nada llamativo ni
   dramático ([03:04]). Las tres animaciones base:
   - **Texto que sube con máscara** ([03:13]): keyframes de Position desde abajo (o arriba / izquierda /
     derecha), curva de salida en la gráfica de velocidad — valores vistos en pantalla `0, 0.88, 0.04, 1`
     ([03:28], leído por Gemini) — y **precomp con máscara rectangular** para que aparezca limpio desde
     su propia línea. Remotion: `<SubeConMascara>` (la máscara es la caja con `overflow: hidden`).
   - **Palabra por palabra** ([03:34]): cada palabra en su capa, keyframes de Position y Opacity 0→100 %,
     escalonadas. Remotion: `<PalabraAPalabra>` (con `mascara` para que cada palabra salga de su caja).
   - **Animador de texto en 30 s** ([03:47]–[04:11]): `Animate › Opacity` y `Position`; Position Y `100`
     (o `200` según escala), Opacity `0 %`; `Range Selector › Advanced`: Based On `Words`, Shape
     `Ramp Up`, Ease High `-50 %`, Ease Low `100 %`; keyframes de **Offset de -100 % a 100 %**.
     `<PalabraAPalabra>` reproduce este barrido.

6. **Efectos** (con moderación):
   - **Bisel**: `Layer Styles › Bevel and Emboss` en texto, iconos o cualquier capa, muy sutil ([04:29]).
     Remotion: `boxShadow: BISEL`.
   - **Cristal** ([04:41]): forma como capa de ajuste + `Fast Box Blur` radio **13–21**; duplicado sin
     relleno, con trazo blanco, sin desenfoque ni modo ajuste, fusión **Overlay**, opacidad **30 %**,
     emparentado a la forma o al null. Solo funciona sobre fondo con color o imagen; sobre sólido queda
     transparente ([05:05]). Remotion: `<Cristal desenfoque={17}>`.
   - **Sombra**: muy sutil ([05:13]). AE `Drop Shadow`: negro, opacidad 1–50 % (quédate abajo),
     distancia 10–60, suavidad 100. Remotion: `boxShadow: SOMBRA_SUAVE`.

7. **Sonido** — Cada movimiento lleva un efecto corto y suave (clic, pop, números digitales); si la
   animación es suave, el sonido también ([05:19]–[05:38]). Búsquedas: `ui sfx`, `digital animation sfx`,
   `digital numbers`, `soft ui clicks`. Remotion: `<Sfx en={frame} archivo="click.mp3" />` en el fotograma
   exacto en que empieza el movimiento. Los archivos los pone el usuario en `public/`.

8. **Empieza simple** y ve subiendo a animaciones más complejas ([05:50]).

## Reglas
- Siempre: fondo blanco, negro o gris muy claro; esquinas redondeadas; composición centrada; mucho aire.
- Siempre: diseño primero, animación después; curvas de salida suaves; movimientos cortos.
- Siempre: en revelados de texto usa el método del vídeo — **máscara** (caja con `overflow: hidden` en
  Remotion, precomp con máscara rectangular en AE) — salvo que el usuario pida otra cosa para ese trabajo.
- Siempre: sincroniza un sonido suave con cada aparición, clic o cambio de número.
- Nunca: colores chillones o complementarios, más de un acento por pantalla.
- Nunca: animaciones bruscas, dramáticas, giros exagerados ni transiciones llamativas.
- Nunca: sombras duras u oscuras; nunca tipografías decorativas, serif o manuscritas en la UI.
- Nunca: pantallas recargadas o descompensadas.
- Nunca: logos, nombres ni elementos de marca de terceros; el estilo se aplica a la marca del usuario.

## Ejemplos
- **Del tutorial**: panel tipo widget que nace como cápsula y se transforma en tarjeta cuadrada animando
  Size y Roundness; dentro, icono y número emparentados a un null ([02:23]–[02:44]).
- **Aplicado** (añadido): pantalla de app «Añadir dinero» → el móvil entra desde abajo con curva suave,
  la hoja inferior sube, cada elemento entra escalonado con `SubeConMascara`, las monedas se abren desde
  el eje central y una cámara se aleja lineal durante todo el plano. Ver `add-money-animation/` en el repo.

## Cómo usarla
1. Pide al usuario: el material (capturas, vídeo, textos o diseño de referencia), formato (1080×1080,
   1080×1920…), duración, y si quiere Remotion o pasos para After Effects. Si hay timing concreto
   (duraciones, curvas, escalonado), respétalo por encima de los valores por defecto de aquí.
2. En Remotion: copia `plantilla/EstiloUI.tsx` a `src/`, recrea el diseño aplicando los pasos 1–4 y
   anima con los componentes del paso 5. Duraciones orientativas a 30 fps (añadido): texto 15–21
   fotogramas, objetos 21–30, escalonado 2–4 fotogramas, sin que ninguno espere a que acabe el anterior.
3. Renderiza fotogramas sueltos (`npx remotion still`) para revisar composición y centrado antes del
   vídeo final; luego `npx remotion render`. Aquí el navegador está en
   `/opt/pw-browsers/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell`
   (`--browser-executable`).
4. Entrega el MP4 y di qué técnica del método usaste en cada parte.

## Fuente
- Tutorial de edición de estilo UI minimal (After Effects) · https://youtu.be/5j4HmfgPCDI · visto el
  2026-11-20 con Gemini (YouTube bloqueado desde la nube). Transcripción y análisis visual en
  `../aprende-fuentes/edicion-estilo-ui-minimal/fuentes/`. Los valores marcados «leído por Gemini» salen
  de lo que se ve en pantalla, no de lo que se dice.
