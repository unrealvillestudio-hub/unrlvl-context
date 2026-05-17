# AGENT-BROWSER — Manual de Plataforma
_Categoría: platform_
_Versión: v1.0 · 2026-05-17 · Estado: approved_

---

## QUÉ ES
Herramienta de automatización de browser para Claude. Permite a Claude controlar un navegador (clicks, navegación, scraping, testing web) a través de MCP. Desarrollado por Vercel Labs.

Repo: `@anthropic-ai/claude-code` + `npx agent-browser-mcp`

---

## CUÁNDO USAR ESTE MANUAL
- Necesitar que Claude ejecute acciones en un browser (UI testing, scraping, tareas repetitivas de UI)
- Configurar agent-browser en un entorno nuevo
- Diagnosticar por qué agent-browser no está disponible en claude.ai

---

## PRE-REQUISITOS
- Claude Code CLI instalado: `npm install -g @anthropic-ai/claude-code`
- Node.js disponible en el sistema
- Terminal separada disponible (especialmente en Windows)

---

## LIMITACIONES CRÍTICAS

| Limitación | Causa | Impacto |
|---|---|---|
| **claude.ai web NO soporta MCP servers locales stdio** | La web de Claude solo acepta remote HTTP MCP servers, no stdio local | Agent-browser NO funciona desde claude.ai — solo desde Claude Code CLI |
| En Windows, requiere terminal separada que permanezca activa | `npx agent-browser-mcp` es un proceso que corre en background | Si se cierra la terminal, agent-browser deja de funcionar y Claude Code pierde el tool |

---

## PROCEDIMIENTO — Setup en Claude Code (Windows)

1. Abrir **Terminal A** (permanece abierta durante toda la sesión):
```bash
npx agent-browser-mcp
```
Mantener activa. No cerrar.

2. En **Terminal B** (o en Claude Code):
```bash
claude mcp add agent-browser --transport stdio -- npx agent-browser-mcp
```

3. Verificar que Claude Code reconoce el tool antes de usarlo.

---

## PROCEDIMIENTO — Setup en Claude Code (Mac/Linux)

```bash
# Un solo terminal — el MCP server corre como proceso managed
claude mcp add agent-browser --transport stdio -- npx agent-browser-mcp
claude  # abre Claude Code con el MCP disponible
```

---

## CUÁNDO NO USAR AGENT-BROWSER

Para tareas de UI puntual en una plataforma conocida (ej: configurar un flow en Klaviyo, hacer un cambio en Shopify admin): **hacerlo manual es más rápido que el setup de agent-browser**.

Agent-browser aporta valor real en:
- Tareas repetitivas de UI que se harán muchas veces
- Scraping de datos estructurados de sitios web
- Testing automatizado de flujos de usuario
- Acciones que requieren navegar múltiples páginas en secuencia

---

## ERRORES CONOCIDOS

| Error | Causa | Solución |
|---|---|---|
| Claude Code no ve el tool agent-browser | Terminal del MCP server cerrada | Reabrir Terminal A con `npx agent-browser-mcp` antes de usar Claude Code |
| "Tool not available" en claude.ai | claude.ai solo soporta remote HTTP MCP — no stdio local | Usar Claude Code CLI en vez de claude.ai web |

---

## CHANGELOG

| Versión | Fecha | Cambio |
|---|---|---|
| v1.0 | 2026-05-17 | Creación inicial — limitación stdio confirmada, proceso Windows documentado |
