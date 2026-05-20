# SESSION LOG — Neurone South & Central Florida
_Última actualización: 2026-05-19 · cierre de sesión_

---

## SESIÓN 2026-05-19 — Sam · Cierre

### TRABAJO COMPLETADO

#### Infraestructura — Message Queue + Job Runner
- ✅ Tabla `lab_jobs` creada en Supabase (cola de jobs del ecosistema)
- ✅ EF `lab-worker` deployada (v8 — encuentra jobs, llama labs, escribe output)
- ✅ EF `claude-lab-bridge` deployada (puente de debug)
- ✅ `api/job-runner.js` deployado en unrlvl-context (Vercel, 300s timeout)
- ✅ `vercel.json` actualizado con cron → /api/job-runner (pendiente activar)
- ✅ `api/lab-invoke.js` deployado en unrlvl-context
- ✅ `dispatch_lab_job(job_id, service_key)` en Supabase SQL
- ✅ `lab_jobs` RLS deshabilitado + GRANT ALL

#### CopyLab v9.2 — deployed en verde
- ✅ v9.1: brandContext mapping corregido
- ✅ v9.2: VITE_SUPABASE_URL → SUPABASE_URL (root cause del timeout resuelto)
- ✅ v9.2: product_description_pack añadido
- ✅ maxDuration: 300s
- ✅ Vercel CopyLab: SUPABASE_URL + SUPABASE_ANON_KEY + ANTHROPIC_API_KEY añadidas

#### Creative Engine — Supabase
- ✅ `creative_vectors` (44), `tension_architectures` (10), `aggro_presets` (5)
- ✅ `creative_compatibility_rules` (9), `content_sequences`, `content_sequence_pieces`
- ✅ `klaviyo` en lab_configs, `prompt_Email_Sequence` en output_templates

#### Orchestrator v2.2 — deployed en verde
- ✅ types.ts: LabId += klaviyo, FlowObjective += email_sequence
- ✅ sequenceBridge.ts: parse + Supabase write + Klaviyo deploy
- ✅ orchestratorEngine.ts: klaviyo stage handler + sequenceId propagation

---

### PROBLEMA ACTIVO — Worker timeout (Supabase Free = 60s EF limit)

El lab-worker encuentra los jobs correctamente (claimed_at se marca, processing confirmado) pero Supabase Free corta las EFs a 60s. CopyLab necesita ~60-90s.

**Soluciones pendientes (sprint CopyLab):**
- Opción A: Supabase Pro ($25/mes) → EFs 150s
- Opción B: Next.js wrapper para activar Vercel cron en unrlvl-context

---

### DESCUBRIMIENTO CRÍTICO — CopyLab UI hardcoded

Error en prueba manual:
```
[buildCopyPrompt] OutputTemplate 'Email_Sequence' no encontrado
Disponibles: prompt_Email_Sequence, Product_Description...
```

- buildCopyPrompt.ts cliente NO conecta a Supabase dinámicamente
- Products: solo Collections hardcodeadas — no hay Kits
- Template ID mismatch: código usa 'Email_Sequence', Supabase tiene 'prompt_Email_Sequence'

**Sprint CopyLab programado: 2026-05-20**

---

### PENDIENTES ACTIVOS

- [ ] **Sprint CopyLab** — buildCopyPrompt.ts → Supabase dinámico + Kits + template IDs sync
- [ ] **Worker timeout** — Supabase Pro o Next.js wrapper
- [ ] **PROFESSOR_SECRET** — Supabase secrets 🔴
- [ ] **GA4** — theme.liquid 🔴
- [ ] **Klaviyo flows** — configurar 4 flows bilingüe en UI
- [ ] **Ayra Sprint 0** — deadline 5 Jun 🔴
- [ ] **PO Agent** — prioridad alta
- [ ] **Commit skills** a unrlvl-context

---

### FLUJO OPERATIVO lab_jobs (para referencia)

```sql
INSERT INTO public.lab_jobs (lab, brand_id, pack, position, language, persona_key, sequence_type, dry_run)
VALUES ('copylab', 'NeuroneSCF', 'email_sequence_abandoned_cart', 1, 'ES', 'b2c_default', 'abandoned_cart', true)
RETURNING id;

SELECT net.http_post(
  url := 'https://amlvyycfepwhiindxgzw.supabase.co/functions/v1/lab-worker',
  headers := jsonb_build_object('Content-Type','application/json','Authorization','Bearer [SRK]'),
  body := jsonb_build_object('job_id', '[UUID]')
);

SELECT status, output_parsed FROM public.lab_jobs WHERE id = '[UUID]';
```

---

## SESIÓN 2026-05-18 — Sam · Cierre
_(ver entrada anterior — Creative Engine + email_sequence R4B)_

SMA: sin novedades · ETag: `W/"ab5b-g8CPdWLepu6Sw1bTfmOnuAoe1tw"`
