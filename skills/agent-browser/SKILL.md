# SKILL — agent-browser v1.0
_Unrealville Studio · Browser Automation CLI · Vercel Labs_
_Versión: 1.0 · 2026-05-10_

---

## INSTRUCCIÓN DE CARGA

Cargar cuando hay tarea que requiere interacción con un sitio web sin API:
- "revisa cómo se ve [URL] en producción"
- "extrae datos de [sitio]"
- "llena el formulario de [servicio]"
- "testea el flow de checkout de NeuroneSCF"
- "automatiza [acción] en [sitio que no tiene API]"

**Contexto de uso:** Principalmente Claude Code (CLI). En claude.ai chat solo disponible si el conector está activo.

---

## QUÉ ES

`agent-browser` (vercel-labs) es un CLI de automatización de browser optimizado para agentes AI. Chrome/Chromium vía CDP con accessibility-tree snapshots y refs compactos `@eN`.

**Instalación:**
```bash
npm install -g agent-browser
agent-browser install  # instala Chromium
```

---

## COMANDOS PRINCIPALES

```bash
# Navegar a URL
agent-browser open https://neuronescflorida.com

# Snapshot del árbol de accesibilidad (con refs)
agent-browser snapshot
# Devuelve: [1] @e1 button "Add to cart" [2] @e2 link "Home" ...

# Screenshot anotado (mejor para razonar visualmente)
agent-browser screenshot --annotate page.png
# Los refs @eN se cachean para interacción inmediata

# Interacciones usando refs del snapshot
agent-browser click @e2
agent-browser fill @e3 "test@email.com"
agent-browser get text @e1

# Chat con agente para tareas complejas
agent-browser chat "navega a neuronescflorida.com y verifica que los 42 productos tienen imagen"
```

---

## CASOS DE USO UNRLVL

| Caso | Comando |
|------|---------|
| QA visual de tienda NSCF en producción | `agent-browser chat "toma screenshots de 5 product pages y verifica que la SP section aparece"` |
| Verificar language switcher EN/ES | `agent-browser chat "verifica el switcher EN/ES en neuronescflorida.com"` |
| Scraping de competencia (sin API) | `agent-browser chat "extrae los precios de [URL]"` |
| Testing de formularios | `agent-browser chat "llena el form de contacto en neuronescflorida.com con datos de prueba"` |
| Automatizar Electron apps (VS Code, Figma, Slack) | `agent-browser skills get electron` |

---

## SKILLS DISPONIBLES

```bash
agent-browser skills get core       # workflows principales + troubleshooting
agent-browser skills get electron   # VS Code, Slack, Discord, Figma, Notion
agent-browser skills get slack      # automatización de Slack workspace
agent-browser skills get dogfood    # QA exploratorio + bug hunts
agent-browser skills get vercel-sandbox  # dentro de Vercel Sandbox microVMs
```

---

## MCP WRAPPER (si se necesita como conector)

Existe `agent-browser-mcp` para exponer agent-browser como MCP server:

```json
{
  "mcpServers": {
    "agent-browser": {
      "command": "npx",
      "args": ["agent-browser-mcp"],
      "env": { "AGENT_BROWSER_PATH": "/path/to/agent-browser" }
    }
  }
}
```

Tools disponibles: `browser_navigate`, `browser_click`, `browser_snapshot`, `browser_fill`, `browser_screenshot`

---

## LIMITACIONES

- **Requiere instalación local** — no es un hosted MCP como Shopify o Higgsfield
- **En claude.ai chat:** solo si el conector MCP está configurado localmente y conectado
- **En Claude Code:** funciona nativamente una vez instalado
- **No reemplaza APIs** — cuando hay API disponible (Shopify, Meta), usar la API

---

_SKILL agent-browser v1.0 · Unrealville Studio · Browser automation · Vercel Labs · Principalmente Claude Code_
