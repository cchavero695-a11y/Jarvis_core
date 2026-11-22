<!-- Análisis de Gemini · modelo gemini-3.5-flash · fuente: https://youtu.be/x361xBKBdic -->

Aquí tienes el tutorial detallado paso a paso para crear, configurar y conectar el chatbot con inteligencia artificial presentado en el vídeo, con sus correspondientes marcas de tiempo **[mm:ss]**:

---

### 1. Introducción y concepto del sistema [00:00 - 01:20]
* **[00:00]** Santiago Muñoz presenta la versión 2.0 de su chatbot de IA (evolución de su tutorial anterior con n8n). El sistema responde 24/7 en WhatsApp, Telegram, Facebook Messenger e Instagram sin intervención humana.
* **[00:12]** Incluye un centro de control (panel de administración) propio para auditar mensajes, costos e historial.
* **[00:23]** **Costo:** Menos de $5 USD al mes, eliminando la necesidad de softwares de suscripciones costosas.
* **[01:21]** **Concepto técnico:** Se utiliza **Claude Code** como el "programador/contratista" (agente ejecutor) y **Forja** como el *framework* ("profesor") que enseña al agente cómo construir el chatbot.

---

### 2. Instalación de Claude Code y preparación del proyecto [01:20 - 03:18]
* **[01:46]** Abre el navegador y busca en Google `Claude Code` (accede a `claude.com/product/claude-code`).
* **[02:01]** Pulsa el botón **Download for macOS** (o versión correspondiente para Windows).
* **[02:09]** Abre la aplicación ejecutable **Claude.app** en la computadora.
* **[02:18]** Inicia sesión con su cuenta de Claude (requiere cuenta con plan de pago Pro/Team para usar el modelo).
* **[02:34]** En el menú superior izquierdo de la app de Claude, hace clic en la pestaña **Code**.
* **[02:44]** Hace clic en el icono de la carpeta (**Abrir carpeta...**).
* **[02:54]** Crea una nueva carpeta local llamada `chatbotia` en Documentos y hace clic en **Abrir**.

---

### 3. Instalación e inicialización del framework Forja [03:18 - 06:43]
* **[03:25]** Entra en la web oficial de Forja: `forjabots.com`.
* **[03:53]** Copia el comando de inicio: `npx forjabot init`.
* **[03:59]** En la consola de chat de Claude Code, escribe: `Instala npx forjabot init` y presiona Enter.
* **[04:08]** **Configuración de permisos:** Para evitar estar autorizando cada paso manualmente, hace clic en el selector inferior de permisos y cambia el modo a **Omitir permisos** / **Habilitar modo automático**.
* **[04:54]** Claude Code ejecuta los scripts en la terminal interna, descarga las dependencias y muestra en pantalla el logotipo ASCII de **FORJA**.
* **[05:11]** Claude confirma: *"Listo - Forja quedó instalado"*.

---

### 4. Autenticación en el CLI de Forja [06:43 - 08:37]
* **[06:48]** Se abre automáticamente una ventana del navegador en la dirección local (`127.0.0.1:4185/...`).
* **[07:07]** Muestra cómo hacerlo manualmente desde la terminal del sistema (Terminal en Mac o PowerShell en Windows):
  1. Abre la app **Terminal.app** [07:52].
  2. Escribe: `npx forjabot login` [07:56].
  3. Se abre el navegador en `app.forjabots.com/auth/login` [07:58].
  4. Pulsa **Continuar con Google** y elige la cuenta corporativa/personal [08:11].
  5. La pantalla muestra: *"Listo - vuelve a la terminal"* [08:15].
* **[08:32]** Regresa a Claude Code y escribe en el chat: `ya estoy conectado continuemos`.

---

### 5. Interrogatorio de configuración del negocio (Prompting) [08:37 - 10:11]
* **[08:41]** Claude Code inicia una serie de preguntas sobre el negocio para armar el prompt base:
  * *¿Cómo se llama tu negocio?* $\rightarrow$ Escribe: `Se llama Forja` [08:50].
  * *¿Qué ofreces exactamente y a qué precio?* $\rightarrow$ Escribe: `es un chatbot para forja tu llena todos los datos basado en ti.` [09:04]. *(Nota: Recomienda responder con el mayor detalle posible sobre precios, FAQ y productos en uso real)*.
* **[09:19]** Claude confirma la configuración con una tabla que muestra: Nombre del negocio, rol del agente, reglas, base de conocimiento y modelo de IA.
* **[09:39]** Escribe en el chat: `Sí quiero ver el diagrama`.
* **[09:46]** Se abre una pestaña en el navegador con el diagrama arquitectónico visual del chatbot (`forjabots.com/diagrama/...`).

---

### 6. Despliegue en la nube mediante Cloudflare Workers [10:11 - 14:43]
* **[10:15]** **Infraestructura:** El bot corre en **Cloudflare Workers** (servidor, base de datos D1, base vectorial Vectorize y almacenamiento R2).
* **[10:27]** Busca en Google `Cloudflare` y entra a `cloudflare.com`. Registra/Inicia sesión gratis.
* **[11:10]** En el chat de Claude Code escribe: `si ya tengo cloudflare`.
* **[11:21]** Claude lanza el comando `wrangler login`.
* **[11:41]** Se abre automáticamente la ventana OAuth de Cloudflare en el navegador con la solicitud: *"Wrangler wants to access your account"*.
* **[11:52]** Pulsa el botón azul **Allow** / **Authorize**. La pantalla confirma *"Authorization granted to Wrangler"* [11:55].
* **[12:05]** **Precios de Cloudflare:** Muestra la sección *Workers plans* en el panel de Cloudflare. El plan gratuito incluye 100,000 solicitudes/día ($0 USD); el plan *Paid* cuesta $5 USD/mes para volumen masivo.
* **[13:24]** Claude Code automáticamente crea y vincula los recursos en la nube (`Creating D1 database...`, etc.).

---

### 7. Configuración del "Cerebro" (Modelo de IA y API Keys) [14:43 - 18:14]
* **[14:17]** Claude da la opción de elegir el proveedor de IA (Anthropic o OpenAI/GPT). Selecciona **GPT (OpenAI)**.
* **[14:34]** Entra en `platform.openai.com/api-keys`. Explicación del modelo de pago por uso (créditos): un chatbot consume entre $1 y $3 USD al mes según el volumen.
* **[15:20]** En OpenAI: Hace clic en **Create new secret key**, le asigna el nombre `FORJA`, pulsa **Create secret key** y copia la clave generada (`sk-...`).
* **[15:33]** En el chat de Claude Code introduce: `ChatGPT [API_KEY]`.

#### Método alternativo seguro por consola [15:36 - 17:44]:
Si por seguridad no se desea pegar la API Key en el chat:
1. Abre la Terminal / PowerShell [15:58].
2. Navega a la carpeta del proyecto: `cd /ruta/a/tu/carpeta` [16:15].
3. Ejecuta: `npx wrangler secret put OPENAI_API_KEY` (o `ANTHROPIC_API_KEY`) [16:23].
4. En el campo oculto `Enter a secret value:`, pega la API key y presiona Enter [17:10]. La consola responde `Success!` [17:16].

* **[17:55]** **Recarga de créditos:** En OpenAI (`Billing` $\rightarrow$ `Overview`), pulsa **Add to credit balance** y recarga el mínimo de $5 USD.

---

### 8. Despliegue final y exploración del Panel de Administración [18:14 - 23:29]
* **[18:18]** Claude completa la instalación y entrega las URLs:
  * URL pública del bot Worker (`https://forja-starter....workers.dev`).
  * URL del panel de administración (`.../admin`) con usuario `admin` y contraseña autogenerada.
* **[18:35]** Pega la URL del panel en el navegador e ingresa las credenciales [18:43].
* **[18:47]** **Panel Forja Admin:** Se muestra el dashboard principal en pantalla.
* **[18:59]** Muestra su panel en producción real: 372 mensajes recibidos en el día, 51 clientes únicos y un costo mensual acumulado de **$3.72 USD** por 2,596 mensajes.
* **[19:40]** Recorrido por las pestañas del panel:
  * **Resumen:** Estado del agente y métricas rápidas.
  * **Conversaciones:** Chat en vivo para ver los mensajes de los clientes e intervenir manualmente si se desea [20:07].
  * **Leads:** Captura automática de prospectos.
  * **Tickets:** Soporte e incidencias.
  * **Flujo:** Topología visual del agente, modelos activos, búfer y herramientas (skills) [20:26]. Permite ajustar parámetros como el *máximo de mensajes por respuesta* y *pausa entre mensajes* [20:50], o el tiempo de espera del *Buffer* [21:06].
  * **Conocimiento:** Base de datos RAG para subir documentos e información del negocio [21:46].
  * **Costos:** Desglose del gasto diario y presupuesto mensual [22:15].

---

### 9. Conexión de Canales: Canales Oficiales y Pruebas [23:29 - 48:44]

#### Canal 1: Telegram [23:31 - 27:28]
1. Abre Telegram Web (`web.telegram.org`) y busca el usuario `@BotFather` [23:55].
2. Envía el comando `/newbot` [24:24].
3. Asigna nombre al bot: `Claudebotpro` [42:32].
4. Asigna nombre de usuario (debe terminar en `bot`): `claudebotprobot` [24:45].
5. BotFather genera el **HTTP API Token**. Santiago lo copia [25:09].
6. En Claude Code escribe: `Si conectemos Telegram te doy mi token de mi bot: [TOKEN]` [25:15].
7. Claude lo configura automáticamente y responde: `Telegram conectado!` [25:48].
8. **Prueba:** En Telegram hace clic en `t.me/claudebotprobot`, pulsa **START** y envía: `hola` [26:15]. Tras la pausa del búfer (15s), el bot responde: *"Te respondo en español. ¿En qué puedo ayudarte hoy?"*. Luego pregunta `como funciona forja` y el bot responde con la información cargada [26:36]. En el panel de control (`Conversaciones`) aparece el chat marcado con la etiqueta de **Telegram** [27:26].

#### Canal 2: WhatsApp (Vía Twilio CLI) [27:29 - 38:12]
1. Se conecta mediante **Twilio** (`twilio.com`) [28:21].
2. **Registro de número en Twilio (Sub-video) [29:00]:**
   * En la consola de Twilio busca `WhatsApp Senders` $\rightarrow$ **Create new sender** [29:29].
   * En *Select a phone number*, hace clic en **Buy a Number** y adquiere un número virtual de EE. UU. ($1.15 USD/mes) [30:08].
   * Pulsa **Continue with Facebook** [30:25]. En la ventana emergente de Meta, selecciona su Portafolio Comercial y Cuenta de WhatsApp Business [30:42].
   * Completa los datos: Nombre (`Santiago Muñoz`), Categoría (`Educación`), País (`México`) [31:00].
   * Selecciona **Agregar un número nuevo**, pega el número de EE.UU. comprado en Twilio y elige verificación por **Mensaje de texto** [31:20].
   * Copia el código de 6 dígitos que Twilio genera en pantalla (`276135`) y lo introduce en la ventana de Meta [31:48]. Pulsa **Confirmar** y **Finalizar** [32:32].
3. **Integración en Claude Code [34:57]:**
   * En Claude Code escribe: `quiero conectar WhatsApp a través de el CLI de Twilio dime que ocupas que te proporcione` [35:04].
   * Claude le solicita el **Account SID** (empieza por `AC...`) y el **Auth Token** [35:34].
   * Santiago va a `console.twilio.com`, copia el `Account SID` y el `Auth Token` [35:52] y los pega en Claude Code [36:27].
   * Claude programa todo automáticamente y responde: `WhatsApp conectado!` [37:18].
4. **Prueba:** Abre WhatsApp y envía al número del bot: `hola a que se dedican` [37:28]. Espera los 15 segundos del búfer y el bot responde en WhatsApp explicando los servicios de Forja [37:47]. En el panel de administración la conversación queda registrada bajo la etiqueta **WhatsApp** [38:04].

#### Comercialización / Forja Plus [38:12 - 40:01]
* Muestra **Forja Plus** (`forjabots.com/entrar`), una solución para quienes quieren revender chatbots a otros negocios. Incluye 12 superpoderes de IA, más de 14 plantillas por nicho (restaurantes, inmobiliarias, barberías, etc.), modo agencia y kits de onboarding.

#### Canales 3 y 4: Facebook Messenger e Instagram (Vía ManyChat) [40:02 - 47:50]
1. En Claude Code escribe: `quiero hacer el de manychat` [40:14].
2. Claude le solicita la **Clave de API** de ManyChat [41:07].
3. Va a `app.manychat.com` $\rightarrow$ **Configuración** $\rightarrow$ **API** $\rightarrow$ Pulsa **Obtener Clave de API** y la copia [41:39].
4. Pega la API Key en el chat de Claude Code [41:45].
5. Claude devuelve las instrucciones exactas de configuración del Webhook en ManyChat [42:22]:
   * En ManyChat $\rightarrow$ **Automation** (Automatización) $\rightarrow$ **Default Reply** (Respuesta predeterminada) [43:30].
   * Disparador: *El usuario envía un mensaje directo* (Asegurarse de que esté seleccionado `Every time` / Cada vez) [43:43].
   * Borra el bloque de texto por defecto [43:51].
   * Añade una **Acción** $\rightarrow$ **Realizar solicitud externa** (External Request) [43:58].
   * Configura la solicitud:
     * **Tipo de solicitud:** `POST` [44:33].
     * **Solicitar URL:** Pega la URL del Webhook suministrada por Claude (`https://...workers.dev/webhooks/manychat`) [44:40].
     * **Pestaña Cuerpo (Body):** Hace clic en **Añadir Full Contact Data** [44:49].
     * **Pestaña Encabezados (Headers):** Añade la Key `X-Api-Key` y en Value pega el token secreto proporcionado por Forja para autenticación [45:44].
   * Pulsa **Guardar** y luego **Publicar en vivo** [44:59].
6. En Claude Code confirma escribiendo: `listo ya esta` [45:19].
7. **Prueba en Messenger:** Entra a Facebook Messenger y envía un mensaje a la página [46:24]. El bot procesa el mensaje e interviene en vivo respondiendo automáticamente [47:13]. En el panel de control aparece la conversación marcada con la etiqueta **ManyChat** [47:05].
8. **Instagram:** Santiago aclara que para Instagram el proceso es 100% idéntico dentro de ManyChat, únicamente conectando la cuenta de Instagram Business a la plataforma [47:25].

---

### 10. Cierre y apoyo a la comunidad [47:51 - 48:44]
* Santiago concluye el tutorial invitando a dejar preguntas en los comentarios y a apoyar el proyecto de código abierto mediante tres acciones directas:
  1. Dar Like y suscribirse al canal de YouTube [48:08].
  2. Ir al repositorio oficial de GitHub (`github.com/santimunoz/forja`) y hacer clic en el botón de la estrella (**Star**) [48:18].
  3. Dejar un voto positivo (**Upvote**) en la página del lanzamiento en Product Hunt (`producthunt.com`) [48:33].
