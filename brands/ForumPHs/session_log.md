# ForumPHs Document Factory — Session Log
**Proyecto:** PHAS Document Factory  
**Fecha:** 2026-04-11  
**Sesión:** V1-V4 generation + QA calibration

---

## ESTADO ACTUAL

### Lo que funciona ✅
- **Pipeline completo Paso 0** — parsers Hypal (6 archivos) a JSON estructurado
- **Enrichment layer** — párrafos con spacing/indent por tipo de hablante, bold names, Presidente indentado
- **Docx builder** — gen_v4.js, 1,009 párrafos, validación 100%
- **QA scan automático** — 8 tipos de error, umbral 0-10 para entregar
- **Skill v1.4** — reglas completas: género fuzzy, densidad por sección, transformer limpio
- **Formato correcto** — B/., votos en dígitos, ✅ aprobaciones, coma Siendo, firmas side-by-side
- **Naming canónico** — `ACTA_N-AAAA_PH-SLUG_df.docx`
- **V4 Torres de Castilla** — 12,648 palabras, **0 errores reales**, ICR ready

### Lo que falta ❌
- **Paso 0.5** — proxy endpoint `/api/formalize` para formalización semántica via Claude API
  - Sin él: 70% word count (12K vs 18K de Ivette), transformer manual
  - Con él: 95%+ accuracy, ~$0.48 por acta
- **App completa** — UI de upload + pre-flight + generación + descarga

---

## MÉTRICAS DE REFERENCIA

| Versión | Palabras | Errores QA | Score vs Ivette |
|---|---|---|---|
| V2 (regex) | 31,714 | 244 | ~79% |
| V3 (filtered) | 17,485 | 244 | ~91% estructura, 50% contenido |
| V4 (narrativa manual) | **12,648** | **0** | **~85% calidad, 70% longitud** |
| Ivette (target) | 18,148 | — | 100% |

**Gap pendiente:** 5,500 palabras → resuelve con Paso 0.5 activo.

---

## ARCHIVOS EN REPO (paths exactos)

```
brands/ForumPHs/document_factory_skill.md    ← v1.4 (actualizado hoy)
brands/ForumPHs/acta_structure.md            ← v1.1 (actualizado hoy)
brands/ForumPHs/session_log.md               ← este archivo
```

---

## PRÓXIMA TAREA COORDINADA

### DECISIÓN PRINCIPAL: Endpoint vs App completa

**Opción A — Solo el endpoint (1-2 horas)**
Añadir `/api/formalize` al proyecto Vercel `forumphs-speaks`.
Sam hace push de 1 archivo → deploy automático → Paso 0.5 activo.
El docx se genera desde Claude.ai como artifact (como hoy, pero funcionando).

**Opción B — App completa (recomendada) (1-2 días)**
Construir el Document Factory como web app propia.
Stack: Next.js + Vercel + Supabase.
Justificación: el pipeline está 90% diseñado, el esfuerzo incremental es mínimo, el resultado es un producto real para ForumPHs.

### ¿Cómo crear el endpoint? (si Sam elige Opción A)

**Paso 1 — Crear el archivo en el repo `forumphs-speaks`:**
```
api/formalize.js
```

```javascript
import Anthropic from '@anthropic-ai/sdk';

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    return res.status(200).end();
  }
  if (req.method !== 'POST') return res.status(405).end();

  res.setHeader('Access-Control-Allow-Origin', '*');

  const { blocks, section } = req.body;

  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  const system = `Eres un secretario legal para Actas de Asamblea de Propiedad Horizontal en Panamá.
Convierte cada bloque de habla oral en un párrafo formal de 3ª persona.
Si el bloque no tiene contenido sustantivo, omítelo.
Devuelve SOLO un JSON array: [{"i": N, "p": "párrafo"}, ...]`;

  const userContent = blocks.map((b, i) => `[${i}] ${b.intro}: "${b.text}"`).join('\n\n');

  const msg = await client.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 3000,
    messages: [{ role: 'user', content: system + '\n\n' + userContent }]
  });

  const text = msg.content[0].text;
  const match = text.match(/\[[\s\S]*\]/);
  const paragraphs = match ? JSON.parse(match[0]) : [];

  return res.status(200).json({ paragraphs });
}
```

**Paso 2 — Verificar env var en Vercel:**
- Dashboard → `forumphs-speaks` → Settings → Environment Variables
- Confirmar que `ANTHROPIC_API_KEY` está configurado
- Si no: añadir la key del proyecto Anthropic

**Paso 3 — Push y deploy:**
```bash
git add api/formalize.js
git commit -m "feat(document-factory): add /api/formalize proxy endpoint"
git push
```
Vercel auto-deploya en ~30 segundos. URL: `https://forumphs-speaks.vercel.app/api/formalize`

**Paso 4 — En el siguiente chat:**
Dile a Claude: "El endpoint `/api/formalize` en forumphs-speaks está listo. Actualiza el artifact del Paso 0.5 para apuntar a esa URL en vez de api.anthropic.com directamente."

---

### ¿Qué incluye la App completa? (si Sam elige Opción B)

```
DOCUMENT FACTORY APP
├── Upload zona          — arrastra los 6 archivos de Hypal
├── Pre-flight form      — Finca + Código, convocatoria, informe JD
├── Generate button      — dispara Paso 0 + 0.5 + builder
├── Progress view        — barra por sección (Orden del Día 25%...)
├── Preview              — vista previa del acta en HTML
└── Download             — ACTA_N-AAAA_PH-SLUG_df.docx
```

**Stack recomendado:**
- **Next.js** (App Router) — SSR + API routes en un solo repo
- **Vercel** — deploy automático desde GitHub
- **Supabase** — storage para los docx generados + historial de actas
- **Anthropic SDK** — en las API routes (server-side, no CORS)

**Tiempo estimado:** 1 día para el MVP funcional con los archivos que ya tenemos (los parsers y el builder son copy-paste del pipeline actual).

---

## PARA EL PRÓXIMO CHAT

Carga el contexto con:
```
protocolo actualización
```

Y luego decide: ¿endpoint o app?

Si app: Claude puede generar el scaffolding completo en Next.js y desplegarlo en el proyecto `forumphs-speaks` o en uno nuevo `document-factory`.

