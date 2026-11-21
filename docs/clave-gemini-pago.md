# Activar facturación de Gemini y crear la clave de pago

## 1. Activar la cuenta de facturación y los créditos de prueba (Google Cloud)

1. Entra a <https://console.cloud.google.com/> con tu cuenta de Google.
2. Si aparece el banner **"Prueba gratuita / Free trial"** (créditos de prueba para cuentas nuevas), toca
   **Activar** y completa país, datos y tarjeta. La tarjeta se usa para verificar;
   no se cobra mientras te queden créditos de prueba, salvo que pases la cuenta a una de pago.
3. Si no aparece el banner: menú ☰ → **Facturación** (<https://console.cloud.google.com/billing>)
   → **Crear cuenta de facturación** (o **Administrar cuentas de facturación**).
4. Crea (o elige) un **proyecto**, p. ej. `jarvis-media`, y en **Facturación → Mis proyectos**
   vincúlalo a esa cuenta de facturación.
5. Recomendado: **Facturación → Presupuestos y alertas** → crea un presupuesto (p. ej. 20 USD)
   para recibir avisos por correo.

## 2. Conectar el proyecto en Google AI Studio y crear la clave

1. Entra a <https://aistudio.google.com/apikey> (Google AI Studio → **Get API key**).
2. Toca **Crear clave de API / Create API key** y elige el proyecto con facturación del paso 1
   (si no aparece, usa **Importar proyecto**).
3. Comprueba que la clave muestra el plan **de pago (Tier 1 o superior)** y no "Free".
   Si dice Free, toca **Configurar facturación / Set up billing** al lado de la clave.
4. Copia la clave. **No la pegues en el chat con Claude.**

Veo 3.1 (`veo-3.1-fast-generate-preview`, `veo-3.1-generate-preview`) solo funciona con
una clave de pago. Ojo: los créditos de prueba de Google Cloud no siempre cubren la API
de Gemini; revisa en **Facturación → Informes** que el uso se descuenta de ellos.

## 3. Guardarla en tu entorno de Claude Code

En claude.ai/code, abre el menú del entorno en la barra de título de la sesión → **Editar**:

- **Recomendado: Network secrets** (Secretos de red): edita la credencial que ya existe para
  `generativelanguage.googleapis.com` y reemplaza su valor por la clave nueva. El proxy la
  añade a cada petición; nunca queda visible dentro de la sesión. Con esto no necesitas nada más:
  el hook pone un valor de relleno en `GEMINI_PAID_API_KEY`.
- Alternativa: una variable de entorno `GEMINI_PAID_API_KEY` con la clave. Queda en texto
  plano para cualquiera que use el entorno, y mientras exista el secreto de red de ese host,
  el proxy lo seguirá usando en lugar de esta variable.

Abre una sesión nueva para que tome el cambio.
