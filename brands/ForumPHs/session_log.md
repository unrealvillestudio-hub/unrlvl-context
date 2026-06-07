# ForumPHs — Session Log

> Repo: `unrlvl-context/brands/ForumPHs/session_log.md`
> Las novedades más recientes van al tope.

---

## 2026-06-06 — SMA reapuntado a ForumPHs · creación de cuentas RRSS (Ivette + Jesús)

**Objetivo de la sesión:** reconfigurar el Social Media Agent (antes de NeuroneSCF) para que guíe la **creación de las cuentas de RRSS de ForumPHs**, ejecutada por Jesús (operador del armado) + Ivette Flores (clienta titular). Manejo continuo posterior: UNRLVL vía dev apps + flujos/labs. **SMA terminado y operativo en producción.**

### Decisiones de plataformas (aprobadas)
- **Mezcla:** Facebook (Página + grupos) + Instagram + LinkedIn (perfil de Ivette + Company Page) + Meta dev app + verificación de negocio. **WhatsApp Business EN PAUSA** hasta número móvil panameño dedicado. **TikTok fuera** (no encaja con servicio legal-administrativo).
- **LinkedIn doble activo:** perfil personal de Ivette (autoridad, ~70-80% del esfuerzo, alcance algorítmico) + Company Page (legitimidad institucional, permanencia). Patrón "persona al frente, marca detrás".
- **Autoridad alimentada por:** blog en forumphs.com + LinkedIn vía Agentes IID; orgánico + ads vía Orchestrator.

### Arquitectura de identidad (crítica)
- Persona real detrás de todas las cuentas: **Ivette Flores** (clienta titular). Desde su perfil personal de Facebook se crea el Business Manager; todo cuelga de ahí.
- **sam@unrealvillestudio.com** = admin de UNRLVL en el BM (control sin titularidad).
- Jesús ejecuta el armado junto a Ivette; los activos son siempre de ForumPHs.

### Orden de creación (10 pasos, BM primero, verificación como prerrequisito)
Correos → número (pausado, solo WhatsApp) → Facebook de Ivette → Business Manager → verificación de negocio Meta → Facebook Page → Instagram → WhatsApp (pausado) → Meta dev app → LinkedIn.

### Correos — aliases reales YA creados (forumphs.com → forumphs507@gmail.com)
- Plataforma: `fb@`, `ig@`, `linkedin@`, `wa@` (reservado). Funcionales: `forumphs@`, `ivetteflores@`, `contacto@`, `info@`, `admin@`, `irja@`.
- **Prerrequisito bloqueante:** Ivette debe tener `forumphs507@gmail.com` agregado y funcionando en teléfono Y compu antes de crear cuentas (las verificaciones llegan ahí).

### Política de seguridad de acceso (empujada por el agente)
- **Passkeys primero** en compu y móvil. **Evitar 2FA opcional** por ahora (hasta estabilizar acceso remoto; solo si la plataforma lo obliga). **Bitwarden** con mini-tutorial para contraseñas que existan.
- Número personal de Ivette aceptable provisional para FB/IG/LinkedIn/BM (teléfono editable); solo WhatsApp exige el dedicado (en WhatsApp el número ES la identidad de la cuenta).

### Roles del SMA (tokens)
- `admin` (Sam/UNRLVL), `client` (Ivette, clienta titular — antes `po`), `ops` (Jesús). Tokens en Vercel: SAMDEV/IVETTE/JESUS.

### Saludo con agenda por rol — funciona
- Al escribir "hola", el agente saluda y despliega la agenda filtrada por rol (verificado: Ivette ve segunda persona "tu cuenta", Sam ve vista admin). La portada de bienvenida es estática (front); la agenda real aparece en la primera respuesta del modelo.

### Estado técnico
- PR #1 (reapuntado) + PR #2 (ajustes: aliases, prerrequisito Gmail, saludo con agenda, endpoint reset) — ambos mergeados a main de AgentLab, desplegados en producción.
- **Historial KV reseteado a cero** vía `/api/reset` (12 keys borradas: 5 chats, 5 raw logs, registry, agent_log). Todos los tokens arrancan limpios.
- **EXPORT_SECRET rotado** por Sam (quedó expuesto en chat durante el reset). Pendiente: actualizarlo en el protocolo Actualiza y userPreferences (ver AGENDA).
- `reset.js` quedó en el repo como herramienta reutilizable (decisión pendiente: dejarlo o quitarlo tras uso).

### Email marketing (decisión tomada)
- FPHs usa **stack nativo Resend + Supabase + Orchestrator** (servicios), NO Klaviyo (que es para e-commerce, NSCF). Diseñar el email de FPHs "CRM-ready" desde el inicio para que el futuro unrlvl-CRM multimarca se enchufe sin reescribir.

### Próximos pasos ForumPHs (cuando Sam decida)
- [ ] Pulido SMA opcional: actualizar los 4 hints viejos (Google Voice/WABA) por hints de FPHs; opción de agenda en portada sin escribir "hola".
- [ ] Conseguir número panameño dedicado → activar WhatsApp Business → integrar ForumPHs Speaks.
- [ ] Ivette + Jesús ejecutan la creación de cuentas siguiendo el SMA.
- [ ] (Pendiente del sprint anterior) fphs-formalize quality sprint 90→98 — sin arrancar.

### SMA (comando Actualiza)
- A partir de v15 del protocolo, el SMA NO se consulta por defecto en Actualiza. Solo si Sam lo pide explícitamente.

---
*ForumPHs · SMA reapuntado + creación de cuentas RRSS · 2026-06-06*

---

## 2026-06-01 — fphs-formalize quality sprint · DIAGNÓSTICO + DISEÑO (sin construir aún)

**Sprint:** llevar el Document Factory del 90% (efectividad Ivette) al 98% (nivel alcanzado manualmente por Claude en el acta del Luxor 300). Sam pidió diagnóstico completo y diseño antes de tocar código. **No se construyó nada todavía** — esta sesión es plano + decisión de arquitectura.

### Panorama del pipeline (mapeado y verificado, no asumido)

```
ZIP → /api/parse (parsers + zipExtractor)
    → PreflightForm (overrides Sam)
    → ProcessingPipeline → fphs-formalize EF (workers async, redacta bloque×bloque)
    → /api/generate (ensambla DOCX + corre runQAScan)  ──→ QAReportView
    → /api/icr (Claude auditor lee acta, emite findings)  ──→ ICRReportView
    → /api/icr-apply → fphs-icr-apply EF (aplica decisiones de Ivette)
    → DOCX final
```

- Repo DF: `github.com/unrealvillestudio-hub/forumphs-document-factory` (PÚBLICO, clonable sin auth).
- Vercel proj: `forumphs-document-factory` (`prj_AUHgIP7cuc95dLz7vbj2P4piinlz`), team `team_fEH94Irp6BAI9YGm4btGna5n`.
- EFs en UNRLVL Supabase (`amlvyycfepwhiindxgzw`): `fphs-formalize` v20, `fphs-icr-apply` v11.

### HALLAZGO CLAVE: nada está roto
- **QA (`lib/processors/qaScanner.ts`)** — intacto y bien hecho. 2 capas: completeness estructural (0-100) + text-quality (regex 1ª persona, oral, género, formato números). Re-run progresivo (commit `89b093c`) funciona.
- **ICR (`/api/icr`)** — es la "capa Claude open" a convertir en Agente Experto. Tiene fallback que nunca tira 500.
- **Anexo ICR visual en DOCX (`/api/generate`)** — banners de color por sección + página anexo con severidad. Intacto (es lo que a Ivette le encanta).
- **`fphs-icr-apply`** — aplica decisiones apply/edit/ignore. Intacto.
- Lo que el session_log previo marcó "roto" era el frontend desconectado (`/api/actas/generate` 404), YA arreglado ayer por commits `6afc6a8` (rewire) + `89b093c` (sweeps).

### Los 5 gaps reales 90→98 (con ubicación en código)
1. **Números en letras** — NO existe. `actaBuilder` + `/api/generate` imprimen dígitos crudos (`${vote.yes_votes} votos`, `${pct}%`). Falta `numeroALetras()` determinística. Gap visual más grande vs acta manual.
2. **`fphs-formalize` formaliza fragmentos aislados** → repite identificación de hablante. NO tocar reparto async (decisión Sam, sólida: un fallo aguas arriba contamina todo lo demás). Afinar prompt: regla números en letras, quitar tope 150-200 palabras, subir `max_tokens` (hoy 400, corta intervenciones largas).
3. **Fallback inyecta 1ª persona** = fuente de los "13 errores". En `fphs-formalize`, si la API falla → `text_formal: t` (texto CRUDO). `templateFormalize` mete cita literal entre comillas. Cada fallo de red = 1 error de 1ª persona.
4. **Imágenes: mete TODAS las del paquete** — `/api/generate` bloque IMAGES APPENDIX vuelca `parsed.images` completo (incluye screenshots de Zoom). → resolver con curaduría visual del Agente.
5. **Matcher de votaciones** — `matchVoteToSection` casa por keywords; votaciones tipo "cuál opción/ a quién se escoge/ tiempo de pago" quedan huérfanas → faltan en QA.

### TOLERANCIA INICIAL (decisión Sam, corregido mi modelo mental)
- Problema real: `attempt 0` es DEMASIADO estricto → formaliza poco contenido → QA e ICR corren con poca info → resultado malo. Aflojar NO es trampa de score: deja pasar MÁS contenido formalizado a las etapas siguientes, que es lo que Claude+QA+ICR necesitan para trabajar. Lo ausente no lo arregla nadie aguas abajo.
- **Cambio:** el comportamiento del `attempt 1` actual pasa a ser el run inicial (`attempt 0`). "Tu segundo run de hoy = tu primer run de mañana".
- **Matiz a implementar:** subir el nivel de FORMALIZACIÓN al de attempt 1 (más contenido pasa) pero dejar el GATE de evaluación honesto, para que el score que ve Ivette no se infle.
- **Bug UI:** el botón de re-run DESAPARECIÓ de la UI (`page.tsx`/`QAReportView` reciben attempt/maxAttempts pero el botón no renderiza). Hay que devolverlo, recontando `MAX_SWEEPS` desde la nueva base.

### AGENTE EXPERTO ForumPHs (reemplaza el `/api/icr` genérico) — 2 manos de criterio
- **Mano A — Auditoría legal Ley 284**: lo que hace hoy el ICR, pero con conocimiento Ley 284 embebido + reglas del acta GOAL. Permanente, registrado (AgentLab), invocado en cada corrida. Alimenta los banners de color.
- **Mano B — Curaduría visual de imágenes**: recibe `parsed.images` (base64), decide con visión cuáles pertenecen al acta (gráfico de votación SÍ, screenshot Zoom NO, convocatoria del ascensor quizá), en qué orden, y genera caption legal de cada una. Resuelve Gap 4 de raíz (mejor que filtro por nombre/tipo, que es frágil).
- Regla del sprint: **dato exacto que existe → determinístico/SQL (nunca agente); criterio/interpretación/visión → Agente.**

### LOOKUP DE FINCA → 4º (5º) fix determinístico + cierre con Agente
- Ley 284: cada unidad lleva su finca individual (finca hija de la matriz). Ivette hoy lo hace a mano = error de input a eliminar.
- **NO lo hace el agente** (Sam lo propuso, Claude corrigió a favor): un JOIN no alucina; un agente sí podría "completar" una finca inexistente = reintroduce el error. Lookup SQL exacto. Si null → `[FINCA PENDIENTE]` → **ICR lo levanta como warning** (cierra el lazo, Ivette lo ve).

### DECISIÓN DE ARQUITECTURA PERMANENTE — normalización unidad→finca
> Sam: "toma la decisión correcta para no volver a trabajar sobre esto, no un parche."

- **(1) Clave canónica GUARDADA** en `units.canonical_key` (no al vuelo), con **índice único `(building_id, canonical_key)`** que mata a nivel DB el bug de duplicados de Torres de Castilla. Una sola `normalizeUnit()` puebla la columna; el lookup siempre lee la columna persistida (auditable). El "al vuelo" queda sólo como función de generación, no como ruta de lookup.
- **(2) Patrones de descomposición por-edificio en TABLA DE CONFIG `building_normalization`** (`source_pattern` regex con grupos nombrados, `tower_strategy` explicit|embedded_prefix|none, `canonical_template`), editable sin deploy. **Sumar un PH nuevo = INSERT de una fila, NO código ni deploy.**
- **PRINCIPIO DE ECOSISTEMA derivado:** conocimiento específico-por-cliente vive como DATOS (config en DB), no como código. Aplica a futuras plantillas de acta, reglas de quórum, etc.
- Auto-diagnosticante: lo que no normaliza (fórmulas Excel de Venezia, etc.) falla en voz alta → warning ICR, en vez de devolver finca equivocada en silencio.

### DB ForumPHs (datos sensibles) — `tajuoqdbnsnzkhyqvdgs` (`forumphs-db`)
- Arquitectura de datos: **UNRLVL = operaciones** (apps, DF, jobs, labs) · **FPHS = datos sensibles** (propietarios, fincas, PHs, JDs). El DF vive en UNRLVL y llama a FPHS cuando necesita datos de propietarios.
- El proxy `fphs-mcp-proxy` permite datos pero requiere el project_id correcto (`tajuoqdbnsnzkhyqvdgs`, NO el de UNRLVL). Proyecto se pausa por inactividad (INACTIVE) — requiere reactivación manual de Sam en dashboard.
- Tabla `units`: campos `unit_code`, `tower`, `floor`, `finca`, `building_id`, `metraje`, `maintenance_fee`. Relación propietario↔unidad en `owner_units`.

### HALLAZGOS DE INTEGRIDAD DE DATOS (registrados en Professor) — NO son del sprint, son deuda de capa de datos
| PH | Formato unit_code | Torre | Cobertura finca |
|---|---|---|---|
| Firenze Tower | `06-A` | — | 80/80 ✅ |
| Lefevre 75 | `01-E-A`, `01-O-B` | — | 184/186 ⚠️ |
| Los Álamos | `C-001` | — | **227/329** 🔴 (102 faltan) |
| **Luxor Towers 300** | `T3 01-OF` | — | 143/143 ✅ (caso validación) |
| Parque Central | `1-001` | — | 82/82 ✅ |
| Plaza España | `1-1A` | — | 70/70 ✅ |
| Torres de Castilla | `10-A` **dup por torre** | A/B | 306/306 (códigos repetidos) |
| Venezia Tower | `=SUM(A10)+1` 🔴🔴 | — | 182/364 (CORRUPTA) |

- **Venezia CRÍTICO:** unit_code son fórmulas Excel sin evaluar; 364 = duplicado ×2 del real 182. Requiere REIMPORTACIÓN.
- **Luxor 300 = caso de validación del sprint** (datos sanos, finca 143/143).

### Próximos pasos (sin arrancar — esperan decisión de orden de Sam)
- [ ] Tolerancia inicial recalibrada + botón re-run restaurado
- [ ] Agente Experto (legal + visual + warning de finca)
- [ ] Fixes determinísticos generador (números en letras, fallback sin 1ª persona, matcher votaciones, lookup finca)
- [ ] Migración DB: `units.canonical_key` + índice único + tabla `building_normalization`
- [ ] (Deuda datos, aparte) Reimportar Venezia; completar fincas Los Álamos/Lefevre

### SMA (comando Actualiza)
- Sin novedades del agente para ForumPHs (el export del SMA corresponde a NeuroneSCF, otra marca).

---
*ForumPHs · fphs-formalize sprint · 2026-06-01 · diagnóstico + diseño, sin construcción*
