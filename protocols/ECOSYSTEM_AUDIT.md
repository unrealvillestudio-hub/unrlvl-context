# ECOSYSTEM AUDIT — Protocolo de Radiografía
**Propósito:** Documentar el ecosistema UNRLVL completo lab por lab para producir `ecosystem.md` y el filemap final.
**Estado:** EN CURSO
**Iniciado:** 2026-04-02

---

## OBJETIVO FINAL

Dos entregables:

**1. `ecosystem.md`** — Radiografía narrativa completa del ecosistema. Para cada lab: qué hace, cómo funciona, qué puede y qué no puede hoy, integraciones activas, deuda técnica, y cómo encaja en el sistema completo.

**2. `ecosystem_filemap.md`** — Mapa de dependencias entre componentes: qué lab alimenta a cuál, qué flujos existen hoy, qué está desconectado que debería estar conectado, y qué hay que construir para servir la propuesta de servicio de Neurone SCF.

---

## MÉTODO

1. Sam sube el filetree de cada lab
2. Claude identifica los 8-12 archivos clave y los pide
3. Sam los sube
4. Claude genera `ecosystem_radiografia_[Lab].md` como entregable descargable
5. Al final Claude consolida todo en `ecosystem.md` + `ecosystem_filemap.md`

**Regla crítica:** cada radiografía se genera como archivo descargable inmediatamente — no esperar al final. Si el chat se corta, los archivos individuales son la fuente de recuperación.

---

## ESTADO DE LABS

| Lab | ID | Status auditoría | Archivo |
|-----|-----|------|------|
| WebLab | LAB-WL | ✅ COMPLETA | `ecosystem_radiografia_WebLab.md` |
| CopyLab | LAB-CPL | ⏳ PENDIENTE | — |
| Onboarding App | LAB-OBD | ⏳ PENDIENTE | — |
| AgentLab | LAB-AL | ⏳ PENDIENTE | — |
| Social Media Agent | AGENT-SMA | ⏳ PENDIENTE | — |
| UNRLVL-OPS | LAB-OPS | ⏳ PENDIENTE | — |
| Orchestrator | LAB-ORCH | ⏳ PENDIENTE | — |
| SocialLab | LAB-SL | ⏳ PENDIENTE | — |
| VideoLab | LAB-VL | ⏳ PENDIENTE | — |
| ImageLab | LAB-IL | ⏳ PENDIENTE | — |
| BlueprintLab | LAB-BPL | ⏳ PENDIENTE | — |
| VoiceLab | LAB-VOL | ⏳ PENDIENTE | — |
| ForumPHs Speaks | AGENT-FPH | ⏳ PENDIENTE | — |

**Próximo lab:** CopyLab (LAB-CPL) — el más maduro, el más relevante para Neurone SCF

---

## CONTEXTO RELEVANTE

**Por qué hacemos esto:**
La propuesta de servicio UNRLVL × Neurone SCF compromete 319 outputs/mes en 6 meses con alta automatización. Para planificar el roadmap de desarrollo del ecosistema necesitamos saber exactamente qué puede hacer cada lab HOY vs. qué hay que construir.

**Output estratégico esperado del filemap:**
- Qué gaps hay entre el ecosistema actual y lo que exige la propuesta de Neurone
- Qué labs necesitan desarrollo prioritario (SocialLab, Orchestrator → Meta API)
- Qué flujos ya existen y solo necesitan conectarse
- Estimado de tiempo de desarrollo por gap

**Radiografía de WebLab — resumen ejecutivo:**
- Generador de copy web multi-marca (HTML/Liquid) para 10 marcas
- Push directo a Shopify activo
- Motor: Claude API via proxy serverless
- Supabase: solo `product_blueprints` conectado — brandContexts/humanize pendiente de migrar
- Deuda técnica principal: brandContexts hardcoded en config, no en Supabase

---

## INSTRUCCIONES PARA NUEVA SESIÓN

Al iniciar el nuevo chat:

1. Carga el contexto del ecosistema:
   - `https://unrlvl-context.vercel.app/ecosystem.json`

2. Carga este archivo (que estará en el repo):
   - `https://unrlvl-context.vercel.app/protocols/ECOSYSTEM_AUDIT.md`

3. Confirma estado: "WebLab ✅ — siguiente: CopyLab"

4. Pide a Sam el filetree de CopyLab

5. Al terminar cada lab, genera el archivo de radiografía como descargable ANTES de continuar

6. Al terminar todos los labs, genera `ecosystem.md` + `ecosystem_filemap.md` consolidados

**Sam: adjunta `ecosystem_radiografia_WebLab.md` al inicio del nuevo chat** para que Claude lo tenga como referencia al construir el consolidado final.
