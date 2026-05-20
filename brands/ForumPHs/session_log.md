# SESSION LOG — ForumPHs
_Actualizado: 2026-05-20 · Por: Claude (protocolo Actualiza)_

---

## SESIÓN 2026-05-20 — INFRA DB + PROFESSOR REVIEW

### COMPLETADO HOY

#### 1. MCP Supabase ForumPHs — Custom Connector
- **Problema:** Claude.ai rechaza dos conectores con la misma URL base
- **Solución:** Proxy Vercel `fphs-mcp-proxy.vercel.app/api/mcp`
- **Repo:** `unrealvillestudio-hub/fphs-mcp-proxy`
- **Variable:** `SUPABASE_FPHS_TOKEN` (sensitive, solo Production)
- **Estado:** ✅ LIVE

#### 2. Supabase ForumPHs DB — Schema completo
- **Proyecto:** `forumphs-db` · ID: `tajuoqdbnsnzkhyqvdgs` · org: `qybmxrjwrwurdgddgbnx`
- **Tablas core:** `buildings`, `units`, `owners`, `owner_units`, `residents`, `vehicles`, `pets`, `meters`
- **Módulo Asambleas:** `assemblies`, `assembly_agenda_items`, `assembly_votes`
- **Módulo Pagos:** `payments`, `arrears`
- **Módulo Comunicaciones:** `communications`
- **RLS:** habilitado ✅

#### 3. Data cargada — 8 PHs, 1,558 unidades

| PH | Units | Owners |
|---|---|---|
| PH Torres de Castilla | 306 | 306 |
| PH Los Alamos | 329 | 228 |
| PH Lefevre 75 Don Enrique | 184 | 170 |
| Venezia Tower | 364 | 182 |
| PH Luxor Towers 300 | 143 | 143 |
| PH Parque Central Arraijan | 82 | 82 |
| PH Firenze Tower | 80 | 80 |
| PH Plaza España | 70 | 70 |
| **TOTAL** | **1,558** | **1,261** |

- Venezia: 182 trasteros como `unit_type = 'storage'`
- Los Alamos / Lefevre: diferencia = unidades sin propietario en Excel original
- Pets: 15 · Vehicles: 14

#### 4. Professor — 8 learnings NSCF revisados
Todos documentados en `content-pipeline/SKILL.md v2.6`. Decisiones:

| Learning | Decisión |
|---|---|
| NSCF-Copy-001 — regla d7h | ✅ Cubierto en v2.6 L1 |
| NSCF-Arch-002 — Creative Engine vs Voice Genome | ✅ Cubierto en v2.6 L1.5 REGLA 2 |
| NSCF-Voice-001 — etiquetas vs voice operativo | ❌ Rechazado — trabajo de CopyLab |
| NSCF-Copy-002 — body / how_to_use | ✅ Cubierto en v2.6 L5 OUTPUT_SEPARATION |
| NSCF-Arch-001 — voice como capa separada | ✅ Cubierto en v2.6 L1.5 completo |
| NSCF-Voice-002 — audio espontáneo | ✅ Cubierto en protocolo captura |
| NSCF-Voice-003 — firma ≠ fórmula MAX 1 | ✅ Cubierto en v2.6 L1.5 REGLA 1 |
| NSCF-Copy-003 — cierre honesto hipótesis | ❌ Rechazado — no es regla general |

#### 5. Professor — 4 learnings de infra aprobados e insertados

| ID | Learning | Score |
|---|---|---|
| `2450ec1e` | Carga masiva Supabase: MCP vs SQL Editor | 5 |
| `6193f67d` | MCP multi-cuenta: proxy Vercel | 5 |
| `698d0da9` | Validación SQL con Python: bug de newlines | 4 |
| `e1ae4d03` | SQL Editor: no hay upload, solo copy-paste | 4 |

**Knowledge generado:**
- `knowledge/infrastructure/SUPABASE_DATA_LOADING.md` — v1.0
- `knowledge/infrastructure/MCP_MULTI_ACCOUNT.md` — v1.0

#### 6. PRs identificados (pendientes de sprint)
- **Product Description PR** — generación descripciones Shopify (voice genome + d7h + output separation)
- **Shopify Ecommerce / WebLab PR** — how_to_use como metafield o HTML fallback
- **Brand Voice Architecture PR (Ecosystem)** — L1.5 aplica a todos los Labs con output público (ICR)

#### 7. Professor Secret → ✅ Configurado en `amlvyycfepwhiindxgzw`

---

## BLOQUEADORES

| Blocker | Estado |
|---|---|
| Meta Developer App — verificación teléfono Laura | ⏳ Sin resolver |
| Instagram → Facebook Page link | ⚠️ Pendiente confirmar |
| PROFESSOR_SECRET | ✅ Resuelto |
| DB ForumPHs schema + datos | ✅ Resuelto |
| MCP ForumPHs connector | ✅ Resuelto |

---

## PRÓXIMOS PASOS FORUMPHS
1. RLS policies antes de conectar portal público
2. Datos faltantes: Los Alamos 101 sin owner, Lefevre 14 — completar con Ivette
3. Portal de Propietarios — Sprint S3
4. Document Factory — integrar `assemblies` + `assembly_votes`

---
_Social Media Agent: Sin novedades desde último Actualiza_
_session_log · ForumPHs · 2026-05-20_
