<!-- Análisis de Gemini · modelo gemini-3.5-flash · fuente: https://youtu.be/x361xBKBdic -->

Aquí tienes la transcripción completa del vídeo, indicando el canal/título que se observa y con marcas de tiempo cada 30 segundos aproximadamente:

---

**Canal:** Santi Muñoz  
**Título del vídeo de referencia en pantalla:** El Chatbot que Hace TODO. / n8n (Tutorial Paso a Paso)

---

### Transcripción literal

**[00:00]**  
Al terminar este video vas a tener un chatbot de inteligencia artificial respondiendo en tus redes sociales: WhatsApp, Instagram, Facebook, Telegram 24/7 sin que tú tengas que mover un dedo. Y no solo eso, también vas a tener un centro de control donde vas a poder ver toda la información de tu bot, los mensajes que responde, sus costos o si quieres hacerle alguna modificación. Y todo esto que te acabo de mencionar por menos de $5 al mes. De hecho, tú solo vas a tener que pagar por tu inteligencia artificial, no vas a tener que pagar softwares carísimos. Este va a ser tu bot.

**[00:30]**  
Me llamo Santiago, llevo dos años haciendo sistemas con inteligencia artificial y hace un año hice un video que cambió la vida de cientos de personas, donde les enseñé a crear un chatbot con n8n. Y el día de hoy vamos a crear la versión mejorada. ¿Y qué tan seguro estoy de esto? Pues si no lo logran, pueden dejar de seguirme. Ahora sí, empecemos. Perfecto, pues hace un año subí este video y la verdad, explotó. Cientos de personas lo aplicaron para sus negocios, para ellos mismos, y con todos sus comentarios, con todos los aprendizajes, pude hacer una versión mucho mejor.

**[01:00]**  
Para que se den una idea, este bot de aquí respondió más de 40,000 mensajes míos, me cambió la vida prácticamente, y en este video les voy a enseñar a crear una nueva y mejor versión. Entonces, vamos a empezar, los voy a llevar literal en pasito a pasito desde cero para que no tengan ningún problema. Primer paso: Claude Code. Este bot que están a punto de ver lo vamos a armar con Claude Code, pero algo importante que entiendan: Claude Code no va a ser el bot, Claude Code va a ser el que programe al bot, entiendan eso.

**[01:30]**  
Cuando armamos este bot, realmente lo hicimos muy manual, lo hicimos moviendo cuadritos, en este caso ya no van a tener que hacer eso, ya va a ser todo hablándole a una inteligencia artificial, que en este caso vamos a usar Claude Code. Para esto, vamos a buscar en internet Claude Code. El primer requisito para este video es que tengan una cuenta de Claude. Realmente esta, si aún no la tienen, confíen en mí que es la mejor inversión, en mi opinión. Entonces, van a venir a este enlace que se los voy a dejar aquí abajo y van a darle aquí donde dice download for macOS o para Windows, donde estén, ¿no?

**[02:00]**  
Una vez lo descarguen en su computadora, van a abrir la aplicación de Claude. Simplemente buscan Claude y van a tener esta aplicación, perfecto. Dejen... okay. Si es la primera vez que entran, les va a pedir que creen su cuenta o inicien sesión con su cuenta y van a ocupar algún plan, el de 20, 100 o 200. La diferencia va a ser la rapidez con la que lo hagan, pero con los tres lo pueden lograr, no se tienen que limitar. Una vez ya hayan iniciado su cuenta y ya estén aquí, vamos a venir al apartado que dice Code, aquí arriba a la izquierda. Perfecto.

**[02:30]**  
Ya aquí en el apartado de Code, vamos a... van a darle aquí, vean que hay como un símbolo de carpeta, denle ahí y díganle abrir carpeta, perfecto. Okay, aquí lo que vamos a hacer es crear una carpeta. Creen una carpeta donde quieran. Yo la voy a... crear carpeta, le voy a poner chatbot_ia, ¿no? El nombre que ustedes quieran. Crear y le vamos a decir abrir. Perfecto. Si la interfaz cambia para cuando vean este video, créanme que es lo mismo, simplemente busquen, las aplicaciones luego cambian dónde están las cosas, pero solo búsquenle, pero es esencialmente crear una carpeta.

**[03:00]**  
Perfecto. Ya que crearon una carpeta, vamos a pasar al siguiente paso. Vamos a venir a internet y me complace anunciarles Forja. Okay, ¿qué es Forja? Van a buscar forjabots.com, el enlace se los dejo aquí abajo. Forjabots.com, ¿es una aplicación o qué es? Okay, Forja es un framework diseñado para que sus agentes de IA puedan armar chatbots. Santi, ¿cómo funciona eso? Okay, vean a Forja como el profesor de Claude o de su agente de IA que le va a decir cómo crear el chatbot. Entonces, como aquí dice, dale a tu agente el poder de crear chatbots de IA.

**[03:30]**  
Pero lo único que tienen que hacer es copiar este comando, síganme aquí, copian este comando, van a venir a Claude y le van a decir "instala" y pegan eso. Okay, una vez lo peguen, simplemente literal le voy a dar enter. Perfecto. Aquí en Claude Code les recomiendo que le den aquí abajo y le den en omitir permisos, habilitar. Los va a mandar aquí a Ajustes, seguramente, sí, y lo que tienen que hacer es bajar, bajar, bajar, bajar, bajar, aquí, "permitir modo omisión de permisos". Esto es para que Claude trabaje más rápido sin que les pida verificación. Yo les recomiendo eso. Entonces, volvamos a Code a nuestra sesión.

**[04:00]**  
Okay, perfecto, entonces una vez le dijimos eso de instala Forja, básicamente va a instalar eso en su computadora, que es básicamente todo lo que Claude va a ocupar para crear su chatbot. Entonces, si les pide algún permiso, denle aquí permitir una vez. Ahí está, entonces podemos ver aquí que ya está instalándolo.

**[04:30]**  
Vean ahí... perfecto, vean ahí ya lo instaló, aquí aparece Forja, y aquí dice "Guía de Forja instalada para tu agente". Igual va a instalar algunos skills que va a ocupar para que Claude sepa cómo usar Forja. Entonces ahí ya está instalando todo. Okay, nos dice: "Listo, Forja quedó instalado". ¿Vieron lo sencillo que fue? Literal, copiar y pegar una cosa, enter y ya.

**[05:00]**  
Nos dice: esto pasó, se descargó el bot Starter, se creó tu licencia gratis, se instaló la guía de Forja, perfecto. Entonces aquí nos dice: antes de seguir te explico rápido cómo funciona sin tecnicismos. Creé Forja de tal manera que se los va a explicar como si fuera yo. Entonces aquí les dice: te voy a armar un chatbot de IA para tu negocio, va a vivir en tu propia cuenta de Cloudflare, ahorita les explico eso. Aquí les va a decir los costos, que ahorita se los explico, pero créanme que va a ser baratísimo, menos de $5 al mes. Yo corro todos los comandos por ti, tú solo tienes que hacer estas dos cosas. Entonces pasemos a configurarlo, vamos a decirle sí, le entramos a configurar.

**[05:30]**  
Perfecto, vamos a darle permitir, vean cómo me está pidiendo permisos, es porque todavía no se cambió a omitir permisos. Lo voy a cambiar para que ya no me pida... no me lo permitió. Bueno, denle a auto, el modo automático también es muy similar. Perfecto, entonces nos dice: perfecto, tienes todo listo. Lo primero que hace es verificar su computadora si tienen lo necesario para la instalación, si no tienen algo, él mismo lo va a instalar, no se preocupen, todo es superseguro.

**[06:00]**  
Entonces aquí nos dice: ahorita te creo tu cuenta de Forja para que veas tu bot llegar a tu panel en vivo, ¿no? Perfecto. Otra cosa, esto igual es open, si tienen dudas lo pueden ir a ver. Okay, perfecto, vamos a volver para acá. Okay, perfecto. Lo que acaban de ver, básicamente vieron que me abrió mi buscador. Okay, lo que pasó ahorita es que Claude va a pedirles que inicien sesión. Como yo ya tenía mi sesión iniciada en Forja, ya me dice "Listo, vuelve a tu terminal".

**[06:30]**  
Pero si ustedes es la primera vez que lo están haciendo, dejen ver si lo puedo repetir. Haz logout de Forja... más bien déjenme voy acá. Vean, aquí es donde van a tener el panel, déjenme cierro la sesión. Y le voy a decir "haz logout de Forja". Okay, solo se los quiero enseñar por si a ustedes les sale diferente para que vean qué es lo que les va a aparecer literalmente si es la primera vez que lo están haciendo.

**[07:00]**  
Okay, perfecto, nos dice sesión cerrada. Okay, nos dice: cuando quieras volver a conectar tu bot a tu panel, corro esto de nuevo. Okay, ¿cómo funciona esto? Realmente este comando Claude lo va a correr, pero si ustedes quieren saber un poco cómo funciona, si yo copio este comando, busco en mi computadora Terminal, o en Windows es PowerShell, y pego ese comando, vean, me manda a internet y me va a pedir iniciar sesión. Esto es lo que les debería aparecer a ustedes. Si no les aparece, copien este enlace que les van a dar aquí en su internet y los debería mandar a esta página.

**[07:30]**  
Entonces ahora, simplemente le voy a dar continuar con Google y lo que les va a dar acceso a esto es a que tengan su dashboard donde su bot van a poder ver toda la información y data de su bot. Perfecto, entonces nos dice: listo, vuelve a tu terminal, y vean aquí ya nos dice "Conectado". Eso es básicamente lo que hizo Claude, pero yo ya estaba conectado, por eso no me aparecía aquí. Perfecto, entonces ya que estén conectados, vamos a decirle: ya estoy conectado, continuemos.

**[08:00]**  
Entonces el siguiente paso es el interrogatorio. Claude les va a empezar a hacer preguntas sobre su negocio, sobre lo que hacen para crear su chatbot. Entonces aquí le vamos a decir ¿cómo se llama tu negocio? Vamos a decirle... se llama Forja. Le da el poder a tus agentes de IA de eso. ¿Qué me ofrece exactamente? Vamos a decirle... es un chatbot para Forja, llena todos los datos basado en ti, okay.

**[08:30]**  
Por ahorita le voy a decir eso para que vayamos un poco más rápido, pero ustedes sí tómense el tiempo para responder las lo mejor posible. Perfecto, entonces vean, nos dice: la configuración quedó lista, ya configuré tu bot con todo lo de Forja. Entonces aquí todo lo que configuró nos dice el bot ya sabe de Forja y nos dice: ¿le seguimos al deploy ahora? Y si quieren verlo como un diagrama, algo que pueden hacer es decirle: sí, quiero ver el diagrama.

**[09:00]**  
Este diagrama básicamente es un diagrama que les va a enseñar cómo va a funcionar su bot. Perfecto, entonces vean, ahí me abre el diagrama, que aquí pueden ver más visualmente cómo funciona su bot, va a tener conocimiento, va a estar conectado a su panel de administrador y le va a responder a sus clientes esencialmente. Entonces pues continuemos. Sigamos, continuemos. ¿Ya vieron lo sencillo que es? Literal es como si hablaras con tu amigo.

**[09:30]**  
Entonces aquí nos dice: vamos con el deploy, voy a seguir a mi asistente oficial de instalación. Okay, aquí venimos a un paso muy importante que es Cloudflare. ¿Qué es Cloudflare, Santi? Okay, Cloudflare es donde va a vivir su bot, es básicamente una de las mejores infraestructuras y ustedes no se van a tener que preocupar de nada. Van a venir a una nueva pestaña y vamos a buscar Cloudflare. El enlace se los dejo aquí abajo. Perfecto, es literal el primer enlace. Entonces quiero que inicien sesión totalmente gratis. Vamos a iniciar sesión.

**[10:00]**  
Okay, Cloudflare básicamente son muchas cosas. Cloudflare te permite comprar dominios, Cloudflare tiene cosas de ciberseguridad, de analíticas, de inteligencia artificial, de almacenamiento, bases de datos, tiene todo. Entonces básicamente eso le va a dar todo lo que ocupa su chatbot para vivir. Lo que antes n8n tenía detrás de cámaras, Cloudflare nos lo va a dar, por eso ya no ocupamos n8n como tal. Una vez ya se creen su cuenta, lo que quiero que hagan es simplemente créense su cuenta, vuelvan acá y le vamos a decir: sí, ya tengo Cloudflare.

**[10:30]**  
O le pueden decir que no y los va a guiar a donde para crearse su cuenta, ¿no? Entonces nos dice: perfecto, voy a conectar tu Cloudflare, se va a abrir tu navegador, dale clic en Allow para autorizar. Okay, entonces vamos a esperar. Básicamente lo que está haciendo es autorizarnos para que Claude pueda tener control de Cloudflare y él se va a encargar de todo. Entonces pues vamos a...

**[11:00]**  
Perfecto, vean, me abrió la pestaña, yo no toqué nada y lo único que van a tener su cuenta iniciada, simplemente les va a pedir que den permitir, ¿no? Vean aquí nos dice: Wrangler ocupa acceso a tu cuenta, ¿no? Entonces simplemente le vamos a dar Autorizar. Vamos a esperar. Perfecto, ya que estamos autorizadas, esto le va a dar el superpoder a Claude de que pueda crear nuestro chatbot. Ya después de aquí ya ustedes no tienen que hacer nada, van a ver ahorita.

**[11:30]**  
Okay perfecto, ahora igual déjenme comentarles algo importante sobre Cloudflare porque seguramente se preguntarán "Oye Santi, ¿cuánto cuesta Cloudflare? ¿Voy a tener que pagar algo en el futuro?". Okay, Cloudflare es de las aplicaciones con mejores planes en toda la industria, no les miento. Miren, si vienen aquí en Cloudflare, aquí abajo a la izquierda donde dice Workers Plans, verán estos dos planes, que literal el plan es de $5 y por $5 créanme que ya pueden alojar a todos sus clientes, pueden tener su chatbot que responde miles de mensajes, o sea, te dan muchísimo.

**[12:00]**  
O sea, si no son técnicos, cópienle todo esto a ChatGPT, a Claude, díganles que se los expliquen, pero te dan muchísimo. Y si llegaras a pasarte esos límites, te van a cobrar un pequeño extra. Ahora, esto es un aviso por si hacen el video... esto que están viendo lo hacen después y puede que Cloudflare cambie un poco, si durante el tutorial les llegan a pedir que pongan su tarjeta o que actualicen su plan, créanme, no es nada, son centavos. O sea, luego Cloudflare les pide de que pongan su tarjeta pero no les cobran nada, simplemente por si usan de más, pero créanme que es muchísimo el uso que me dan.

**[12:30]**  
Para que se den una idea, mi agente ha atendido más de 20,000 mensajes y nunca me he pasado del plan de $5. Entonces solo es eso por si les aparece una pantalla de que tienen que actualizar a Cloudflare, ya saben que cuesta $5. Ahora sí, continuemos. Entonces ya nos dice: conectado a Cloudflare, ahora creo los recursos en la nube de tu cuenta, la base de datos, el índice de conocimiento, el almacén... en Cloudflare va a poder crear absolutamente todo. Entonces a partir de ahora yo ya puedo irme a tomar un café y esperar a que cree mi chatbot. Entonces pues vamos a esperar y ahorita les enseño.

**[13:00]**  
Perfecto, aquí llegamos a un punto donde esto sí se los recomiendo hacer desde ahorita porque se van a ahorrar problemas después, pero estoy hablando de crear al cerebro de nuestra inteligencia artificial, o sea elegir qué inteligencia artificial va a usar nuestro chatbot. El chatbot, como vieron en el diagrama que les había enseñado acá, tiene un cerebro y la ventaja de tener el chatbot en su propio código en lugar de alguna plataforma es que ustedes pueden elegir la inteligencia artificial que ustedes quieran y es lo que más me gusta, que puedo usar la que yo quiera.

**[13:30]**  
Entonces para eso van a hacer lo siguiente. Aquí nos da dos opciones, nos da la opción de Claude y de GPT. Pueden usar lo que ustedes quieran, pueden probar. Yo por ahorita lo haré con OpenAI porque es el que he usado durante año y medio con mi bot y me funciona perfecto. Entonces ¿cómo funciona esto? Aquí me da un enlace, vamos a copiar este enlace y vamos a venir para acá. Recuerden, todos los enlaces se los dejo abajo. Okay, aquí pues inicien con su cuenta de ChatGPT.

**[14:00]**  
Es importante, si es su primera vez en esto, no importa si tienes una cuenta Plus en GPT, esto es diferente, ahorita se los explico cómo funciona. Como funciona esto es a través de créditos. ¿Cómo es eso Santi? Okay, básicamente su bot va a consumir de sus créditos para sus conversaciones, pero créanme que es baratísimo, baratísimo lo siguiente, porque no van a usar el modelo más avanzado, realmente un chatbot, se los digo por experiencia, consume menos de $3 al mes con un volumen alto, o sea ya con un volumen bajo no les va a consumir más de $1 al mes.

**[14:30]**  
Y se los digo por experiencia de más de dos años con un bot. Entonces aquí lo que van a hacer es darle crear una nueva llave. Vamos a darle crear una nueva llave, le pueden poner el nombre que quieran. Vamos a darle crear. Copien esa llave y se la van a dar a Claude. Y le podemos decir "ChatGPT" y la llave. Okay, perfecto.

**[15:00]**  
Okay perfecto, hago un pequeño asterisco porque esto es algo muy importante que tienen que saber. Si por alguna razón la IA que estén usando, Claude o Codex, les dice que no puede poner la llave API ellos por temas de seguridad, les voy a enseñar cómo poner su llave API de manera segura sin ponerla en el chat de la IA. Okay, básicamente son cuatro pasos sencillos. Primer paso: abrir la Terminal. Para esto voy a buscar Terminal si estoy en Mac, si están en Windows es PowerShell, recuerden.

**[15:30]**  
Okay, déjen abro una nueva. Ya que estén en una Terminal, en este cuadrito negro, lo siguiente que van a hacer es poner este comando, que este comando se los va a dar el mismo Claude. Es básicamente que tienen que ir a la ruta donde está su bot. Entonces mi ruta es esta, simplemente lo pego, perfecto, ya estamos en nuestra ruta, vean aquí dice. Ya que estamos en la ruta, copiamos este comando, que aquí dependerá de la llave API que van a poner, por ejemplo en este caso es si quisiera poner la llave de Anthropic, es este, pero les digo, Claude les va a dar ese comando, pero es para que sepan cómo tienen que usarlos.

**[16:00]**  
Venimos acá, lo pego, perfecto. Una vez lo pego se me abre esto y me dice "Enter your secret value". Aquí es donde tienen que pegar la llave, su API. Entonces voy a buscar Claude API rápidamente. Vengo para acá. Vengo a Claves de API. Y esto aplica para cualquier llave, ¿eh? Pongo un nombre, un vencimiento, perfecto, lo copio.

**[16:30]**  
Vengo para acá y aquí lo pego. Vean cómo ya se pega, enter. Perfecto, entonces me dice success, ya se subió la llave API. De esa manera pueden subir sus llaves API a Cloudflare de manera segura sin dársela a la inteligencia artificial. Ya vieron que fueron literal tres simples pasos. Entonces eso es en caso que Claude se rehúse a ponerla o ustedes por más seguridad quieran hacerlo de este camino. Ya que la pongan aquí simplemente le dicen a Claude "Claude, ya puse mi API en este de Anthropic" y él ya sabrá cómo continuar. Ahora sí, continuemos.

**[17:00]**  
Una vez le den la llave, volveremos a internet. Tienen que venir a Personal, Organization settings. Recuerden que estas interfaces pueden cambiar, pero busquen la parte de Billing, que es donde tienen que recargarle créditos. Entonces les digo, denle añadir créditos, lo mínimo que pueden añadirle son $5, añádanle $5 y créanme que con eso va a ser más que suficiente. Ya con eso su bot puede responder mensajes. Entonces pues vamos a esperar a que siga trabajando.

**[17:30]**  
Perfecto, no les miento, no pasaron ni 5 minutos y ya nos dice: tu bot está vivo, nos da este enlace, y no solo el bot, también nuestro panel está vivo. Me dice: Fase 1 completada, tu plataforma está viva, y nos da esto: tu panel. Vamos a copiar este enlace, vamos a ver qué es, vamos a venir a internet, vamos a pegarlo, y todo esto vive, les digo, en su propio Cloudflare, entonces es propio, suyo. Usuario y vamos a poner la contraseña.

**[18:00]**  
Perfecto, y vean la calidad de dashboard que tenemos. Este es el dashboard que yo he estado usando por más de 3 meses ahora y realmente... déjen les enseño mi dashboard real. Okay, este que están viendo es el dashboard de mi chatbot que he estado usando y les explico un poco cómo funciona. Realmente aquí en resumen es donde van a ver un pequeño resumen de su bot. Como ven, hoy tuve 370 mensajes, tuve 51 clientes únicos nuevos, por ahorita no hubo leads porque estamos en la masterclass, y el costo del mes, que les digo que es... vean, aquí para que vean, es evidencia, 2596 mensajes por $3.72, es baratísimo usando Claude.

**[18:30]**  
Okay, les digo, va a haber un video más a detalle del dashboard en la parte de documentación de Forja, es muy importante que lo vean. Por ahorita les digo, les explico lo básico. Van a poder ver el estado de su agente, si todo está bien, los mensajes por día... Aquí en conversaciones, les digo, van a poder ver todas las conversaciones de sus clientes. Entonces ahorita vamos con las conexiones a redes sociales. Y consideren que esto lo pueden ofrecer a otros negocios, ya vieron lo rápido que construimos el bot y hay cientos, miles de negocios que ocupan esto. Ustedes pueden ofrecer ese servicio.

**[19:00]**  
Entonces pues aquí podemos ir viendo todos los mensajes, pueden responder si ustedes quieren intervenir, simplemente responden aquí, le dan enviar y se los van a enviar, o sea sí está conectado a las redes sociales que ustedes conecten. Tenemos una pantalla de leads, tenemos tickets, el agente va a poder emitir tickets y demás, ¿no? Aquí en Flujo van a poder ver cómo se ve su agente. Entonces como vean, aquí ya están todas las redes sociales que tengo conectadas: Telegram, WhatsApp, Instagram... van a poder ver el modelo que están usando, las tools que está usando su agente, porque sí, así como en n8n estos agentes también tienen tools, tanto para agendar citas y demás, la memoria...

**[19:30]**  
Y aquí por ejemplo en Respuesta podemos darle clic y configurar varias cosas como el máximo de mensajes por respuesta. Recuerden que el bot puede responder en múltiples mensajes, entonces aquí pueden configurar fácilmente cuánto quieren, la pausa entre mensajes, ¿no? O sea todo supersúper sencillo. Perfecto, entonces aquí en Buffer, por ejemplo, le damos clic igual y podemos configurar el tiempo de espera: cuánto quieres que espere tu bot para responder, y esto es bueno porque si el cliente envía múltiples mensajes el bot va a agarrar todos esos y responder naturalmente.

**[20:00]**  
Perfecto, aquí en el agente pueden darle clic y ver la prompt. El mismo Claude con todos los datos que recopiló de ustedes al principio generó esta prompt, pero ustedes pueden modificarla aquí manualmente o decirle al mismo Claude: "Oye, mi bot se escucha medio robótico, modifícalo", y él mismo Claude va a poder modificar esto o ustedes manualmente. O sea todo lo pueden manejar ustedes o desde Claude, esa es la ventaja de esto.

**[20:30]**  
Entonces en Conocimiento es donde van a poder agregarle conocimiento. Esto es una base de datos RAG que el mismo Cloudflare te va a ofrecer. Entonces si quieres darle documentos y demás, los puedes subir aquí y puedes subir tanto título y contenido. Y otra cosa muy importante: todo esto lo estaré actualizando constantemente, entonces es importante que me sigan para estar actualizados de todo lo nuevo que salga.

**[21:00]**  
Y pues tenemos varias cosas más, ¿no? Aquí abajo por ejemplo Costos, van a poder ver cuánto les cuesta su bot. Pueden poner un presupuesto mensual, pueden poner diferentes IAs, eso lo explicaré en videos más detallados, y cuánto les va costando por día, que les digo que son centavos, y eso que yo tengo un volumen alto. Perfecto, pues eso sería por el dashboard. Okay perfecto, ahora como les prometí les voy a enseñar cómo va a funcionar la parte de la conexión a redes sociales.

**[21:30]**  
Esencialmente las conexiones son 100% oficiales, y cómo funciona es que Forja no se limita a un método, Forja va a tener múltiples métodos de conexiones a las redes sociales. Santi, ¿cómo funciona esto? Si se meten aquí a Docs, documentación, aquí en tutoriales en video van a tener múltiples tutoriales para conectar sus redes sociales de múltiples formas, o sea si ustedes son nuevos en esto y no saben cómo funciona, conectar WhatsApp, Facebook e Instagram hay múltiples formas de hacerlo, hay múltiples proveedores.

**[22:00]**  
Entonces hay unos que son más difíciles, entonces nosotros no queremos que se limiten a uno, entonces vamos a estar subiendo muchas formas y ustedes eligen la que sea más rápido. Por ahorita les voy a enseñar la primera, que es la de Telegram, que esa es 100% gratis, la pueden hacer ahorita. Si quieren hacer Instagram, igual ahorita les puedo decir qué método les recomiendo. Okay, entonces vamos con Telegram, que les digo Telegram es bueno porque pueden practicar sus bots. Entonces lo que vamos a hacer es venir a Telegram, el enlace se los dejo abajo, Telegram Web, clic. Si es su primera vez en Telegram, créense una cuenta.

**[22:30]**  
Entonces ya que estamos en Telegram, Telegram es como un WhatsApp, okay, ya que están en Telegram lo que van a hacer es darle clic al buscador y van a buscar BotFather, como lo ven en pantalla, les va a aparecer este, le damos clic. Este es básicamente un bot que les permite crear bots para usar para sus conversaciones. Entonces ¿cómo funciona? Déjenme borro un bot mío porque creo tengo muchos.

**[23:00]**  
Okay, ya que estén en el BotFather van a hacer lo siguiente. Primero, si es la primera vez que entran, les va a aparecer un botón que dice Start, denle Start. Luego denle /newbot, aquí. Les dice: ¿cómo le vas a llamar a tu bot? Le vamos a decir claudebotpro. Perfecto, si les da un error ahí es porque ese nombre ya existe, entonces nos dice "dale un usuario". Y la diferencia del usuario y del nombre es que el usuario tiene que tener la palabra bot al final.

**[23:30]**  
Entonces debe tener el bot al final, perfecto. Si les da este mensaje significa que lo hicieron bien. Ahora, ya que lo hicimos bien, lo que van a necesitar hacer es copiar este token, este token de aquí, lo copian, vuelven a Claude y le vamos a decir: "Sí, conectemos Telegram, te doy mi token de mi bot", perfecto. Y recuerden, si tienen alguna duda díganselo al mismo Claude, Forja igual es muy inteligente y les va a ayudar y los va a guiar sobre cómo hacer cualquier cosa si se pierden.

**[24:00]**  
Perfecto, vean lo fácil que fue, literal no escribí ningún mensaje después de este mensaje y me dicen: "Telegram conectado" y me dice que ya lo podemos probar. Entonces pues vamos a intentar. Vamos a volver aquí y vean, aquí si le dan clic a este enlace los va a llevar a su bot. Le vamos a dar Start y nos debería responder un mensaje. Recuerden que su bot tiene un retraso que lo pueden configurar ahí en el dashboard de 10 segundos, de 15 segundos. Entonces vamos a ponerle algo como "Hola".

**[24:30]**  
Vean, ahí ya me respondió. Perfecto, perfecto. "¿Cómo funciona Forja?". Vean, aquí me respondió "Te respondo en español" porque escribí Start y eso fue lo que leyó. Entonces vieron cómo sí está esperando los 15 segundos para responder. Ahí está: "Forja te permite crear chatbots para tu negocio utilizando nuestra tecnología de IA...". ¡Perfecto! Respondió perfecto. Pues ahí tienen su chatbot listo, dejen su like y suscríbanse porque si esto les está pareciendo impresionante, uf, lo que voy a subir próximamente les volará la cabeza.

**[25:00]**  
Perfecto, entonces pues ya tienen su chatbot, esencialmente ya lo que sigue son las conexiones a diferentes redes sociales. Y como les comentaba, vamos a estar subiendo múltiples métodos. ¿Cómo pueden saber esos métodos? Si vienen aquí a Claude y le preguntan "¿qué otros métodos tiene Forja para conectar a redes sociales?" Y otra cosa que podemos ir... bueno, aquí podemos ver que ya entramos al dashboard y ahí pueden ver cómo tenemos toda la información ya actualizada: las conversaciones, el cliente único, y si nos metemos ahí en conversaciones podemos ver el chat.

**[25:30]**  
Okay perfecto, ahora como les prometí les voy a enseñar cómo va a funcionar la parte de la conexión a WhatsApp con Forja, que es probablemente el que más quiera la mayoría. Okay, como les comentaba hay muchas formas de conectar las redes sociales a Forja, está desde la versión 100% oficial hasta diferentes proveedores y vamos a subir muchos más. Entonces ¿cómo funciona esto? Okay, les voy a enseñar un método que es el método que yo estoy usando actualmente con mi WhatsApp. Si quieren les muestro.

**[26:00]**  
Okay perfecto, vean aquí en pantalla pueden ver a mi bot, que de hecho este bot igual lo uso como bot de recordatorios porque otra cosa que se pueden hacer... lo estaré explicando probablemente en próximos videos, pero es también mandar plantillas y recordatorios con tu bot de WhatsApp. Pero como ven, aquí tengo a mi bot de WhatsApp y este es el mismo bot que acabamos de construir. Entonces les voy a enseñar cómo lo conectamos. Okay, yo lo hago a través de una plataforma que se llama Twilio.

**[26:30]**  
Okay, Twilio es básicamente la plataforma que nos ayuda a conectar con WhatsApp. Les digo, es una forma, hay múltiples formas. Entonces a continuación les voy a poner un video donde les enseño cómo conectarlo. Okay, en este breve video les voy a enseñar otra nueva forma de conectar WhatsApp. En este caso vamos a estar usando Twilio y les voy a decir cuál es la ventaja de Twilio y desventaja. Ya saben que a mí me gusta darles muchas opciones, les he dado la opción de Chatwoot, que es la versión 100% oficial, les he dado YCloud, les he dado ManyChat, entonces esta es una nueva alternativa.

**[27:00]**  
Y esta a diferencia de los otros tiene algo en particular. Okay, vamos a venir aquí a Twilio, les voy a dejar el enlace aquí abajo y si no se han creado una cuenta en Twilio no voy a ir a fondo en eso, simplemente tienen que meterse a la plataforma, crear su cuenta, creo les piden verificarse. Les dejo un video abajo por si quieren... se pierden. Ya que hayan iniciado su cuenta vamos a venir aquí arriba a la barra de búsqueda y vamos a buscar WhatsApp.

**[27:30]**  
Okay, perfecto. Ahora le vamos a dar aquí en este botón y una ventaja de Twilio es que no ocupas tener un teléfono físico, o sea puedes comprar un número virtual de Twilio y usarlo como número de WhatsApp sin necesidad de comprar uno nuevo. Entonces aquí pues vamos a darle seleccionar y le darían ustedes aquí en Buy a number. Ahora, por alguna razón no estoy seguro si es en todos los países, pero lo que he visto es que funciona mejor con los números de Estados Unidos por alguna razón.

**[28:00]**  
Porque una vez intenté conectar un número de otro país y no me dejó. Entonces ya que vengan aquí tienen que buscar el número y lo compran, por ejemplo de Estados Unidos este $1 al mes, entonces realmente es muy muy barato. Ya que hayan comprado su número lo voy a seleccionar, digamos no sé voy a seleccionar este, vamos a darle continuar y vamos a darle aquí en el botón de continuar con Facebook.

**[28:30]**  
Entonces como es un método oficial esto, realmente tienen que pasar el mismo formulario de todas las páginas, este formulario es obligatorio recuerden si quieren conectar su WhatsApp de manera oficial. Entonces vamos a darle continuar, si no han creado un portafolio de Facebook es sencillo, les voy a dejar un tutorial igual aquí abajo, ocupan tener un portafolio para que puedan aquí conectarlo, ¿no? Entonces le van a dar donde dice crear una cuenta de WhatsApp Business, perfecto, siguiente.

**[29:00]**  
Aquí pues ponen un nombre, vamos a ponerle Santiago Muñoz, categoría vamos a ponerle Educación, vamos a darle México, siguiente. Perfecto, aquí le vamos a decir agregar un número nuevo y vamos a poner el número que está aquí, este de aquí, lo copian, vuelven para acá, lo pegan y vamos a darle mensaje de texto, okay.

**[29:30]**  
Ahora, una vez le den eso, aquí deberían ver un número en breve. Ahí está. Copiamos este número, volvemos para acá, lo ponemos y le damos siguiente. Le vamos a dar confirmar. Les digo, por alguna razón o sea lo intenté con un número de otro país y este número de verificación no me aparecía y con los números de Estados Unidos sí me aparece. Entonces les digo, no sé si dependa de algo de eso, o sea pueden intentar pero les digo, yo con los que he probado y que sí están viendo que funciona es con los números gringos, americanos.

**[30:00]**  
Perfecto, entonces nos dice: tu cuenta está conectada a Twilio. Vamos a darle finalizar. Perfecto, y ya tienen conectada WhatsApp con Twilio. Ahora, ¿qué ventajas tiene esto? Realmente la ventaja es de que podemos usar Claude Code para crear un chatbot y conectarlo a Twilio. Twilio realmente no se encarga de ser la interfaz para conectar como Chatwoot, que tienes los mensajes así, Twilio digamos te da la API y toda la conexión, te da la infraestructura.

**[30:30]**  
Ahora, en tema de costos esto es la mayor desventaja de Twilio: Twilio sí te cobra por cada mensaje. Twilio... ¿dónde lo busco? WhatsApp... Twilio lamentablemente sí te cobra por cada mensaje que envíes aunque no sea... aunque el cliente te mande el mensaje primero. Entonces bueno, aquí dependiendo el país de donde manden los mensajes, por ejemplo vamos a poner que en un mes envió 5000 mensajes, pues sería $25, ¿no? $25.

**[31:00]**  
Y esto de "during the customer service window" se refiere a de que en las primeras 24 horas que te mandan el mensaje, y si lo haces afuera de esa ventana igual te cobran más. De hecho es más caro estos fuera de la ventana que estos, ¿no? Pero les digo, realmente este es otro método y ya vieron que fue muy sencillo conectarlo y tiene esa ventaja del número digital, o sea que si ustedes lo que ocupan es tener un bot rápido funcionando, no quieren comprarse una SIM y hacer todo el proceso manual, Twilio te lo facilita muchísimo.

**[31:30]**  
Entonces pues eso sería todo por la conexión. Como podemos ver aquí ya tenemos esto y pues en próximos videos les estaré enseñando cómo usar esta cuenta de Twilio para conectarlo a sus chatbots. Okay perfecto, espero hayan podido conectar Twilio, todo haya salido excelente. Ahora, ya que hayan conectado Twilio y ya que tengan su cuenta conectada con su número de teléfono, ¿ahora cómo lo conectamos a Forja? Déjen les enseño.

**[32:00]**  
Vamos a venir a Forja y le vamos a decir: "Quiero conectar WhatsApp a través de el CLI de Twilio. Dime qué ocupas que te proporcione". Van a decirle algo así. Okay, entonces mientras voy a ir a mi panel de Twilio. Okay perfecto, entonces aquí ya estamos en Twilio. Ya que están en Twilio vamos a venir acá y vean lo que nos dijo, nos dijo: "Perfecto, con el CLI de Twilio ocupamos todo esto", y me dice lo que ocupo de ti, me dice que ocupa dos cosas: el Account SID y el Auth Token, ¿no?

**[32:30]**  
Entonces con esos básicamente Claude se va a poder conectar a tu cuenta de Twilio y configurar todo, así como lo hicimos con Cloudflare que le dimos el acceso, lo mismo. Entonces okay, vamos para acá, y ¿dónde encuentran esos códigos? Es aquí literal en la primera página en el dashboard, aquí. Es importante que tengan tanto su número de WhatsApp como créditos de Twilio. Como les había comentado Twilio te cobra por mensajes tanto de ida como de vuelta, pero es de los métodos más rápidos para empezar, por eso yo lo uso y aunque gaste un poquito más, yo lo justifico.

**[33:00]**  
Entonces les digo, si quieren irse full gratis es la versión 100% oficial, pero se tardan más de conectarla. Entonces ya que estamos aquí vamos a darle estos dos accesos, entonces vamos a decirle Account SID, vamos a darle este acceso, y el Auth Token, que no lo compartan con nadie, vamos a dárselo, perfecto. Entonces una vez básicamente le den estos accesos ya Claude se va a conectar a Twilio y ya se va a encargar de configurar todo para que lo puedan tener en WhatsApp.

**[33:30]**  
Sé que suena muy sencillo y sí lo es, lo dejé lo más sencillo para que ustedes literal se enfoquen en hacer su bot mejor y no en la parte técnica. Perfecto, entonces vean ya aquí sí se tarda un rato en conectar, pero nos dice "Credenciales guardadas" y aquí nos dice que sí funciona el CLI y me dice "Tienes tres números incluidos", o sea ya va a poder ver todo lo de tu cuenta y pues él ya se va a encargar de conectar todo. Perfecto, vean aquí nos dice "Excelente hallazgo, tienes dos senders de WhatsApp". Entonces aquí me dice: lo guardo como número real de tu bot y configuro todo.

**[34:00]**  
Perfecto, pues vean ya lo hizo, ya literal me dice "WhatsApp conectado", ya configuró él todo, yo no tuve que pegar nada, él hizo absolutamente todo. Y entonces pues vamos a venir a WhatsApp y vamos a mandarle "Hola, ¿a qué se dedican?". Vamos a ver si realmente sí puso el nuevo bot porque les digo tuve que cambiar el bot que tenía antes. Vamos a esperar los 15 segundos que tiene de buffer. Buffer es cuánto espera para mandar la respuesta y pues vamos a ver si sí lo manda.

**[34:30]**  
Perfecto, ahí está: "Forja se dedica a ayudar a empresas a crear chatbots personalizados...". ¡Perfecto! Pues ya tenemos nuestro chatbot en menos de 30 minutos, superfuncional y aparte tenemos nuestro dashboard donde llega el mensaje y vean aquí dice WhatsApp, ¡perfecto! ¿Qué les parece? Pues ahora ya por último les voy a enseñar cómo funciona para Messenger y para Instagram, por lo menos del método que yo uso.

**[35:00]**  
Okay perfecto, ya tienes tu chatbot, ¿ahora qué sigue Santi? Okay, tienes de dos. La primera obviamente usarlo para tu negocio, para que atienda a todos tus clientes, realmente verlo como un empleado ya. La segunda, que es la que yo estoy haciendo ahorita y más de 600 personas en mi comunidad van a empezar a hacer, es ofrecerlo a otros negocios. Ya vieron lo sencillo que fue armar chatbots, ahora este mismo chatbot lo puedes ofrecer a otros negocios. Es por eso que les quiero presentar rápido Forja Plus.

**[35:30]**  
Forja Plus es la solución de Forja diseñada para ofrecer estos servicios. ¿Y qué te incluye básicamente? Okay, aquí en la pantalla de Forja, si dan clic en la pestaña de arriba van a ver todo lo que incluye, pero déjenme les enseño rápidamente. Primero, van a tener 12 superpoderes para su chatbot, que estos superpoderes son diferentes habilidades para que su chatbot pueda hacer diferentes cosas, ¿no? Reportes, multi-idioma, encuestas de satisfacción, recuperar no-shows, pedir reseñas y varias cosas, los pueden ver todos ahí en la página.

**[36:00]**  
Luego tenemos más de 14 plantillas para diferentes nichos. Estas son plantillas que yo mismo he hecho para diferentes nichos, por ejemplo el de la inmobiliaria está hecho para que pueda agendar citas para una inmobiliaria, el de la barbería para una barbería, o sea están personalizadas para que ustedes literal puedan dárselas a Claude e instalarlas en menos de una hora. Luego tenemos estadísticas para que puedas ver las estadísticas de todos tus clientes, y tenemos el modo agencia, que el modo agencia básicamente te deja montar el bot a tu primer cliente en menos literal de 30 minutos. Aparte de esto viene incluido con 8 skills, que es mi kit de agencia IA, que te va a permitir hacer propuestas, contratos, onboarding, básicamente que todo esté full automatizado.

**[37:00]**  
Forja Plus estará disponible para todos los que se unan a mi comunidad, pero considera que vamos a estar aumentando el precio. Entonces si quieres apartar tu precio simplemente ve a este enlace de aquí y ahí puedes obtener tu acceso. Ahora sí, continuemos. Pero por ejemplo les voy a enseñar uno que es el que yo uso, que es este de ManyChat, ¿no? Entonces como funciona el de ManyChat es le puedo decir "Quiero hacer el de ManyChat" y literal así es como ustedes le harían, literal le pueden preguntar de que "Oye, ¿qué chat hago?", ¿no? Y él ya los va a guiar, les va a decir qué ocupan, dónde ir.

**[37:30]**  
Entonces lo configuré de tal manera que sea lo más sencillo posible, y si se dan cuenta no nos ha consumido nada de tokens, o sea vean, si me puedo venir aquí, bueno creo va a tener algo de uso que ya usé antes, pero vean, vean el uso que hemos usado, menos del 7%, sí, estoy en el 20X pero aún en el plan de $20 esto no es nada de uso, y estamos usando el modelo Opus 4.8, no estoy usando ni el modelo más inteligente y ya se dieron cuenta lo que pudimos hacer.

**[38:00]**  
Perfecto, entonces ahí me dice: vamos con ManyChat, me dice ManyChat es un puente que tú lo conectas a Instagram, Messenger o WhatsApp. Antes de arrancar déjame verificar una cosa importante, perfecto, pues vamos a esperar. Okay, aquí me dice el plan y les digo, el mismo Claude los va a guiar. Entonces me dice: tu API de ManyChat, la API de ManyChat, entonces me dice "¿ya tienes tu cuenta de ManyChat?". Le vamos a decir que sí. Bueno más bien entren a manychat.com, Settings, API, copia tu API key, okay, pues vamos a hacer literal lo que me está diciendo. Vamos a venir a manychat.com.

**[38:30]**  
Okay perfecto, vamos a venir a Configuración, vamos a venir a API y vamos a copiar esta llave. Vamos a venir para acá y se la vamos a dar. Usualmente te van a decir que no es buena práctica poner las APIs aquí en el mismo chat y sí, no es la mejor práctica, pero la verdad o sea tampoco va a ser gran problema, o sea sí la forma digamos segura es que Claude les va a dar un comando y corran ese comando en la Terminal si quieren hacerlo de la forma 100% segura. Es eso, de que tienen que venir aquí a la Terminal y correr un comando para que guarde digamos esa llave de forma segura. Pero así no hay tanto problema.

**[39:00]**  
Entonces pues vamos a esperar. Perfecto, ya lo guardó y nos dice: conecta tu red en ManyChat. Entonces me dice: conecta el canal donde están tus clientes: Instagram, Messenger o WhatsApp. Entonces luego nos dice crear el flujo que llama a tu bot, perfecto. Entonces vamos a hacerlo rápidamente. Vamos a venir a ManyChat, aquí vamos a tener diferentes canales, por ahorita está el de Instagram, WhatsApp y Messenger, ¿no? Entonces digamos vamos con Messenger.

**[39:30]**  
Okay, aquí yo ya tengo mi cuenta conectada, pero si no han conectado sus cuentas realmente Messenger e Instagram es facilísimo, lo conectan en un clic, y WhatsApp les voy a dejar un tutorial abajo de cómo lo pueden conectar, que igual es supersencillo, solo es un formulario, solo que hay varias cosas a considerar con WhatsApp. Que les digo, WhatsApp si no la pueden conectar ahorita no se preocupen, haré un video más a detalle próximamente, tengan su bot armado por ahorita que es lo más importante.

**[40:00]**  
Entonces ya que estamos aquí, lo que vamos a hacer es decirle en Respuesta predeterminada, vamos a darle... en enviar a... bueno más bien voy a borrar este... Aquí vamos a decirle crear nueva respuesta predeterminada. Ya que tenemos este como flujo, como funciona esto es que cuando el usuario les manda un mensaje, vamos a darle clic aquí, asegúrense que esté Every time, perdón, Every time aquí, y aquí vamos a borrar esto, vamos a darle borrar aquí... Les digo, Claude los va a ir guiando pero ahorita los estoy guiando yo... Vamos a arrastrar la flecha, le vamos a dar en Acciones, le vamos a dar una acción y le vamos a dar donde dice Automatización, aquí: Realizar solicitud externa.

**[40:30]**  
Ahora para esto para en ManyChat sí ocuparán el plan Pro, si no estoy mal, les digo van cambiando los planes, pero les digo, Forja va a tener varios métodos desde la versión 100% oficial y gratis, aunque esa versión es más difícil de instalar, aunque igual les traeré un tutorial más a fondo. Okay, entonces ya que tenemos esta, vamos a darle añadir tu solicitud y vean aquí nos dice Tipo de solicitud y nos pide un URL. Lo que tenemos que hacer es venir a Claude y nos dice: pega este URL, que es el URL que genera Cloudflare. Lo pegamos aquí, perfecto.

**[41:00]**  
Y lo que vamos a hacer es darle en Cuerpo y le vamos a decir Añadir Full Contact Data. Perfecto, no se preocupen si les dice esto, eso está bien, le vamos a dar Guardar, perfecto. Y vamos a darle Publicar en vivo. Borren este si no les deja... Ahí está: Publicar en vivo. Perfecto, entonces básicamente cada mensaje que nos llegue en Messenger lo va a enviar a nuestro bot. Entonces vamos a venir para acá y vamos a decir: "Listo, ya está".

**[41:30]**  
Ah bueno, aquí algo muy importante que es un tema de seguridad que añadí recientemente es de que igual les va a pedir que agreguen un Header, que es esta llave, para que sean solicitudes seguras. Entonces lo único que hacen es copiar el nombre, vienen para acá, aquí en donde dice Encabezado, Solicitar encabezado, en Key ponen el nombre y luego este código lo ponen aquí por seguridad, ¿no? Y le dan Guardar y otra vez Actualizar, perfecto.

**[42:00]**  
Okay, entonces aquí me dice: "Tu webhook responde correctamente, tu bot recibió mensaje de prueba y lo está procesando", o sea el mismo Claude va a hacer las pruebas de que si funciona o no, esa es una gran ventaja que el mismo Claude va a poder hacer tests, pruebas, y así es como he podido hacer que mi bot venda más de $20,000 porque se va auto-optimizando el mismo bot.

**[42:30]**  
Okay, pues aquí voy a intentar mandarle un mensaje a mi... a mí mismo, pero de mi otra cuenta. Luego si le envías mensaje a tu cuenta de Facebook desde otra cuenta que sea tuya, como está en el mismo portafolio, luego puede que haya ahí algún... que no responda, pero luego sí está funcionando, simplemente que como le mandas mensaje desde tu propia cuenta no te responde, y creo es lo que está pasando ahorita. Okay, déjenme le digo a alguien que me mande un mensaje y ahorita les enseño.

**[43:00]**  
Okay perfecto, pues aquí ya me respondió, ya le podemos decir qué es Forja y también en el... acá vamos a ver si... aquí está. Aquí podemos ver que ya se empiezan a poner los mensajes, ¿no? Vean que aquí me dice ManyChat, aquí les va a decir de qué red social se les manda, y pues vamos a volver para acá. Ahí está. Responde igual en múltiples mensajes como lo hizo en Telegram. Perfecto.

**[43:30]**  
Pues para... para Instagram y para WhatsApp es literal absolutamente el mismo proceso por lo menos en la parte de ManyChat, es lo mismo. Vienen acá a Instagram, conectan su cuenta de Instagram que les digo Instagram es relativamente fácil, la más quisquillosa va a ser WhatsApp, pero vienen aquí a la automatización y lo único que tienen que hacer es darle Editar y lo mismo literal que hicimos con Messenger, ¿no? En el webhook que les dé su bot, ¿no? Y de esa manera ya pueden hacer que conteste su Instagram.

**[44:00]**  
Perfecto, pues espero les haya gustado el video, vimos desde la construcción hasta la conexión de redes sociales. Por favor, si tienen alguna duda déjenmela aquí en los comentarios. Ahora, ¿cómo me podrían ayudar si quieren apoyar a este sistema? Hay formas muy sencillas. Okay, la primera: suscríbanse y den broad/like a este video, eso me ayuda muchísimo. Luego, si pueden ir al repositorio de GitHub de abajo, les voy a dejar el enlace a esta página y si pueden crearse una cuenta y darle un beneficio/like literal, darle aquí en Star un como like, eso me ayudaría muchísimo para que este proyecto siga creciendo.

**[44:20]**  
Luego, si pueden ir a la página de Product Hunt, que es básicamente una página donde puedes publicar diferentes soluciones, les voy a dejar el enlace y si pudieran darme aquí igual un like, así un puntito, igual me ayudaría muchísimo. De todas formas ya me ayudaron muchísimo viendo este video, entonces pues espero les haya gustado el video y nos vemos a la siguiente. Santi fuera.
