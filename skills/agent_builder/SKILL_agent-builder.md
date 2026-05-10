# SKILL — agent-builder v1.0
_UNRLVL AgentLab · Patrones de Deployment · Multimarca_
_Versión: 1.0 · 2026-04-24_

---

## INSTRUCCIÓN DE CARGA

Este skill se activa cuando Sam indica:
- "crear un agente para [marca]"
- "deployar el agente de [canal]"
- "configurar el WhatsApp agent de [marca]"
- "inline agent para [cliente]"
- cualquier sesión de AgentLab

---

## SECCIÓN 1 — ARQUITECTURA DE AGENTES UNRLVL

### Stack base

```
Claude API (motor de razonamiento)
    ↓
Supabase Edge Function (orquestación + persistencia)
    ↓
Canal de delivery (WhatsApp / Web / Voice)
```

### Principio fundamental

Los agentes de UNRLVL son **Supabase-first**: toda la configuración, contexto, historial y estado del agente vive en Supabase. El canal (WhatsApp, web, voz) es solo el transporte.

---

## SECCIÓN 2 — LOS 5 TIPOS DE DEPLOYMENT

### Tipo 1 — WhatsApp

```
Usuario → WhatsApp → Meta API webhook
    ↓
Vercel Edge Function (webhook handler)
    ↓
Supabase Edge Function (agent logic + Claude)
    ↓
Respuesta → Meta API → WhatsApp
```

**Requisitos:**
- Número de teléfono verificado en Meta Business Manager
- WhatsApp Business API configurada (Cloud API o BSP)
- Webhook URL pública (Vercel Edge Function)
- Verify token para validación de webhook
- `wa_phone_number_id` y `wa_business_account_id` en `agents` table

**Template de webhook handler (Vercel):**
```javascript
// api/webhook-wa.js
export default async function handler(req, res) {
  // Verificación del webhook (GET)
  if (req.method === 'GET') {
    const { 'hub.verify_token': token, 'hub.challenge': challenge } = req.query;
    if (token === process.env.WA_VERIFY_TOKEN) return res.send(challenge);
    return res.status(403).send('Forbidden');
  }

  // Mensaje entrante (POST)
  if (req.method === 'POST') {
    const body = req.body;
    const message = body.entry?.[0]?.changes?.[0]?.value?.messages?.[0];
    if (!message) return res.sendStatus(200);

    // Llamar a Supabase Edge Function
    await fetch(`${process.env.SUPABASE_URL}/functions/v1/[agent-name]`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message_id: message.id,
        from: message.from,
        text: message.text?.body,
        timestamp: message.timestamp
      })
    });

    return res.sendStatus(200);
  }
}
```

**Estado actual:** Twilio pendiente para Sam. NeuroneSCF WA agent será el primero de cliente.

---

### Tipo 2 — Inline / Embedded (widget en web del cliente)

```
Web del cliente (cualquier stack)
    ↓ <script> tag
Widget chat flotante
    ↓ fetch
Supabase Edge Function (agent logic + Claude)
```

**Patrón canónico:** `apps/assistant` en AgentLab es la referencia. ForumPHs Speaks y el Profiler Agent son instancias productivas.

**Template de embed script:**
```html
<!-- En la web del cliente — un solo script tag -->
<script>
  window.UnrlvlAgentConfig = {
    agentId: '[agent-id-from-supabase]',
    brandId: '[brand-id]',
    position: 'bottom-right',  // bottom-right | bottom-left
    primaryColor: '#[accent-hex]',
    welcomeMessage: '[mensaje de bienvenida]',
    placeholder: '[texto del input]'
  };
</script>
<script src="https://[agent-url].vercel.app/widget.js" async></script>
```

**El widget genera:**
- Botón flotante con el color `primaryColor`
- Panel de chat (380px wide, altura automática)
- Historial de sesión en localStorage
- Mobile responsive

---

### Tipo 3 — Standalone (URL propia)

```
agent.clientbrand.com (custom domain)
    ↓
Vercel deployment con frontend propio
    ↓
Supabase Edge Function (agent logic + Claude)
```

Usado para: agentes que son el producto principal (no widget secundario). Ejemplo: ForumPHs Speaks en `speaks.forumphs.com`.

**Configuración de custom domain:**
- Deploy en Vercel
- Agregar custom domain en Vercel dashboard
- Configurar DNS en el registrar del cliente (CNAME a `cname.vercel-dns.com`)

---

### Tipo 4 — Con cuenta del cliente (costos en su cuenta)

El agente corre en la infraestructura del cliente — sus API keys, su Supabase, su Vercel.

**Cuándo usar:** clientes grandes que quieren ownership total + no quieren que sus datos pasen por la infra de UNRLVL.

**Estructura:**
- Claude API key del cliente (Anthropic account del cliente)
- Supabase project del cliente
- Vercel team del cliente
- UNRLVL provee solo el código + configuración

---

### Tipo 5 — Interno UNRLVL

Agentes que corren dentro del stack de UNRLVL para uso interno. Ejemplo: Profiler Agent, Social Media Agent, IID Agents (cuando se construyan).

---

## SECCIÓN 3 — SUPABASE EDGE FUNCTION PATTERN

Patrón canónico para todas las Edge Functions de agentes:

```typescript
// supabase/functions/[agent-name]/index.ts
import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import Anthropic from 'npm:@anthropic-ai/sdk';

const anthropic = new Anthropic({ apiKey: Deno.env.get('ANTHROPIC_API_KEY') });
const supabaseUrl   = Deno.env.get('SUPABASE_URL')!;
const supabaseKey   = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

serve(async (req) => {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  };

  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    const { message, session_id, brand_id } = await req.json();

    // 1. Cargar contexto del agente desde Supabase
    const agentRes = await fetch(
      `${supabaseUrl}/rest/v1/agents?brand_id=eq.${brand_id}&active=eq.true`,
      { headers: { 'apikey': supabaseKey, 'Authorization': `Bearer ${supabaseKey}` } }
    );
    const [agent] = await agentRes.json();

    // 2. Cargar o crear sesión de conversación
    // [historial desde Supabase si aplica]

    // 3. Llamar a Claude
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1024,
      system: agent.system_prompt,
      messages: [{ role: 'user', content: message }]
    });

    const reply = response.content[0].type === 'text'
      ? response.content[0].text : '';

    // 4. Persistir en Supabase (historial, metrics)
    // [guardar conversación si aplica]

    return new Response(
      JSON.stringify({ reply, session_id }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
```

---

## SECCIÓN 4 — SYSTEM PROMPT TEMPLATES

### Template base (todos los agentes)

```
Eres [NOMBRE_AGENTE], asistente de [MARCA].

[DESCRIPCIÓN DE LA MARCA Y CONTEXTO]

## Tu misión
[QUÉ HACE ESTE AGENTE]

## Tu personalidad
[TONO Y ESTILO BASADO EN humanize_profiles de Supabase]

## Lo que puedes hacer
[CAPACIDADES ESPECÍFICAS]

## Lo que NO haces
- No improvises información que no tengas confirmada
- No hagas promesas que la marca no haya autorizado
- Si no sabes algo, dilo claramente y ofrece alternativas

## Idioma
[IDIOMA PRIMARIO + comportamiento si el usuario escribe en otro idioma]

## Datos disponibles
[QUÉ CONSULTAS PUEDES HACER A SUPABASE]
```

### Template — Agente de ventas / producto

```
Eres [NOMBRE], asesor de [MARCA].

Tienes acceso al catálogo completo de productos. Cuando un cliente pregunta 
por un producto, consultas los datos reales antes de responder.

Ayudas a:
- Encontrar el producto correcto para el problema del cliente
- Explicar ingredientes, beneficios y modo de uso
- Resolver dudas sobre precios y disponibilidad
- Guiar hacia la compra sin ser agresivo

No inventas ingredientes ni claims que no estén en el catálogo.
Si un producto no está disponible, ofreces la alternativa más cercana.
```

### Template — Agente de soporte

```
Eres [NOMBRE], soporte de [MARCA].

Resuelves dudas post-compra: seguimiento de pedidos, uso de productos,
devoluciones, problemas técnicos.

Tienes acceso a:
- Estado de órdenes (si Shopify está conectado)
- FAQs de la marca
- Política de devoluciones

Cuando no puedes resolver algo, escala con: "Voy a conectarte con nuestro
equipo para que te ayuden mejor. ¿Cuál es tu email de contacto?"
```

### Template — Agente de calificación (como Profiler)

```
Eres [NOMBRE], consultor estratégico de [MARCA].

Tu objetivo es entender el negocio del prospecto en una conversación natural 
de 5-7 intercambios para determinar si hay un fit real.

No hagas todas las preguntas de una vez. Conversa naturalmente.
Escucha activamente y haz seguimiento a lo que el prospecto dice.

Al finalizar, si hay fit: presenta la propuesta de valor relevante.
Si no hay fit: sé honesto y agradece el tiempo.
```

---

## SECCIÓN 5 — CONFIGURACIÓN EN SUPABASE

### Tabla `agents` — campos clave

```sql
-- Los campos más importantes al crear un agente:
INSERT INTO public.agents (
  id,              -- texto único: 'neuronescf-wa-agent'
  brand_id,        -- FK a brands
  name,            -- 'NeuroneSCF WhatsApp Agent'
  description,     -- qué hace
  channel,         -- 'whatsapp' | 'webchat' | 'voice'
  status,          -- 'draft' → 'active' cuando esté en producción
  system_prompt,   -- el prompt completo del agente
  language,        -- 'es' | 'en'
  -- WhatsApp específico:
  wa_phone_number_id,
  wa_business_account_id,
  wa_webhook_verify_token,
  -- WebChat específico:
  wc_widget_title,
  wc_welcome_message,
  wc_primary_color,
  wc_position
) VALUES (...);
```

---

## SECCIÓN 6 — CHECKLIST DE DEPLOYMENT

### Pre-deployment (cualquier tipo)
- [ ] `agents` row creado en Supabase con `status = 'draft'`
- [ ] System prompt redactado y testeado en modo draft
- [ ] `brand_id` correcto y datos de marca disponibles
- [ ] Idioma y tono confirmados con Sam
- [ ] Edge Function deployada en Supabase

### WhatsApp específico
- [ ] Meta Business Manager con WhatsApp API configurada
- [ ] Webhook URL configurada en Meta Developer portal
- [ ] Verify token guardado en env variables (Vercel + Supabase)
- [ ] Número verificado y activo
- [ ] Test de conversación real antes de pasar a `status = 'active'`

### WebChat / Inline
- [ ] Widget deployado en Vercel
- [ ] Script tag probado en localhost del cliente
- [ ] Mobile responsive verificado
- [ ] `primaryColor` matches `--accent` de la marca (desde `brand_palette`)
- [ ] Welcome message aprobada por Sam

### Post-deployment
- [ ] `status = 'active'` en `agents` table
- [ ] `agent_deployments_config` actualizado con URL y embed code
- [ ] Test en producción con mensaje real
- [ ] Sam notificado con URL o instrucciones de integración

---

## SECCIÓN 7 — AGENTES ACTIVOS (referencia)

| ID | Marca | Canal | Status | URL |
|---|---|---|---|---|
| `profiler-v7` | UnrealvilleStudio | WebChat | ✅ LIVE | `unrlvl-profiler` edge function |
| `forumphs-speaks` | ForumPHs | Standalone | ✅ LIVE | speaks.forumphs.com |
| `neuronescf-sma` | NeuroneSCF | Internal | ✅ LIVE | unrlvl-social-media-agent.vercel.app |
| `neuronescf-wa` | NeuroneSCF | WhatsApp | 🔵 DISEÑADO | Pendiente número Twilio |
| `forumphs-ops-wa` | ForumPHs | WhatsApp | 🔵 DISEÑADO | Pendiente |

---

_SKILL agent-builder v1.0 · Unreal>ille Studio · AgentLab · Supabase-first_
