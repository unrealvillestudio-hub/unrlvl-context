# SKILL — GitHub Proxy UNRLVL
_Versión: 1.0 · 2026-04-14 · Mantenido por: Claude_

---

## QUÉ ES ESTE SKILL

El sandbox de Claude no puede acceder directamente a `api.github.com` ni `raw.githubusercontent.com` — están bloqueados por la configuración de red del entorno. Este skill documenta el proxy que resuelve ese problema: un endpoint desplegado en `unrlvl-context.vercel.app` que actúa como intermediario autenticado hacia la GitHub API.

El PAT vive como variable de entorno `GH_PAT` en Vercel — nunca viaja en el chat.

---

## ENDPOINT BASE

```
https://unrlvl-context.vercel.app/api/gh
```

**Acceso:** `Vercel:web_fetch_vercel_url` — SIEMPRE. Nunca `web_fetch` para URLs de Vercel.

**Org fija:** `unrealvillestudio-hub`

---

## ACCIONES DISPONIBLES

### `action=repos` — Listar todos los repos del org

```
GET /api/gh?action=repos
```

Retorna: nombre, privado, fecha de update, branch por defecto, descripción.

**Cuándo usarlo:** Para descubrir qué repos existen antes de explorar uno específico.

---

### `action=tree` — Árbol completo de un repo

```
GET /api/gh?action=tree&repo=[REPO_NAME]&branch=[BRANCH]
```

Parámetros:
- `repo` — requerido (ej: `BluePrints`, `CopyLab`, `Tools`)
- `branch` — opcional, default `main`

Retorna: array de todos los archivos con `path` y `size`. Útil para mapear estructura antes de leer archivos.

**Cuándo usarlo:** Antes de leer archivos de un repo desconocido. Para auditoría completa de estructura.

---

### `action=file` — Leer contenido de un archivo

```
GET /api/gh?action=file&repo=[REPO_NAME]&path=/[PATH_AL_ARCHIVO]&branch=[BRANCH]
```

Parámetros:
- `repo` — requerido
- `path` — requerido, debe empezar con `/` (ej: `/brands/Unrealville/brand.json`)
- `branch` — opcional, default `main`

Retorna: `content` (texto decodificado de base64), `sha`, `size`.

**Cuándo usarlo:** Para leer cualquier archivo de texto/JSON/MD de cualquier repo privado del org.

---

## REPOS CLAVE DEL ECOSISTEMA

| Repo | Tipo | Contenido relevante |
|---|---|---|
| `BluePrints` | infra | Brand JSONs, HTMLs, assets. Ruta: `brands/[Marca]/` |
| `unrlvl-context` | infra | Ecosistema, brand contexts, session logs, protocolos |
| `Tools` | privado | Herramientas internas. Contiene `github-auditor/` |
| `CoreProject` | privado | unrealvillestudio.com — Next.js |
| `CopyLab` | lab | Motor de copy |
| `WebLab` | lab | Generador web |
| `ImageLab` | lab | Generación de imagen (Imagen 3 + Gemini) |
| `SocialLab` | lab | Redes sociales |
| `AgentLab` | lab | Agentes autónomos |
| `BlueprintLab` | lab | Blueprints dinámicos |
| `OnboardingApp` | lab | Onboarding de marcas |
| `Orchestrator` | lab | Orquestador de labs |
| `VideoLab` | lab | Generación de video |
| `VoiceLab` | lab | Generación de voz |
| `forumphs-speaks` | agente | Chat agent ForumPHs |
| `forumphs-document-factory` | agente | Document factory ForumPHs |

---

## ESTRUCTURA DE BLUEPRINTS

```
BluePrints/
  ├── brands/
  │   ├── Unrealville/          ← Unreal>ille Studio
  │   │   ├── BP_BRAND_UNRLVL_v1.2.json
  │   │   ├── BP_BRAND_UnrealilleStudio_v1_2.html
  │   │   ├── BP_BRAND_UnrealilleStudio_v1_2_EN.html
  │   │   ├── brand.json
  │   │   └── assets/           ← SVGs, logos
  │   ├── NeuroneSCF/
  │   ├── ForumPHs/
  │   ├── VizosCosmetics/
  │   └── VivoseMask/
  ├── persons/                  ← BP_PERSON (PO)
  ├── products/                 ← BP_PRODUCT (Neurone SKUs)
  ├── locations/                ← BP_LOCATION (Miami, VizosSalon)
  └── docs/reports/
```

---

## AUDITOR HTML (Tools/github-auditor)

Herramienta browser-side que complementa este skill. Corre localmente en el browser de Sam — no ejecutable por Claude directamente.

**Capacidades del auditor HTML:**
- Conecta al org vía PAT ingresado por el usuario en la UI
- Escanea todos los repos con análisis IA (Claude API)
- File browser por repo
- Search full-text en archivos escaneados
- Matriz de variables cross-repo
- Export → "Enviar a Claude" para análisis en chat

**Cuándo usar el auditor vs este skill:**
- Auditor: exploración visual, análisis masivo de todos los repos, matriz cross-lab
- Este skill (proxy): lectura programática de archivos específicos, integración automática en flujo de sesión Claude

---

## FLUJO TÍPICO DE USO

```
1. Claude necesita leer un archivo de un repo privado
2. Llama: Vercel:web_fetch_vercel_url con URL del proxy
3. Proxy autentica con GH_PAT y retorna el contenido
4. Claude procesa el contenido sin que el PAT aparezca en el chat
```

**Ejemplo — leer BP de una marca:**
```
https://unrlvl-context.vercel.app/api/gh?action=file&repo=BluePrints&path=/brands/Unrealville/BP_BRAND_UNRLVL_v1.2.json
```

**Ejemplo — auditar estructura de un lab:**
```
https://unrlvl-context.vercel.app/api/gh?action=tree&repo=CopyLab
```

---

## SEGURIDAD

- El PAT (`GH_PAT`) vive SOLO en Vercel Environment Variables
- Nunca debe aparecer en el chat ni en código commiteado
- Si Claude necesita hacer PUSH (no solo lectura), Sam proporciona el PAT directamente en el chat para esa sesión (ver SESSION_PROTOCOL.md — sección "Push directo a GitHub desde Claude")
- Para push directo Claude usa git clone + push vía bash, no este endpoint
