# Jarvis_core

Repositorio de skills de Jarvis. Todas viven en `.claude/skills/` y Claude Code las carga solas.

## Claves (Claude Code en la nube)

Las claves están guardadas como **Secretos de red** del entorno: el proxy las añade solo a las peticiones a su host.
Claude nunca las ve. Por eso las variables de entorno pueden estar vacías: usa un valor de relleno.

| Servicio | Host | Cabecera | Variable de relleno |
|---|---|---|---|
| Gemini (skill `ver-video`) | `generativelanguage.googleapis.com` | `x-goog-api-key` | `GEMINI_API_KEY` |
| ScrapeCreators (skills de redes sociales) | `api.scrapecreators.com` | `x-api-key` | `SCRAPECREATORS_API_KEY` |

Ejemplo: `curl -s "https://api.scrapecreators.com/v1/instagram/profile?handle=USUARIO" -H "x-api-key: ${SCRAPECREATORS_API_KEY:-proxy}"`

Si una llamada falla con 401/403 o «no rule allows host», la clave no está guardada: guía al usuario a
Entorno «Default» → ⚙️ → Secretos de red → Agregar secreto (host y cabecera de la tabla, prefijo vacío).

## Analizar un perfil a partir de su link

Cuando el usuario pase el link de un perfil (Instagram, TikTok, YouTube, Facebook…) para conocer su estrategia:

1. Saca el `handle` del link y usa `creator-profile-teardown` con `scrapecreators-api` como capa de datos:
   perfil, últimas 30–50 publicaciones y reels (texto, hashtags, fecha, likes, comentarios, vistas).
2. `outlier-post-finder`: qué publicaciones superan el promedio del propio perfil.
3. Para los 3–5 reels con mejor rendimiento, descarga el vídeo (URL del JSON) y pásalo por `ver-video`
   (Gemini) para el gancho, lo que dice, el texto en pantalla, la música, la edición y el llamado a la acción.
   Si la descarga del vídeo falla, usa `/v2/instagram/media/transcript` para la transcripción.
4. `comment-mining` en las publicaciones top para saber qué pide y pregunta su público.
5. Entrega un informe: temas y su proporción, formatos y cuál rinde más, frecuencia y horarios, ganchos y frases,
   cómo vende (CTA, enlaces, ofertas), y qué copiar, qué mejorar y qué huecos deja libres para el usuario.

Cuida los créditos de ScrapeCreators: antes de un análisis grande, di cuántas consultas aproximadas hará.
Solo datos públicos; nunca intentes ver cuentas privadas ni extraer datos personales para contactar gente.
