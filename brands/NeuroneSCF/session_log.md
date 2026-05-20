# SESSION LOG — Neurone South & Central Florida
_Última actualización: 2026-05-19 · cierre de sesión_
_sma_etag: "W/\"ab5b-hkrbK3pa3XP7FZPxY4Q/qZ2U928\""_

---

## SESIÓN 2026-05-19 — Sam · Cierre

### FOCO PRINCIPAL
Construcción del Voice Genome System como infraestructura ICR multimarca + reescritura iterativa de Restore Therapy Plus aplicando motor completo.

**Resultado:** Infraestructura completa operativa en Supabase + 1 kit generado (v4 aprobado, pendiente aplicar a Shopify) + skill v2.6 listo para commit.

---

### APRENDIZAJES CAPTURADOS (Professor — pendientes aprobación)

8 learnings insertados en `professor_learnings` con `approved_by_sam = false`:

**Architecture (2):**
- `NSCF-Arch-001` · Voice como capa separada del skill. El skill (motor) y el voice (ADN) son responsabilidades distintas. Solución: tabla `brand_voice_genome` con ADN ejecutable, consumida en L1.5 VOICE_GENOME_INJECTION.
- `NSCF-Arch-002` · Creative Engine y Voice Genome no compiten — colaboran. Vector (L14) define ángulo de entrada. Voice genome (L1.5) define tono superficial. Vector gana en arquitectura, voice gana en superficie léxica.

**Voice (3):**
- `NSCF-Voice-001` · Etiquetas descriptivas NO son voice operativo. "Voz diagnóstica-prescriptiva" es hipótesis; lexicon firmado + sintaxis firmada + arquitectura argumentativa son operación.
- `NSCF-Voice-002` · Material de audio espontáneo es la fuente más rica del voice operativo. 4 minutos de audio dan más signature material verificable que 10 documentos editoriales.
- `NSCF-Voice-003` · Recursos firmados son FIRMA, no FÓRMULA. trademark_word + syntactic_signatures = MAX 1 vez por pieza. Si aparecen en cada pieza se vuelven patrón vacío.

**Copywriting (2):**
- `NSCF-Copy-001` · Regla d7h heredada para descripciones multi-componente. Cada componente con [rol funcional] + [efecto reconocible]. Origen d7herbal, heredado por NSCF.
- `NSCF-Copy-002` · Separación obligatoria body / how_to_use en descripciones de producto. Body vende el RITUAL. how_to_use explica la OPERATIVA. Outputs separados.

**CRO (1):**
- `NSCF-Copy-003` · Cierre honesto convierte mejor que proyección emocional. Hipótesis AB-testeable.

---

### COMPLETADO HOY

#### 1. SUPABASE — Voice Genome System ✅

**Nueva tabla `brand_voice_genome`** — schema completo (12 columnas JSONB + metadata + versioning + maturity tracking).

**Filas insertadas:**
- `NeuroneSCF / po_consumer / v0.5` — base estructural inicial · ❌ desactivada como historial
- `NeuroneSCF / po_consumer / v0.6` — ✅ ACTIVA · enriquecida con regla d7h + output_separation

**Capas operativas del genoma v0.6:**

| Capa | Contenido |
|---|---|
| identity_anchors | PO autoridad invocada SOLO por trayectoria (35 años · Vizos Cosmetics · 3 continentes) — NUNCA por chemistry jargon |
| lexicon_signature | "mira", "déjame contarte", "considero", "yo lo veo", "yo lo armé", "delicado" (trademark word) |
| lexicon_forbidden | Sin "ritual mágico", "elixir", "transformación", sin "Daltons", "biomimetic", "peptide bridges" |
| syntactic_signatures | Triplicación enfática como firma — MAX 1 por pieza |
| argumentative_architecture | DIAGNOSIS → PRESCRIPTION (d7h) → CONSEQUENCE → CLOSING (honestidad radical) |
| relational_stance | TÚ presente como sujeto principal — nunca el producto |
| emotional_register | Cariño maternal + autoridad clínica + honestidad radical |
| application_constraints | Aplica a: product_description_b2c, email_sequence consumer, klaviyo flows. NO aplica a B2B. |

#### 2. SUPABASE — Preset product_description_b2c ✅

**Nuevas rows:**
- `creative_compatibility_rules / product_description_b2c` — ✅ ACTIVA · 32 vectors (todos los A/B/C/D/E permitidos excepto B4 B5 C7 D9 E7 — reservados para SOS) · 4 tensiones (T1, T4, T6, T10) · AGGRO 1-3 (sin urgency, sin pressure, sin full aggro) · rotation_rule random_no_repeat
- `output_templates / prompt_Product_Description_B2C / v1.2` — ✅ ACTIVA · word_count 200-350 · incluye consumo voice_genome + regla d7h + output_separation + 24 auto-check points

#### 3. SKILL content-pipeline v2.6 ✅ (pendiente commit a unrlvl-context)

Cambios principales:
- Nuevo Layer L1.5 — VOICE_GENOME_INJECTION
- Documentación formal Creative Engine v9.0 como capas L14/L15/L16
- Nuevo content_type `product_description_b2c`
- Nueva REGLA D7H en L1
- Nueva REGLA OUTPUT_SEPARATION en L5
- AUTO-CHECK extendido a 24 puntos (16 base + 8 voice genome)

#### 4. AUDITORÍA SHOPIFY NSCF ✅ (durante la sesión, descubrimientos colaterales)

**Pixels:**
- ✅ Meta Pixel — instalado correctamente · `1348252664025025`
- ✅ Klaviyo identify — instalado correctamente · `UNF8Ee`
- ✅ GTM `GTM-N2L4CMZH` + GA4 conectado por Sam — verificación pendiente
- ⚠️ TikTok Pixel **DUPLICADO** — `D866BMBC77UBK82UUH50` antes del meta charset + `D832THJC77UATASL0OO0` después del Meta Pixel → MAPEADO EN AGENDA

**Traducciones EN:**
- Bug `shopify-auto-translate` cerrado — descubierto que se resolvió 2026-05-15
- 41/41 productos tienen `body_html` traducido EN ✅
- ~11 productos tienen traducción EN parcial (solo body, falta title/meta) — no bloqueante

**Datos corregidos del session_log anterior:**
- Productos activos B2C: 41, no 42

#### 5. RESTORE THERAPY PLUS — generación iterativa ✅

Iteraciones:
- v1 (pre-sesión) — sin motor
- v2 — con motor pero sin voice genome → output correcto pero sin carisma
- v3 — con voice genome v0.5 → apertura "Mira" + cierre honesto + triplicación 1 vez (Sam: "no estoy emocionado")
- v4 (APROBADA) — agrega regla d7h + separación body/how_to_use vía `<details>` HTML

**Seed creativo final v4:** E3 SALON_CONVERSATION + T6 SUSTAINED_LOW_PRESSURE + AGGRO_2 FIRM + voice po_consumer v0.6.

Estado: HTML auditable generado · pendiente aplicar a Shopify vía MCP productUpdate + translationsRegister.

---

### PENDIENTES ACTIVOS (priorizados)

**🔴 Crítico — antes de cualquier ads:**
- [ ] **TikTok Pixel duplicado** — Resolver cuál ID es correcto en TikTok Ads Manager y eliminar el bloque duplicado
- [ ] **GTM + GA4 verificación** — GTM Preview Mode + GA4 DebugView
- [ ] **PROFESSOR_SECRET** — Supabase Dashboard · Settings · Edge Functions · Secrets

**🟠 Alta — contenido NSCF:**
- [ ] **Aplicar Restore Therapy Plus v4 a Shopify** vía productUpdate + translationsRegister
- [ ] **Escalar voice + motor a los otros 11 kits NSCF** — cada uno con seed creativo distinto. Orden: Restore Therapy base → Moisture Recovery + Plus → Perfect Blonde + Plus → Hydra Boost → SOS Rescue System (último por densidad Tier 1) → Blonde Guard + Plus → Moisture & Shine → Restore & Shield
- [ ] **Validar con Patricia composición técnica** de cada kit antes de aplicar

**🟡 Media — voice genome enrichment:**
- [ ] **Capturar 3-5 audios adicionales de PO** en contextos variados → llevar `po_consumer` v0.6 a v1.0 mature
- [ ] **Capturar voice genome `po_b2b`** (PO hablando a estilistas/distribuidoras)

**🟡 Media — Klaviyo:**
- [ ] **4 flows bilingüe en UI Klaviyo** (Welcome, Browse Abandoned, Cart Abandoned, Post Purchase)
- [ ] **Deploy 10 templates Klaviyo** vía Orchestrator R4B una vez los flows estén creados

**🟢 Baja — backlog técnico:**
- [ ] ~11 productos con traducción EN parcial — re-corrida targeted shopify-auto-translate
- [ ] DY Fazza KT-104 SOS — decisión 200ml vs 400ml
- [ ] Shipping zones — 3/5 configuradas, faltan 2
- [ ] **Crear metafield `how_to_use_es/en`** + section en theme NSCF para migrar fallback `<details>` HTML

**🔴 Documentación y commits:**
- [ ] **Commit SKILL.md v2.6** a `unrlvl-context`
- [ ] **Commit brand.json v11** + AGENDA.md v6 + ecosystem.json v11 + session_log.md actualizado
- [ ] **Crear `BP_Brand_Context.md` NSCF** — listado en SESSION_PROTOCOL pero no existe en repo
- [ ] **Update COPYLAB_NOTES.md** con voice_genome system documentado

**🟢 Baja — Professor:**
- [ ] Revisar 8 learnings de hoy (`approved_by_sam = false`)

---

## NOTAS TÉCNICAS CRÍTICAS

### Voice Genome System (nuevo 2026-05-19)
- Tabla `brand_voice_genome` con ADN ejecutable multimarca, multivoz por marca
- Consumido en L1.5 VOICE_GENOME_INJECTION del pipeline
- Versionado obligatorio · maturity tracking · una versión active por (brand,voice)
- Source evidence requerida — qué audios/textos respaldan cada regla del genoma
- Protocolo de captura documentado en SKILL v2.6 (recolectar fuente → análisis lingüístico → destilado a reglas operativas → validación humana → INSERT/UPDATE)

### Creative Engine v9.0 (formal en skill v2.6)
- Brand-agnostic · 44 vectores · 10 tensiones · 5 AGGRO · 10 reglas de compatibilidad
- Para `product_description_b2c`: 32 vectors, 4 tensiones (T1/T4/T6/T10), AGGRO 1-3 (sin urgency)
- Selección random_no_repeat dentro del pool compatible
- Combinación vector+tension+aggro nunca repetida consecutiva por marca

### Regla d7h (heredada en sesión 2026-05-19)
- Origen: D7Herbal
- Aplicación a descripciones multi-componente: cada componente con [nombre] + [rol funcional específico] + [efecto reconocible]
- Prohibido: descripciones genéricas tipo "ayuda a nutrir y reforzar"
- Hedging diferenciado: mecanismo con hedging ("ayuda a", "contribuye a"), experiencia sin hedging

### Klaviyo
- Public Key: `UNF8Ee`
- Variables válidas: `{{ person.first_name }}`, `{{ item.product_title }}`, `{{ item.image_url }}`, `{{ item.price }}`
- Filtro Liquid `| money`: NO funciona — usar `{{ item.price }}` directo
- Flow actions: REST API no permite crearlas, configurar en UI

### CopyLab v9.0
- Motor: Claude exclusivamente para `email_sequence` packs · Gemini para el resto
- Output format sequenceBridge: `---SUBJECT--- ... ---PREVIEW--- ... ---BODY--- ... ---CTA--- ... ---END---`
- Creative Engine integrado · selección aleatoria pool compatible

### Orchestrator v2.2
- `labId: 'klaviyo'` → ejecuta `executeKlaviyoStage()` via sequenceBridge
- `sequenceId` se propaga entre stages
- Sequence awareness: Cart B lee `mechanism_primary` de Cart A

### Supabase — tablas canónicas del ecosistema
- `brand_personas` · `brand_copy_profiles` · `humanize_profiles` · **`brand_voice_genome`** (nuevo)
- `compliance_rules` · `brand_goals` · `content_sequence_pieces` · `output_templates`
- `creative_vectors` · `tension_architectures` · `aggro_presets` · `creative_compatibility_rules`
- `professor_learnings`

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

### COMPLETADO 2026-05-18

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

## SESIÓN 2026-05-17 — Sam · Cierre
_(ver entrada anterior)_

SMA: sin novedades · ETag: `W/"ab5b-8rkoqmKXFHEov+ieOkmB0/CicUU"`
