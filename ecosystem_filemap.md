# Unreal>ille Context System — File Map
_Generado automáticamente · 2026-05-02-v2_

---

## Raíz del repo `/`

| Archivo | Descripción | Última modificación |
|---|---|---|
| `ecosystem.json` | Estado completo del ecosistema — source of truth | 2026-05-02-v2 |
| `ecosystem.md` | Resumen legible del ecosistema | 2026-05-02-v2 |
| `ecosystem_filemap.md` | Este archivo — mapa de archivos del context system | 2026-05-02-v2 |

---

## `/brands/`

### `/brands/NeuroneSCF/`

| Archivo | Descripción |
|---|---|
| `brand.json` | Config técnica de la marca (Shopify IDs, OAuth, scores) |
| `BP_Brand_Context.md` | Business Plan y contexto completo de marca |
| `session_log.md` | Log de sesiones de trabajo — más reciente al tope |

### `/brands/DiamondDetails/`

| Archivo | Descripción |
|---|---|
| `brand.json` | Config técnica |
| `BP_Brand_Context.md` | Contexto de marca |
| `session_log.md` | Log de sesiones |

### `/brands/VizosCosmetics/`
_(misma estructura que arriba)_

### `/brands/ForumPHs/`

| Archivo | Descripción |
|---|---|
| `brand.json` | Config técnica |
| `BP_Brand_Context.md` | Contexto de marca · document_factory PROD v1.5 |
| `session_log.md` | Log de sesiones |

### `/brands/PatriciaOsorio*/`
_(carpeta por cada sub-brand de Patricia)_

---

## `/protocols/`

| Archivo | Descripción |
|---|---|
| `SESSION_PROTOCOL.md` | Protocolo completo de sesión — incluye comando Actualiza |

---

## `/agents/`

### `/agents/social-media-agent/`

| Archivo | Descripción |
|---|---|
| `session_log.md` | Log de infraestructura Neurone SCF social media (Laura/PO/Sam) |

---

## Notas de estructura

- **Archivos de marca** van en `brands/[Marca]/`
- **Archivos de ecosistema** van en la raíz `/`
- **Agentes** van en `agents/[agent-name]/`
- **Protocolos** van en `protocols/`
- GitHub Desktop debe mostrar MODIFICACIONES (no archivos nuevos) — si aparecen nuevos, el nombre canónico difiere

---

## Última actualización protocolo
El comando `Actualiza` de Sam regenera automáticamente:
1. Verifica Social Media Agent → `agents/social-media-agent/session_log.md`
2. Añade nueva entrada a `brands/[Marca]/session_log.md`
3. Si ecosystem.json cambió: regenera `ecosystem.md` y `ecosystem_filemap.md`
4. Genera todos los archivos como outputs descargables
5. Provee mensaje de commit listo para pegar
