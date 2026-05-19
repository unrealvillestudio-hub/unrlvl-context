# SESSION LOG — Neurone South & Central Florida
_Última actualización: 2026-05-18 · cierre de sesión_
_sma_etag: "W/\"ab5b-8rkoqmKXFHEov+ieOkmB0/CicUU\""_

---

## SESIÓN 2026-05-18 — Sam · Cierre

### APRENDIZAJES APROBADOS (Professor)

**[11] Creative Engine — layers 14/15/16**
La diferencia entre copy correcto y copy memorable.
44 vectores de entrada (6 categorías A-F) + 10 arquitecturas de tensión + 5 niveles AGGRO.
Brand-agnostic. Selección aleatoria dentro de pool compatible por `content_type`.
Tablas Supabase: `creative_vectors`, `tension_architectures`, `aggro_presets`, `creative_compatibility_rules`.
Implementado en `CopyLab/api/execute.ts` v9.0.
Destino knowledge: `knowledge/ecosystem/labs/COPYLAB_NOTES.md` ✅

**[12] Cimientos de Ayra — patrón de construcción**
El trabajo de infraestructura de operaciones y el de Ayra son el mismo trabajo cuando está bien diseñado.
Todo lo construido hoy (content_sequences, lab_configs klaviyo, sequenceBridge, Orchestrator v2.2, CopyLab v9.0)
son nodos que Ayra va a operar cuando llegue su sprint.
Destino knowledge: `knowledge/ecosystem/decision-matrix/CHANGELOG.md` ✅

---

### COMPLETADO HOY

#### 1. SUPABASE — Nuevas tablas ✅
- `content_sequences` + `content_sequence_pieces` — infraestructura de sequence awareness
- `content_sequences.is_current` — solo current + 1 histórico por slot brand+type+language
- `rotate_sequence_current()` — función Postgres que rota al iniciar nuevo run
- `creative_vectors` (44 vectores) + `tension_architectures` (10) + `aggro_presets` (5) + `creative_compatibility_rules` (9)
- `klaviyo` insertado en `lab_configs` → apunta a EF `klaviyo-templates-v2`
- `prompt_Email_Sequence` insertado en `output_templates`

#### 2. SUPABASE — Actualizaciones ✅
- `brand_personas` NeuroneSCF B2C: eliminados `b2c_latina_color` + `b2c_latina_repair` → insertados 7 segmentos por tipo de dolor (sin calificador étnico): `b2c_color_fade`, `b2c_damage_repair`, `b2c_frizz_humidity`, `b2c_chlorine_sun`, `b2c_fine_fragile`, `b2c_scalp_health`, `b2c_default`
- `humanize_profiles` NeuroneSCF: voz de PO actualizada → 35+ años Técnica en química capilar · Vizos Cosmetics - The Healing Systems · Vizos Salón · 3 continentes · tono diagnóstico-prescriptivo · autenticidad sin traducción
- `brand_copy_profiles` NeuroneSCF: `voice_tone_primary` → diagnostic-prescriptive · `voice_tone_secondary` → intimate-expert · `language_geo_default` → South & Central Florida, USA

#### 3. SKILLS ACTUALIZADOS ✅ (pendiente commit a unrlvl-context)
- `skills/content-pipeline/SKILL.md` → v2.5: sequence awareness L0+L5+auto-check-16 · NeuroneSCF personas actualizadas · voz PO correcta
- `skills/copylab-reference/SKILL.md` → v1.1: voz PO 35 años · Vizos Cosmetics · personas NSCF por dolor

#### 4. COPYLAB v9.0 ✅ (deployed en verde)
- `CopyLab/api/execute.ts` v9.0: Creative Engine layers 14/15/16 + email_sequence handling + sequence awareness + motor Claude para email sequences
- `CopyLab/src/config/packs.ts`: 4 email_sequence packs (abandoned_cart, welcome, post_purchase, review_request)

#### 5. ORCHESTRATOR v2.2 ✅ (deployed en verde)
- `Orchestrator/api/interpret-intent.ts` v2.1: objective `email_sequence` + lab `klaviyo` reconocido
- `Orchestrator/src/core/types.ts`: LabId += klaviyo · FlowObjective += email_sequence · InterpretResult += sequence fields
- `Orchestrator/src/services/sequenceBridge.ts`: parse output CopyLab + write Supabase + deploy Klaviyo + markDeployed
- `Orchestrator/src/services/orchestratorEngine.ts` v2.2: klaviyo stage handler + sequenceId propagation

#### 6. PROFESSOR — 20 learnings registrados ✅
Incluyendo: voz PO correcta · segmentación por dolor · protagonista cabello · reveal tardío · Cart A→B secuencia · Creative Engine · AGGRO sin substancia es spam · skill/Supabase sincronía · Ayra como cimientos

---

### ARQUITECTURA UTM → KLAVIYO — Definida

| `utm_content` | persona_key | Tipo de ad |
|---|---|---|
| `color-fade` | `b2c_color_fade` | Ads retención de color |
| `damage-repair` | `b2c_damage_repair` | Ads reparación |
| `frizz-humidity` | `b2c_frizz_humidity` | Ads frizz |
| `chlorine-sun` | `b2c_chlorine_sun` | Ads lifestyle activo |
| `fine-fragile` | `b2c_fine_fragile` | Ads cabello fino |
| `scalp-health` | `b2c_scalp_health` | Ads cuero cabelludo |
| _(sin UTM)_ | `b2c_default` | Fallback |

**Pendiente cuando ads estén live:** script en theme.liquid para pasar UTM a Klaviyo como propiedad de perfil.

---

### ESTADO R4B — FLUJO EMAIL SEQUENCE

El flujo Claude → Orchestrator → CopyLab → Klaviyo está R4B.

**Cómo usarlo:**
```
"Genera el Abandoned Cart para NSCF, segmento b2c_default, ES y EN"
→ Orchestrator interpreta → CopyLab v9.0 genera con Creative Engine
→ sequenceBridge parsea + guarda en Supabase + deploya a Klaviyo
→ Confirmación en chat
```

**Templates Klaviyo pendientes de deploy** (copy aprobado, esperando flujo R4B):

| Flow | ID ES | ID EN |
|---|---|---|
| Abandoned Cart A | `Tm3JWE` | `X57LJu` |
| Abandoned Cart B | `QVANPy` | `Ws6J7R` |
| Post Purchase | `UwszQw` | `SedUug` |
| Review Request | `S6ZDHq` | `U2DMYK` |
| Welcome | `TTrxdT` | `XBvyZH` |

---

### PENDIENTES ACTIVOS

- [ ] **PROFESSOR_SECRET** — Supabase Dashboard · Settings · Edge Functions · Secrets (2 min) 🔴
- [ ] **GA4** — instalar Measurement ID en theme.liquid (5 min) 🔴
- [ ] **Commit skills** — `skills/content-pipeline/SKILL.md` v2.5 + `skills/copylab-reference/SKILL.md` v1.1 + `knowledge/ecosystem/labs/COPYLAB_NOTES.md` + `knowledge/ecosystem/decision-matrix/CHANGELOG.md` → GitHub Desktop → unrlvl-context
- [ ] **Klaviyo flows** — 4 flows bilingüe configurar en UI (manual) · los templates se deployarán vía Orchestrator cuando estén los flows
- [ ] **PO Agent** — infraestructura lista · crear el agente para cumplir promesas de respuesta en emails
- [ ] **Klaviyo image_url** — verificar property name desde Activity Feed
- [ ] **Judge.me automations** — activar review request en Settings → Automations
- [ ] **DY Fazza** — confirmar 200ml vs 400ml con PO (KT-104)
- [ ] **EN descriptions** — bloqueadas por bug `shopify-auto-translate`
- [ ] **Shipping zones** — 3/5 pendientes
- [ ] **Ayra Sprint 0** — deadline 5 Jun

---

## NOTAS TÉCNICAS CRÍTICAS

### Klaviyo
- Public Key: `UNF8Ee`
- Variables válidas en templates: `{{ person.first_name }}`, `{{ item.product_title }}`, `{{ item.image_url }}`, `{{ item.price }}`
- Filtro Liquid `| money`: NO funciona en Klaviyo — usar `{{ item.price }}` directamente
- Image URL: verificar `image_url` vs `ImageUrl` desde Activity Feed
- Flow actions: REST API no permite crearlas — solo flows vacíos · configurar en UI
- EF deploy: `klaviyo-templates-v2` activa · acepta `{ brand_id, template_id, subject, preview_text, html_body, cta_text }`

### CopyLab v9.0
- Motor: Claude exclusivamente para `email_sequence` packs · Gemini para el resto
- Output format para sequenceBridge: `---SUBJECT--- ... ---PREVIEW--- ... ---BODY--- ... ---CTA--- ... ---END---`
- Creative Engine: selección aleatoria dentro de pool compatible por `content_type` — nunca repite combo vector+tension+aggro consecutiva

### Orchestrator v2.2
- `labId: 'klaviyo'` → ejecuta `executeKlaviyoStage()` via sequenceBridge
- `sequenceId` se propaga entre stages via `previousOutputs['sequence_id']`
- sequence awareness: Cart B lee `mechanism_primary` de Cart A desde `content_sequence_pieces`

### Supabase — nuevas tablas sesión 2026-05-18
- `content_sequences` · `content_sequence_pieces` · `creative_vectors` · `tension_architectures` · `aggro_presets` · `creative_compatibility_rules`
- Función: `rotate_sequence_current(brand_id, sequence_type, language)` → rota is_current + limpia histórico > 1

### Judge.me · Meta · Shopify B2C
_(ver notas sesión anterior — sin cambios)_

---

## SESIÓN 2026-05-17 — Sam · Cierre
_(ver entrada anterior)_

SMA: sin novedades · ETag: `W/"ab5b-8rkoqmKXFHEov+ieOkmB0/CicUU"`
