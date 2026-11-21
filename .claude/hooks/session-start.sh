#!/bin/bash
# Instala BananaBatch (con Streamlit) y el fork del quickstart Veo 3.1 / Nano Banana
# al iniciar cada sesión de Claude Code en la nube.
set -euo pipefail

# Solo en sesiones en la nube
if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

PROJECT_DIR="${CLAUDE_PROJECT_DIR:-$(pwd)}"
TOOLS_DIR="${CREATIVE_TOOLS_DIR:-$(dirname "$PROJECT_DIR")}"
BANANA_DIR="$TOOLS_DIR/bananabatch"
VEO_DIR="$TOOLS_DIR/veo-3-nano-banana-gemini-api-quickstart"
BANANA_URL="https://github.com/GH05TCREW/bananabatch.git"
VEO_URL="https://github.com/cchavero695-a11y/veo-3-nano-banana-gemini-api-quickstart.git"

log() { echo "[session-start] $*" >&2; }

# --- Descargar los repositorios si faltan ---
if [ ! -d "$BANANA_DIR/.git" ]; then
  log "Clonando BananaBatch..."
  git clone --depth 1 "$BANANA_URL" "$BANANA_DIR" >&2
fi
if [ ! -d "$VEO_DIR/.git" ]; then
  log "Clonando tu fork del quickstart..."
  if ! GIT_TERMINAL_PROMPT=0 git clone --depth 1 "$VEO_URL" "$VEO_DIR" >&2; then
    rm -rf "$VEO_DIR"
    log "AVISO: no se pudo clonar $VEO_URL (¿existe el fork?). Se omite el quickstart."
  fi
fi

# --- BananaBatch + Streamlit (pip en el Python del sistema) ---
pyhashes="$(python3 -I -c 'import sysconfig; print(sysconfig.get_path("purelib"))')/.session-start-bananabatch.sha256"
if ! sha256sum --check --status "$pyhashes" 2>/dev/null; then
  rm -f "$pyhashes"
  log "Instalando BananaBatch y Streamlit..."
  python3 -m pip install --quiet -e "$BANANA_DIR" streamlit >&2
  sha256sum "$PROJECT_DIR/.claude/hooks/session-start.sh" "$BANANA_DIR/pyproject.toml" > "$pyhashes" || rm -f "$pyhashes"
fi

# --- Quickstart (Next.js) ---
nodehashes="$VEO_DIR/node_modules/.session-start.sha256"
if [ -d "$VEO_DIR/.git" ] && ! sha256sum --check --status "$nodehashes" 2>/dev/null; then
  rm -f "$nodehashes"
  log "Instalando dependencias del quickstart..."
  (cd "$VEO_DIR" && npm install --no-audit --no-fund --loglevel=error) >&2
  sha256sum "$PROJECT_DIR/.claude/hooks/session-start.sh" "$VEO_DIR/package.json" "$VEO_DIR/package-lock.json" > "$nodehashes" || rm -f "$nodehashes"
fi

# --- Clave de Gemini: todo lee GEMINI_PAID_API_KEY ---
# Si la clave está guardada como "Network secret" del entorno, el proxy la inyecta
# en las peticiones a generativelanguage.googleapis.com y basta un valor de relleno.
if [ -n "${CLAUDE_ENV_FILE:-}" ]; then
  {
    echo 'export GEMINI_PAID_API_KEY="${GEMINI_PAID_API_KEY:-inyectada-por-el-proxy}"'
    echo 'export GEMINI_API_KEY="$GEMINI_PAID_API_KEY"'   # BananaBatch lee GEMINI_API_KEY
    echo "export BANANABATCH_DIR=\"$BANANA_DIR\""
    echo "export VEO_QUICKSTART_DIR=\"$VEO_DIR\""
  } >> "$CLAUDE_ENV_FILE"
fi

log "Listo: BananaBatch en $BANANA_DIR, quickstart en $VEO_DIR"
