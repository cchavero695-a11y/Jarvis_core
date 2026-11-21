# Jarvis

Asistente personal al estilo del Jarvis de Iron Man, hecho como una **skill de Claude**.
Funciona dentro de la app de Claude con tu suscripción, sin costos de API.

## Qué hace

- Cualifica siempre el objetivo real y el nivel de conciencia del usuario, sin frenar el avance.
- Respuestas breves: no repite lo que el usuario ya sabe.
- Te llama "señor", con un tono elegante, considerado y un toque breve de humor.
- Responde, investiga, resuelve problemas, crea cuadros, esquemas y presentaciones.
- Entiende mensajes dictados por voz.

## Instalación (desde el iPad)

1. Descarga `dist/jarvis.zip` de este repositorio.
2. En la app o web de Claude, ve a **Configuración → Capacidades** y verifica que estén activadas
   **"Ejecución de código y creación de archivos"** y **Skills**.
3. En la sección **Skills**, toca **"Subir skill"** y elige `jarvis.zip`.
4. Activa la skill **jarvis**.

> Las skills necesitan un plan de pago (Pro, Max, Team o Enterprise).
> Si los nombres de los menús cambian un poco, busca la sección "Skills" o "Capacidades".

### Para que Jarvis esté siempre activo (recomendado)

En **Configuración → Perfil → Preferencias** (instrucciones personales), agrega:

```
Usa siempre la skill "jarvis" en todas las conversaciones.
```

## Que Jarvis sea consistente en toda la conversación (recomendado)

Una skill se activa cuando Claude la considera necesaria, y en conversaciones largas sus reglas pueden ir perdiendo fuerza. Para que se apliquen siempre:

1. En Claude, crea un **Proyecto** llamado "Jarvis".
2. En las **instrucciones del proyecto**, pega el contenido de `dist/instrucciones-proyecto.txt`.
3. Habla con Jarvis siempre desde chats dentro de ese proyecto.

Si cambias `.claude/skills/jarvis/SKILL.md`, regenera ese archivo y actualiza las instrucciones del proyecto.

## Cómo usarlo con voz

En lugar del modo de voz, usa el **chat normal con el micrófono del teclado** del iPad:

- Hablas con las pausas que quieras y envías cuando terminas.
- Tienes todas las herramientas: búsqueda, tablas, diagramas, presentaciones.
- Activa el **pensamiento extendido** para problemas difíciles.
- Para que te lea las respuestas: **Ajustes → Accesibilidad → Contenido leído → Leer selección**.

## Actualizar la skill

La skill está en `.claude/skills/jarvis/SKILL.md`. Después de cambiarla, regenera el zip:

```bash
cd .claude/skills && zip -r ../../dist/jarvis.zip jarvis
```

y vuelve a subirlo en Claude, reemplazando la versión anterior.

## Skill "ver-video": Gemini ve y escucha tus videos

Carpeta `.claude/skills/ver-video/` (zip listo en `dist/ver-video.zip`). Manda un video adjunto o un enlace de YouTube a Gemini
y devuelve: resumen, escenas con marcas de tiempo, texto en pantalla, transcripción, música, estilo y momentos clave.

- Necesita una clave gratis de Google AI Studio: https://aistudio.google.com/apikey
- En Claude Code en la nube: se guarda como secreto de red del entorno para `generativelanguage.googleapis.com`
  (cabecera `x-goog-api-key`). En tu ordenador: `export GEMINI_API_KEY=...`.
- Prueba: `python3 .claude/skills/ver-video/motor/ver_video.py comprobar`

## Skill "aprende": de videos a skills

Carpeta `.claude/skills/aprende/` (zip en `dist/aprende.zip`). Origen: github.com/deniscorral3am/aprende-skill (MIT).
Mira videos de YouTube, listas, canales o pódcasts, aprende el método y lo guarda como skill nueva en `.claude/skills/`.

## Skills en este repositorio

Todas las skills viven en `.claude/skills/`: `jarvis`, `ver-video` y `aprende`. Claude Code las carga solas en cualquier
sesión abierta sobre este repositorio. Para la app de Claude, sube los zips de `dist/` en Configuración → Skills.

## Skills de investigación de redes sociales (ScrapeCreators)

13 skills en `.claude/skills/` (origen: github.com/ScrapeCreators/social-media-research-skills, MIT):
`creator-profile-teardown`, `outlier-post-finder`, `transcript-intelligence`, `comment-mining`,
`competitor-social-research`, `trend-discovery`, `influencer-prospecting`, `audience-research`,
`ad-library-teardown`, `social-listening-brief`, `product-demand-research`, `content-repurposing` y `scrapecreators-api`.

Necesitan una clave de scrapecreators.com guardada como Secreto de red del entorno
(host `api.scrapecreators.com`, cabecera `x-api-key`, sin prefijo). Ver `CLAUDE.md` para el flujo
"analizar un perfil a partir de su link".
