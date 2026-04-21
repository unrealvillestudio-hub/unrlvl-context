# Estructura de Sociedad — Sam & Patricia Osorio
## Prestige BGD, INC · Unrealville Studio LLC
_Borrador de trabajo — Abril 2026_

---

> Este documento describe la arquitectura legal, operativa y financiera de la sociedad entre Sam y Patricia Osorio (PO). Fue elaborado para facilitar la conversación y la toma de decisiones conjunta. Los espacios marcados como `[ A DEFINIR ]` requieren acuerdo entre ambas partes antes de ejecutar.

---

## 1. CONTEXTO Y LÓGICA DEL ACUERDO

Esta estructura nace de una convergencia natural de intereses:

- **PO** opera desde Miami a través de **Prestige BGD, INC**, tiene presencia local, red de relaciones y una entidad legal USA activa. Necesita infraestructura de marca, tecnología y estrategia para escalar.
- **Sam** dirige Unrealville Studio — firma de Brand Intelligence Infrastructure con sistemas, labs y capacidad de ejecución probados. Necesita estructura legal USA, presencia local en Miami y un socio operativo de confianza.

La sociedad no es un arreglo de conveniencia — es una alianza donde cada parte aporta lo que a la otra le falta. La sincronía es estructural, no circunstancial.

---

## 2. ARQUITECTURA DE ENTIDADES

```
┌─────────────────────────────────────────────────────┐
│         PATRICIA OSORIO                             │
│         Prestige BGD, INC — Miami, FL               │
│         Entidad operativa existente USA             │
│                                                     │
│  Marcas operadas:                                   │
│  · Neurone South & Central Florida                  │
│  · [ otras marcas bajo Prestige BGD, INC ]          │
└──────────────────────┬──────────────────────────────┘
                       │ cliente de / socia en
                       ▼
┌─────────────────────────────────────────────────────┐
│         UNREALVILLE STUDIO LLC                      │
│         [ A CONSTITUIR — Delaware vía Stripe Atlas ]│
│         Sam + PO — co-members                       │
│                                                     │
│  Servicios para TODAS las marcas de Prestige:       │
│  branding · tecnología · estrategia · sistemas      │
└──────────────────────┬──────────────────────────────┘
                       │ licencia de IP
                       ▼
┌─────────────────────────────────────────────────────┐
│         SAM — PROPIETARIO DE LA IP                  │
│         Marca UNRLVL · Labs · Sistemas · Metodología│
│         IP License Agreement → Studio LLC           │
│         Fee anual / royalty sobre ingresos          │
└─────────────────────────────────────────────────────┘
```

---

## 3. UNREALVILLE STUDIO LLC — ESTRUCTURA LEGAL

### 3.1 Constitución
- **Tipo de entidad:** LLC — Delaware
- **Vía de constitución recomendada:** Stripe Atlas (~$500 USD)
- **¿Por qué Delaware y no Florida?** Delaware es el estándar para empresas que operan en USA — mejor protección legal, más familiar para bancos y socios. Para operar físicamente en Florida a largo plazo solo se requiere un registro como "foreign LLC" (~$125/año), que no es urgente para un studio de servicios operando inicialmente de forma remota.
- **¿Por qué Stripe Atlas y no una LLC por separado?** Atlas incluye en un solo proceso: LLC constituida + EIN gestionado + cuenta Mercury aprobada + Stripe USA activo + registered agent el primer año. Abrir una Florida LLC por separado implicaría 4–5 trámites independientes, mayor costo total y probabilidad de rechazo de Mercury significativamente más alta para non-residents fuera del proceso Atlas.
- **Registered agent:** incluido en Stripe Atlas (1 año)
- **EIN:** gestionado por Stripe Atlas
- **Cuenta bancaria:** Mercury (apertura integrada vía Atlas)
- **Stripe USA:** activo post-constitución

### 3.2 Members
| Member | Rol | Residencia | Aportación |
|---|---|---|---|
| Sam | Managing Member / Estrategia y sistemas | No residente USA | Servicios del studio (capital en especie) |
| Patricia Osorio | Co-Member / Operaciones Miami | Residente USA (Prestige BGD, INC) | `[ A DEFINIR ]` |

### 3.3 Ownership Split — 35/35

| Member | Equity en Studio LLC | Equity en Prestige BGD |
|---|---|---|
| Sam | 65% (mayoría) | 35% |
| PO | 35% | 65% (mayoría) |

**La lógica del 35/35 — por qué es justo para ambos:**

| | Sam | PO |
|---|---|---|
| Equity recibido | $70K (35% × $200K Prestige) | $210K (35% × $600K Studio) |
| Valor aportado en 24 meses | $192K en servicios | $600K en revenue (10 clientes) |
| **Ratio valor aportado / equity recibido** | **2.7×** | **2.9×** |

Los ratios son casi idénticos — cada uno aporta aproximadamente 3 veces el valor de lo que recibe. El deal no es simétrico en dólares absolutos pero sí en esfuerzo relativo. Eso es lo que lo hace estructuralmente justo.

**Mecanismo de protección — pro-rata sobre los 10 clientes:**
Si PO entrega menos de 10 clientes al final de los 24 meses, el equity se ajusta proporcionalmente:
- 10 clientes = 35% ✦
- 7 clientes = 24.5%
- 5 clientes = 17.5%
- Opción de extensión de 6 meses si llega a 8 clientes

### 3.4 Managing Member
`[ A DEFINIR — quién firma, quién toma decisiones operativas del día a día ]`

Recomendación: Sam como Managing Member para decisiones de studio; decisiones de inversión +$X requieren acuerdo de ambos.

---

## 4. PROTECCIÓN DE IP Y FLUJO DE INGRESOS DE SAM

La marca **Unrealville Studio**, sus sistemas, labs, metodologías y propiedad intelectual **son activos de Sam**, no de la LLC conjunta.

**Mecanismo de protección:**
- Sam licencia la IP a la LLC mediante un **IP License Agreement**
- La LLC tiene derecho de uso mientras la sociedad esté activa
- En caso de disolución, la IP revierte íntegramente a Sam
- Este acuerdo debe quedar explícito en el Operating Agreement

**Flujos de ingresos hacia Sam desde la LLC:**

| Flujo | Descripción | Frecuencia |
|---|---|---|
| IP License Fee | Sam cobra a la LLC por el uso de la marca, sistemas y metodología UNRLVL | Anual o mensual |
| Royalty % | Porcentaje sobre ingresos de la LLC como compensación por la IP | `[ A DEFINIR — % o fee fijo ]` |
| Distribución de utilidades | Reparto de beneficios según ownership split | Según Operating Agreement |

Estos tres flujos son independientes entre sí — Sam puede recibir el fee de licencia incluso en períodos donde la LLC no distribuye utilidades.

`[ A DEFINIR: estructura del fee — royalty % sobre ingresos brutos vs. fee fijo anual ]`

---

## 5. PRESTIGE BGD, INC — SOCIEDAD OPERATIVA

### 5.1 Alcance del aporte del Studio

El aporte de Unrealville Studio **aplica a todas las marcas operadas bajo Prestige BGD, INC** — no solo a Neurone. La infraestructura de marca, tecnología, sistemas y estrategia que el studio construye beneficia al portafolio completo de PO.

Esto es un elemento clave de la valorización: Sam no está aportando a una marca, está aportando a una plataforma de marcas.

### 5.2 Estructura propuesta
PO mantiene **Prestige BGD, INC** como vehículo operativo existente. Sam entra como socio a través de la aportación de servicios del studio sobre el portafolio completo de marcas.

`[ A DEFINIR: si la participación de Sam en Prestige BGD, INC se formaliza con equity directo en la INC o mediante un acuerdo de profit sharing sobre marcas específicas ]`

### 5.3 Aportación de Sam en Prestige BGD, INC
Los servicios de Unrealville Studio prestados a todas las marcas de Prestige se contabilizan como **capital contribution en especie** (contribution in kind), generando equity para Sam.

**Servicios que califican como aportación de capital:**
- Brand Intelligence Platform — todas las marcas del portafolio
- Infraestructura tecnológica (CRM, agentes, automatizaciones)
- Social Media Infrastructure (SocialLab)
- Estrategia y dirección de marca continuada
- Sistemas de onboarding y escalabilidad de marcas

**Valorización de servicios:**
`[ A DEFINIR en la sesión de valorización — ver Sección 10A ]`

**Equity resultante para Sam en Prestige BGD, INC:**
`[ A DEFINIR — porcentaje basado en valorización cruzada de ambas entidades ]`

### 5.4 Separación de flujos
| Flujo | Descripción | Instrumento |
|---|---|---|
| Equity contribution | Servicios del studio contabilizados como capital en Prestige | Contribution Agreement |
| Fee operativo | Servicios continuos del studio facturados mensualmente | Contrato de servicios / Invoice |
| IP License | Sam → Studio LLC por uso de la IP UNRLVL | IP License Agreement |

---

## 6. FLUJO DE COBROS — INFRAESTRUCTURA FINANCIERA

Con la LLC constituida y PO como co-member residente USA:

```
Clientes de Prestige BGD, INC (todas las marcas)
        ↓
Stripe Payment Link / Invoice del Studio
        ↓
Mercury — cuenta bancaria USA de Unrealville Studio LLC
        ↓
Distribución según Operating Agreement
   ├── Sam → IP License Fee + utilidades → Wise USD / cuenta Panamá
   └── PO → utilidades → cuenta bancaria USA personal
```

**Zelle Business:** disponible desde Mercury para pagos rápidos B2B dentro de USA.

**Ventaja fiscal de la estructura con PO como residente:**
- LLC tributa como partnership doméstico — Form 1065
- Sin withholding del 30% que aplica a non-residents en LLCs unipersonales
- CPA de PO probablemente ya maneja esta estructura de rutina
- Costo CPA estimado: `[ A CONFIRMAR con el CPA de PO ]`

---

## 7. OPERATING AGREEMENT — PUNTOS MÍNIMOS A CUBRIR

El Operating Agreement es el documento que protege a ambas partes. Debe incluir como mínimo:

- [ ] Ownership split y tabla de capitalización inicial
- [ ] Definición de roles — Managing Member y responsabilidades
- [ ] Proceso de toma de decisiones — ordinarias vs. extraordinarias
- [ ] Política de distribuciones — cuándo y cómo se reparten beneficios
- [ ] Valorización y registro de aportaciones en especie del studio
- [ ] IP License Agreement — términos, fee y royalty de Sam hacia la LLC
- [ ] Cláusula de salida — qué pasa si uno de los socios quiere salir
- [ ] Cláusula de no competencia `[ A DEFINIR si aplica y en qué términos ]`
- [ ] Resolución de disputas
- [ ] Qué pasa con la participación de cada parte si la sociedad se disuelve

`[ RECOMENDACIÓN: contratar un attorney en Florida especializado en business law para redactar el Operating Agreement. Costo estimado: $800–1,500 ]`

---

## 8. PASOS DE EJECUCIÓN — SECUENCIA RECOMENDADA

### Fase 1 — Acuerdo y preparación
- [ ] Sam y PO revisan este documento y acuerdan los puntos `[ A DEFINIR ]`
- [ ] Sesión de valorización: Prestige BGD, INC + Unrealville Studio (ver Sección 10A)
- [ ] Definir ownership splits — Studio LLC y Prestige BGD, INC
- [ ] Definir valorización de servicios del studio como capital contribution en Prestige

### Fase 2 — Constitución de la LLC
- [ ] Ejecutar Stripe Atlas — $500 USD
- [ ] Constituir Unrealville Studio LLC en Delaware
- [ ] Apertura de cuenta Mercury
- [ ] Activación de Stripe USA
- [ ] Contratar attorney para redactar Operating Agreement

### Fase 3 — Formalización de la sociedad en Prestige BGD, INC
- [ ] Firmar Operating Agreement de la LLC
- [ ] Firmar IP License Agreement (Sam → Studio LLC)
- [ ] Firmar Contribution Agreement (servicios del studio = capital en Prestige)
- [ ] Firmar contrato de servicios recurrentes (studio → todas las marcas Prestige, fees mensuales)
- [ ] Informar al CPA de PO para alineación fiscal

### Fase 4 — Operación
- [ ] Onboarding de marcas Prestige BGD, INC en el studio
- [ ] Primer invoice del studio a Prestige
- [ ] Registro de aportaciones de capital en los libros de ambas entidades

---

## 9. POR QUÉ ESTA ESTRUCTURA TIENE SENTIDO

### Para Patricia Osorio

> - Accede a la infraestructura completa de Unrealville Studio — branding, tecnología, estrategia, agentes — para **todo el portafolio de marcas de Prestige BGD, INC**, sin pagar el fee de mercado en cash, sino como inversión en capital que se valoriza con el crecimiento de cada marca.
> - Tiene un socio que construye los sistemas y la visión estratégica mientras ella lidera las operaciones, las relaciones y el mercado local. División de roles clara, sin solapamiento.
> - La LLC conjunta le da estructura profesional y seria al studio, reforzando su posición frente a clientes y socios en Miami.
> - Los incentivos están perfectamente alineados: cuanto mejor trabaja el studio, más crece Prestige, y cuanto más crece Prestige, más vale la participación de ambos.
> - No asume el riesgo de construir infraestructura tecnológica sola — ese conocimiento ya existe, está probado y es aplicable a todas sus marcas desde el primer día.

### Para Sam

> - Obtiene estructura legal USA (LLC Delaware) con una residente americana como co-member — eliminando la penalización fiscal del 30% de withholding que aplica a LLCs unipersonales de non-residents.
> - Tiene presencia operativa real en Miami desde el primer día, a través de PO y su red — sin necesidad de estar físicamente allí durante la transición España → Panamá → Miami.
> - Prestige BGD, INC se convierte en el primer cliente ancla del studio — con múltiples marcas activas — generando equity y fees recurrentes sin necesidad de capital cash inicial.
> - La relación con Prestige BGD, INC abre puertas en el mercado de Florida que serían imposibles o muy lentas de abrir de forma independiente.
> - El studio construye su track record real con marcas operativas antes de tener una cartera de clientes externos — lo que fortalece el pitch del Profiler y la credibilidad de los tiers.
> - Tres flujos de ingresos simultáneos: **IP License Fee** (por la marca y sistemas UNRLVL) + **fees operativos** (servicios mensuales a Prestige) + **distribución de utilidades** (como co-member de la LLC). Una estructura de ingresos diseñada para escalar.

---

## 10. DECISIONES PENDIENTES — RESUMEN

| # | Decisión | Responsable |
|---|---|---|
| 1 | Ownership split Unrealville Studio LLC | Sam + PO |
| 2 | Aportación de PO a la LLC (cash / activos / red) | PO define |
| 3 | Managing Member de la LLC | Sam + PO |
| 4 | Estructura participación Sam en Prestige BGD, INC (equity directo o profit sharing) | Sam + PO |
| 5 | Ownership split de Sam en Prestige BGD, INC | Sam + PO |
| 6 | Valorización mensual servicios studio → marcas Prestige | Sam propone |
| 7 | Fee operativo mensual studio → Prestige (sobre el equity) | Sam propone |
| 8 | Estructura IP License: fee fijo anual vs. royalty % sobre ingresos | Sam define |
| 9 | Cláusula de no competencia | Sam + PO + attorney |
| 10 | Attorney para Operating Agreement | PO recomienda o buscan juntos |
| 11 | Alineación fiscal con CPA de PO | PO coordina |

---

## 10A. PRÓXIMA SESIÓN — VALORIZACIÓN CRUZADA

Esta sesión tiene un objetivo único: **poner número a lo que cada uno ya construyó** para poder calcular los aportes cruzados con precisión.

### Lo que se valoriza

**Prestige BGD, INC — aportación de PO:**
- Entidad legal USA existente (valor de constitución + historial)
- Marcas operativas bajo Prestige (Neurone + otras)
- Red de relaciones en Miami y Florida
- Presencia operativa local
- `[ PO prepara: lista de marcas activas, ingresos actuales o proyectados, activos ]`

**Unrealville Studio — aportación de Sam:**
- Marca UNRLVL + identidad de Lucien Sael
- Labs operativos (CopyLab, WebLab, ImageLab, AgentLab, BlueprintLab, SocialLab, OPS)
- Infraestructura tecnológica (Supabase, CRM, Profiler Agent v7.4, Context System)
- Agentes desplegados (Profiler, Social Media Agent, Document Factory, Speaks)
- Metodología BP Brand Context + tiers de servicio
- `[ Sam prepara: valorización de horas invertidas + costo de infraestructura + valor de mercado de los servicios ]`

### Método de valorización sugerido
1. **Costo de reposición** — ¿cuánto costaría construir esto desde cero?
2. **Valor de mercado** — ¿cuánto pagaría un tercero por acceder a esto?
3. **Múltiplo de ingresos** — si hay revenue, aplicar múltiplo conservador (1–3×)

De esa ecuación sale el cap table inicial de ambas entidades y los porcentajes de participación cruzada.

`[ FECHA DE SESIÓN: A DEFINIR — Sam + PO ]`

---

_Documento preparado por Unrealville Studio · Versión borrador para revisión interna_
_Próxima revisión: [ FECHA A DEFINIR ] — Sam + PO_
