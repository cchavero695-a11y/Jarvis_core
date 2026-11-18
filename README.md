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

Si cambias `jarvis/SKILL.md`, regenera ese archivo y actualiza las instrucciones del proyecto.

## Cómo usarlo con voz

En lugar del modo de voz, usa el **chat normal con el micrófono del teclado** del iPad:

- Hablas con las pausas que quieras y envías cuando terminas.
- Tienes todas las herramientas: búsqueda, tablas, diagramas, presentaciones.
- Activa el **pensamiento extendido** para problemas difíciles.
- Para que te lea las respuestas: **Ajustes → Accesibilidad → Contenido leído → Leer selección**.

## Actualizar la skill

La skill está en `jarvis/SKILL.md`. Después de cambiarla, regenera el zip:

```bash
cd jarvis/.. && zip -r dist/jarvis.zip jarvis
```

y vuelve a subirlo en Claude, reemplazando la versión anterior.
