# UNRLVL — Plan Maestro de Desarrollo
_Generado: 2026-04-15 · Sesión de auditoría completa de labs_
_Este documento es referencia permanente para Claude en sesiones de trabajo técnico._

---

## ESTADO ACTUAL DE LABS (post-auditoría 2026-04-15)

### CopyLab ✅ PROD v8.0
**Motor:** 13 capas (Brand, Goals, Personas, Language, Canal, Humanize F2.5, GeoMix, Keywords, CTAs, Compliance, BP_COPY_1.0)
**Templates en Supabase:** Instagram, TikTok, Meta Ads, Google RSA, Blog, Landing Page, Email, YouTube Script, Brand Kit
**Gap crítico:** BP_COPY_1.0 vacío para NeuroneSCF, ForumPHs, UnrealvilleStudio
**Próximas mejoras:**
- [ ] Completar BP_COPY_1.0 para las 3 marcas pendientes (via OnboardingApp)
- [ ] Revisar templates de TikTok Hook — formato actualizado 2025
- [ ] Añadir template: WhatsApp Broadcast Message
- [ ] Añadir template: SMS Marketing (para cuando Twilio esté activo)
- [ ] Testing ICR: ejecutar suite completa con NeuroneSCF cuando BP_COPY esté completo

---

### WebLab ✅ PROD — Shopify module ACTIVO
**Motor:** webEngine.ts (47KB) + Shopify module completo
**Tiene:** OAuth Shopify, ThemeDeployModule, ShopifyPushModule, tema Liquid completo (nc-* sections), product catalog (72KB), theme catalog (71KB), Sales Layer, EcomProductSelector
**Tema Liquid activo:** nc-header, nc-hero, nc-collection-grid, nc-product-detail, nc-footer, nc-sales-layer, nc-trust-strip + más
**Histórico de fricción:** Conexión Claude→Shopify API tenía bloqueos → por eso NeuroneSCF tiene su propio tema deployado manualmente. WebLab resuelve esto.
**Sprint pendiente (Objectives Window):**
- [ ] Objectives Window — campo libre de intención específica del output
- [ ] Plantillas institucionales: web_institucional, blog, propuesta_pitch, email_captacion
- [ ] Renombrar botón AGGRO → SUPER AGGRO + pantalla advertencia
- [ ] Sales Layer — modo Personalizar (táctico avanzado)
- [ ] Probar ShopifyPushModule con NeuroneSCF en producción (cliente credentials flow)
**Testing:**
- [ ] Deploy temático completo NeuroneSCF desde WebLab (end-to-end)
- [ ] Validar nc-product-detail con 87 SKUs reales
- [ ] ICR sobre outputs web generados

---

### ImageLab ✅ PROD ICR v1.0 — PsychoLayer integrado
**Motor:** Gemini Imagen 3 + Gemini 2.5 Flash
**Tiene:** Composite operations, alphaBBox, fitProduct, cameraLock, resize/convert, remoción de fondo por color-matching (basic), Psycho Layer (10 presets), Blueprint system (Person, Location, Product)
**Gaps identificados:**
- Remoción de fondo: solo color-matching (funciona solo en fondos planos)
- Sin face detection ni smart crop
- Sin extracción de paleta de colores
- Sin manipulación de colores en logos
- Sin pipeline de preparación para LoRA training
- Sin caption generation para training sets
**Próximas implementaciones (prioridad alta):**

#### MÓDULO LORA PREP (nuevo) — ALTA PRIORIDAD
Pipeline completo para preparar fotos de personas reales para entrenamiento LoRA:
```
INPUT: fotos cliente (cualquier formato/calidad)
  ↓ Face detection (Fal.ai)
  ↓ Smart crop → busto/retrato cuadrado, cara centrada, 1024×1024
  ↓ Background removal (Fal.ai birefnet — AI real, no color-matching)
  ↓ Quality filter (blur detection, lighting score)
  ↓ Caption generation (Claude Vision → training prompt por imagen)
     "a photo of [trigger_word], woman with brown highlighted hair,
      wearing black, warm smile, portrait"
  ↓ Export ZIP → listo para Fal.ai FLUX Dreambooth
OUTPUT: ZIP con imágenes procesadas + captions.txt
```
API necesaria: `fal-ai/birefnet` (background removal) — Fal.ai ya configurado
**Integración:** BlueprintLab llama a este módulo en el wizard de BP_PERSON

#### Extensión Psycho Layer (pendiente)
- [ ] CopyLab — inyectar estímulo psicológico al prompt
- [ ] SocialLab — selector de Psycho Layer antes de publicar
- [ ] VideoLab — Psycho Layer en script generation
- [ ] VoiceLab — Psycho Layer en voice persona

#### Mejoras de processing
- [ ] Integrar Fal.ai birefnet como método de remoción preferido
- [ ] Palette extraction (Python PIL en container Claude como fallback)
- [ ] Logo color swap (canvas + PIL)
- [ ] Batch export por formato (story 9:16, feed 1:1, banner 16:9, favicon)

---

### AgentLab ✅ PROD — Supabase-first
**Tiene:** AgentBuilder, FlowBuilder, PromptManager, ConversationMonitor, BlueprintLibrary, TestMode, WhatsAppIntegration
**Sub-app:** apps/assistant (standalone agent deployable, "inline/embedded")
**Canales soportados:** WhatsApp, Web Chat, Voice
**Estado real de canales:**
- WhatsApp: webhook existe en código, necesita número Twilio conectado (PENDIENTE)
- Web Chat: apps/assistant es el patrón, Profiler Agent y ForumPHs Speaks son instancias productivas
- Voice: UI lista, pendiente integración

**Tipos de deployment a documentar en skill:**
```
1. WhatsApp       → webhook Twilio → AgentLab → responde por WA
2. Inline/Embedded→ widget en web del cliente (patrón: apps/assistant)
3. Standalone     → URL propia (ej: agent.clientbrand.com)
4. Con cuenta cliente → API key del cliente como param (costos en su cuenta)
5. Interno        → dentro de nuestras propias herramientas (Profiler Agent)
```
**Pendiente:**
- [ ] Conectar Twilio cuando Sam tenga número
- [ ] NeuroneSCF WhatsApp agent (primero de cliente)
- [ ] Template de inline agent embebible (un script, cualquier web)

---

### BlueprintLab ✅ PROD
**Schemas:** BP_PERSON_1.0, BP_LOCATION_1.0, BP_PRODUCT_1.0, BP_COPY_1.0
**Gap:** BP_COPY_1.0 no tiene datos para NeuroneSCF, ForumPHs, UnrealvilleStudio
**Flujo LoRA propuesto:**
```
BlueprintLab → wizard BP_PERSON
  ├── Datos del persona (nombre, psicografía, rol)
  ├── Upload fotos reales (si aplica)
  │   └── [llama a ImageLab LoRA Prep]
  │       → procesa, genera ZIP + captions
  ├── LoRA training config (trigger word, pasos, etc.)
  └── Export BP_PERSON_1.0.json completo
```
**Pendiente:**
- [ ] Wizard BP_PERSON con paso de LoRA Prep integrado
- [ ] Completar onboarding de: NeuroneSCF, ForumPHs, UnrealvilleStudio via OnboardingApp

---

### VideoLab 🔴 BLOQUEADO
**Bloqueante:** HeyGen API key + Kling API key
**Acción:** Cuando Sam tenga las keys, configurar y hacer testing completo
**Próximas mejoras post-desbloqueo:**
- [ ] Integrar Psycho Layer en script generation
- [ ] Plantilla de video podcast para Patricia Osorio (formato TikTok)
- [ ] UGC-style video con avatar LoRA + voice clone ElevenLabs

---

### VoiceLab 🔴 BLOQUEADO
**Bloqueante:** voice_ids ElevenLabs para PO y marcas
**Acción:** Cuando voice IDs estén configurados, testing completo

---

### SocialLab ✅ PROD — OAuth pendiente
**Tiene:** CopyLabBridge (conexión directa), UI de publicación
**Gap:** Meta y TikTok OAuth no conectados → publica en modo simulado
**Pendiente:**
- [ ] Meta OAuth completo (PO en Miami, sin VPN)
- [ ] TikTok OAuth
- [ ] Extensión Psycho Layer antes de publicar
- [ ] Testing real con NeuroneSCF posts

---

### Orchestrator ✅ PROD
**Motor:** interpret-intent.ts — Claude analiza prompt → plan JSON → ejecuta labs en secuencia
**Capacidad real:** Conoce todos los labs, puede orquestar flujos multi-lab, aprobaciones por paso
**Update pendiente:** Cuando ImageLab LoRA Prep esté listo, actualizar el system prompt de interpret-intent.ts para incluirlo como lab disponible
**Pendiente:**
- [ ] Testing flujo completo end-to-end: NeuroneSCF post → CopyLab → ImageLab → SocialLab
- [ ] Añadir imagelab LoRA Prep como lab_id disponible
- [ ] Añadir blueprintlab BP_PERSON como paso disponible en flujos

---

### Profiler Agent ✅ PROD v5
**Engine:** Supabase Edge Function unrlvl-profiler v5
**Tiene:** Conversación 5 etapas EN/ES, conocimiento de marketing/publicidad, graceful data gaps, scoring fit, brief Claude, email via Resend, auto-sync CRM
**Frontend:** index.html pendiente push a CoreProject (PAT requerido)
**Pendiente:**
- [ ] Push index.html a CoreProject (PAT)
- [ ] CRM dashboard para gestión de leads
- [ ] Flujo email al prospecto calificado

---

## SKILLS PERMANENTES — Plan de implementación

### Prioridad 1 — `ui-ux-layer`
**Qué documenta:** CSS vars UNRLVL, logotipo (chevron blink), paleta (cyan/amber/chalk/void), footer estándar 2px cyan, tipografía (Bebas Neue + Space Mono + Libre Baskerville), patrones de componentes, checklist ICR para HTML
**Impacto:** Cada sesión de construcción visual — Claude mantiene consistencia BP_BRAND sin redescubrir
**Esfuerzo:** 1 sesión

### Prioridad 2 — `image-processing`
**Qué documenta:** (a) qué puede hacer ImageLab hoy, (b) el pipeline LoRA Prep, (c) cuándo usar Fal.ai birefnet vs color-matching, (d) cuándo usar Python PIL en container Claude para gaps (palette, color swap, batch export), (e) formato de captions para LoRA training
**Impacto:** Directo en BP_PERSON workflow, LoRA assets de todos los clientes
**Esfuerzo:** 1 sesión + implementación Fal.ai birefnet

### Prioridad 3 — `agent-builder`
**Qué documenta:** Patrones de deployment por canal (WA, inline, standalone, cuenta cliente), Edge Function pattern canónico (ForumPHs Speaks como referencia), templates de system prompt por tipo de agente, cómo conectar Twilio cuando llegue
**Impacto:** Cada nuevo agente para clientes — NeuroneSCF WA es el primero
**Esfuerzo:** 1 sesión

### Prioridad 4 — `copylab-reference`
**Qué documenta:** Templates en Supabase y su estructura, canal blocks, cómo escribir/modificar templates, diferencia AGGRO vs Humanize, campos BP_COPY_1.0, idiomas soportados
**Impacto:** Trabajo de contenido para todos los clientes
**Esfuerzo:** 1 sesión (después de completar BP_COPY_1.0)

### Prioridad 5 — `weblab-shopify-reference`
**Qué documenta:** Módulo Shopify de WebLab, estructura nc-* del tema Liquid, qué puede ThemeDeployModule y ShopifyPushModule, limitaciones actuales con Shopify API, vías abiertas vs bloqueadas
**Impacto:** Deployments e-commerce para UnrealvilleStores y NeuroneSCF
**Esfuerzo:** 1 sesión

### Prioridad 6 — `security`
**Qué documenta:** RLS policies estándar Supabase, patterns de autenticación Edge Functions, WAF Cloudflare, qué nunca hardcodear, secrets management, checklist seguridad por tipo de deployment
**Impacto:** Cada nuevo deployment productivo
**Esfuerzo:** 1 sesión

---

## ROADMAP PRIORIZADO — Próximas sesiones

### INMEDIATO (esta semana)
1. ✅ Push index.html a CoreProject (PAT)
2. ✅ UNRLVL CRM dashboard
3. NeuroneSCF: Meta BM info empresa (Laura/PO Miami sin VPN)
4. NeuroneSCF: 87 SKUs + precios en Shopify
5. SMA: inyectar URL session_log en system prompt
6. ForumPHs: foto Ivette para Speaks

### CORTO PLAZO (próximas 2 semanas)
7. BP_COPY_1.0 para NeuroneSCF + ForumPHs + UnrealvilleStudio
8. Skill `ui-ux-layer` (primera sesión dedicada)
9. Fal.ai birefnet → ImageLab LoRA Prep módulo básico
10. Skill `image-processing`
11. WebLab sprint: Objectives Window + plantillas institucionales
12. Flujo email prospecto calificado (CRM)

### MEDIANO PLAZO (próximo mes)
13. Skill `agent-builder`
14. NeuroneSCF WhatsApp agent (Twilio conectado)
15. Meta/TikTok OAuth → SocialLab publicación real
16. VideoLab: keys + testing
17. VoiceLab: voice IDs + testing
18. Skill `copylab-reference`
19. Testing Orchestrator end-to-end NeuroneSCF
20. LoRA Prep completo + training primer avatar PO

### LARGO PLAZO (trimestre)
21. Psycho Layer extensión CopyLab + SocialLab + VideoLab + VoiceLab
22. WebLab Shopify: deploy temático NeuroneSCF desde WebLab
23. Skill `weblab-shopify-reference`
24. Skill `security`
25. Blueprint BP_PERSON completo con LoRA training workflow
26. Orchestrator: actualizar interpret-intent con LoRA Prep

---

## NOTAS TÉCNICAS CLAVE

### Shopify — Historial de fricción
WebLab tiene OAuth (`api/shopify-auth.ts`, `api/shopify-callback.ts`) + ThemeDeployModule + ShopifyPushModule. El bloqueo histórico era con la Shopify API directa desde Claude — WebLab resuelve esto con el flow OAuth propio. NeuroneSCF tiene tema deployado manualmente (correcto para ahora). Cuando se pruebe WebLab con Neurone, usar primero ShopifyPushModule para product updates, luego ThemeDeployModule para el tema completo.

### LoRA training — Requisitos mínimos
- 10-30 imágenes por persona
- Variedad de ángulos (frontal, 3/4, perfil)
- 1024×1024 pixels mínimo
- Sin obstrucciones en la cara
- Iluminación consistente preferible (pero no crítico)
- Trigger word único por persona (ej: "patriciaosorio_lora")
- Captions.txt con prompt por imagen
- Proveedor recomendado: Fal.ai FLUX Dreambooth

### Orchestrator — Sistema prompt actualización pendiente
Cuando ImageLab LoRA Prep esté listo, añadir a SYSTEM_PROMPT en api/interpret-intent.ts:
```
- imagelabloraprep: preparar fotos de personas reales para entrenamiento LoRA
```

### apps/assistant (AgentLab sub-app)
Es el patrón canónico de inline/embedded agent. Es el proyecto de la madre de Sam (proyecto personal). NO confundir con deployments de cliente. El patrón técnico SÍ es reutilizable para otros inline agents.
