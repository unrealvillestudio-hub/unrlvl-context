# RETOMA — AIID + Artículos · Publicación post-genoma Lucien

**Creado:** 2026-06-01 · **Estado de datos:** verificado en vivo (Supabase intel.iid_content_queue)
**Disparador de retoma:** cuando `lucien_editorial` v0.5 exista y esté validado en `brand_voice_genome`.
**Propósito:** retomar la producción/publicación de contenido AIID sin reconstruir contexto.

---

## REGLA DE ORO

NADA de contenido en voz Lucien se regenera ni publica hasta que `lucien_editorial`
exista y esté `active=true`. El contenido actual en voz lucien es del fallback
genérico (growth-marketer) — NO es la voz real. Publicarlo daña el posicionamiento.

---

## ESTADO REAL DEL QUEUE (intel.iid_content_queue · 2026-06-01)

Total ~204 piezas. **brand_id es NULL en casi todo** — solo 19 piezas tienen
brand_id seteado. Esto es deuda sistémica: el IID nunca seteó brand_id.

### Por voz / ángulo / estado

| voice | angle | approval_status | n | Acción al retomar |
|---|---|---|---|---|
| lucien | mathematical | rejected | 37 | DEJAR rejected. Dataset diagnóstico off-brand. No purgar. |
| lucien | mathematical | autopublished | 8 | Revisar: ¿se publicó? (casi todas pending en orchestrator). Regenerar en voz real o rechazar. |
| lucien | mathematical | pending | 4 | Regenerar en lucien_editorial o descartar (mathematical no es ángulo core de Lucien). |
| lucien | psychological | autopublished | 16 | Revisar publicación. Regenerar en voz real. Aquí viven semillas rescatables. |
| lucien | psychological | pending | 17 | Regenerar en lucien_editorial. **Semillas #7, #8, #14 priorizar** (ver abajo). |
| unrlvl | trend_signal | autopublished | 43 | unrlvl tiene genoma OK. Revisar publicación + setear brand_id. |
| unrlvl | trend_signal | pending | 51 | Triar: setear brand_id=UnrealvilleStudio, evaluar publicar (goteo bajo). |
| unrlvl | expertise | pending (brand_id=UnrealvilleStudio) | 19 | YA tienen brand_id (arregladas 31-may). On-brand. Evaluar publicar. |
| unrlvl | expertise | pending (brand_id NULL) | 4 | Setear brand_id + evaluar. |
| unrlvl | expertise | autopublished | 8 | Revisar publicación + brand_id. |
| unrlvl | tool_review | pending | 6 | Triar. brand_id NULL. |
| unrlvl | tool_review | autopublished | 1 | Revisar. |
| unrlvl | contrarian | autopublished | 1 | Revisar. |

### Aclaración crítica sobre "autopublished"
`autopublished` = flag de INTENCIÓN, no de hecho. De las 77 autopublished:
- **72 tienen orchestrator_status=pending** → marcadas pero NUNCA despachadas (congeladas 26-abr).
- **Solo ~5 salieron** (3 dispatched + 2 complete), todas de abril 24-26 (arquitectura vieja).

**ACCIÓN URGENTE menor:** verificar esas ~5 piezas de fin de abril (orchestrator_status
dispatched/complete) — pueden haberse publicado de verdad en FB/IG en voz vieja.
Si tocaron las redes, evaluar despublicar. Daño marginal (solo FB+IG, bajo seguimiento
entonces) pero conviene limpiar.

---

## SEMILLAS RESCATABLES (lucien/psychological)

NO publicables tal cual (voz domesticada). Son semillas de IDEA para regenerar
en lucien_editorial:
- **#7** — "las máquinas hablan humano"
- **#8** — "muerte del creative middleman" (la más Lucien — priorizar)
- **#14** — "ownership illusion / pseudo-possession"
El resto del bloque psychological es marketing de plataforma off-brand.

---

## SECUENCIA DE RETOMA (cuando exista lucien_editorial)

### Fase 1 — Higiene de datos (rápido, SQL)
1. Verificar las ~5 piezas autopublished+dispatched/complete de abril → despublicar si aplica.
2. Setear brand_id en el queue: lucien→LucienSael, unrlvl→UnrealvilleStudio.
   (Resuelve la deuda de brand_id NULL que rompe el dispatch por marca.)
3. Confirmar que el resto de lucien/* sigue sin publicar (orchestrator pending).

### Fase 2 — Regeneración en voz real
4. Regenerar semillas #7/#8/#14 con lucien_editorial (vía content-pipeline L1.5).
5. Validar 2-3 outputs contra el genoma antes de producir en volumen (¿muerde como Lucien?).
6. Descartar definitivamente el contenido lucien off-brand que no valga regenerar.

### Fase 3 — Re-test del pipeline de publicación
7. Confirmar fix del brand_id mismatch v22 (ya aplicado: meta_accounts UnrealvilleStudio).
8. Re-correr UN job limpio end-to-end: genera→aprueba→publica en FB+IG.
   - Quitar el `.limit(1)` de debugging de content-dispatcher.
   - Confirmar content-run-stage v22 (timeout 65s) corre sin morir.
9. Verificar que SocialLab publica dual-mode (sync UI + async Orchestrator).

### Fase 4 — Producción gobernada
10. UNRLVL: goteo bajo de autoridad (no motor SEO). expertise/contrarian on-brand.
11. Lucien: contenido editorial en su voz. Blog primero; social cuando exista lucien_social + cuentas.
12. Plataformas: solo FB+IG hoy. LinkedIn+X cuando se creen (ver abajo).

---

## ARTÍCULOS / BLOGS — PENDIENTE

### luciensael.com
- Blog EN: home + índice + artículo molde "the-intelligence-was-never-artificial" → repo creado, DNS en proceso.
- **OJO:** el artículo molde es Lucien DOMESTICADO (voz de Sam sin filo). Cuando exista
  lucien_editorial, REVISAR/REESCRIBIR el artículo molde contra la voz real.
- **Blog ES:** pendiente completo. NO traducir — reescribir desde origen en voz Lucien
  (regla content-pipeline). Hacer cuando exista lucien_editorial.
- Nav: falta botón "Home" en el blog (corrección menor pendiente).

### UNRLVL Field Notes (CoreProject)
- Blog EN: índice + artículo molde → en PR (verificar Preview, mergear).
- Correcciones en el PR: añadir "Home" al nav del blog; quitar link "Field Notes"
  del nav /es/ hasta tener blog ES.
- Blog ES UNRLVL: pendiente, misma regla (reescribir, no traducir).

---

## IID — ESTADO TÉCNICO DEL SUBSISTEMA (recordatorio)

- Vive en schema `intel`. Research VIVO (corre diario).
- **ESTADO DE PUBLICACIÓN CORREGIDO (dato de Sam, 2026-06-01):** Meta y TikTok
  YA publican vía orchestrator PARA UNREALVILLE. El canal de publicación funciona
  para UNRLVL. Lo que NO se ha probado es LucienSael end-to-end. O sea: el
  diagnóstico previo de "ejecución totalmente congelada desde 26-abr" era
  impreciso — UNRLVL sí sale; Lucien es lo no probado. Esto cambia el testing:
  no es "arrancar el pipeline de cero", es "validar Lucien en un pipeline que ya
  corre para UNRLVL".
- content-dispatcher tenía `.limit(1)` de debugging → verificar si sigue puesto al retomar.
- content-run-stage v22 (timeout 65s, pipeline in-EF) — confirmar que es la versión activa.
- 14 agentes por dominio, dual voice. brand_id model: research compartido + intérprete por marca.
- **SocialLab: estado INCIERTO.** Sam no tiene claro si funciona ni qué hace
  exactamente. Es el cabo suelto más grande. Diagnosticarlo ANTES de actualizar
  los flujos IID (no se puede actualizar un flujo alrededor de una pieza cuyo
  estado se desconoce). Ver sección "SECUENCIA HASTA CLIENTES".

---

## MATRIZ DE CANALES POR GENOMA (definida por Sam · 2026-06-01)

Cada voz del ecosistema propio tiene canales y rol definidos. Esto gobierna qué
genoma publica dónde y debe reflejarse en `application_constraints` de cada uno.

| Genoma | Canales | Rol / naturaleza |
|---|---|---|
| **Sam** (sam_personal) | Meta (FB) + LinkedIn | Voz personal + VOCERO que presenta a Lucien y UNRLVL |
| **UNRLVL** (unrlvl_default v1.0, existe) | Meta (FB/IG) + TikTok + LinkedIn + .com | Marca B2B + VOCERO de Lucien |
| **lucien_editorial** | luciensael.com + base de la voz larga | Ensayo, contenido largo, voz que respira |
| **lucien_social** | Meta (FB/IG) + TikTok + X | Voz punzante, estocada corta, conversacional |

Notas de la matriz:
- TikTok añade dimensión de VIDEO/GUIÓN corto que ningún genoma cubre aún.
  Al construir lucien_social y revisar unrlvl, evaluar si el guión de TikTok es
  un registro aparte o cae dentro del social. PENDIENTE de resolver.
- Lucien NO tiene cuenta en LinkedIn (riesgo de suspensión de personaje sintético
  + por diseño). Llega a LinkedIn solo CITADO por voceros (Sam, UNRLVL).

---

## REGLA DE COHERENCIA DE ATERRIZAJE (CRÍTICA — escribir en piedra)

**Esta regla fue simplificada incorrectamente DOS veces por Claude (el chat del
genoma y el chat de planificación). Las dos veces Sam la corrigió. Es
contraintuitiva y el sistema "quiere" colapsarla a algo más simple. NO permitir
que se vuelva a abreviar.**

Cuando un vocero (Sam o UNRLVL) cita a Lucien en un post, QUÉ genoma de Lucien se
cita NO es fijo — lo determina el DESTINO del enlace. La cita es una promesa de
voz que el destino debe cumplir: el fragmento citado debe sonar como el lugar
adonde aterriza el lector.

| Destino del enlace | Genoma citado | Por qué |
|---|---|---|
| X / Meta / TikTok | **lucien_social** | El golpe corto promete más golpes; ese terreno los entrega. |
| luciensael.com | **lucien_editorial** | La idea que respira promete el ensayo; el sitio lo entrega. |
| Sin redirección (post nativo largo en LinkedIn) | **lucien_editorial** | LinkedIn da espacio y premia que el lector se quede; el formato pide aire. Una estocada de 280 como post largo se ve pobre. |

Violar esto = el lector siente un cambio de voz al hacer clic y desconfía. Si cito
estocada y el clic lleva a ensayo, o cito ensayo y el clic lleva a golpes secos,
la promesa se rompe.

Implicación para el flujo IID: la composición de un post de vocería usa DOS
genomas (el del vocero que presenta + el fragmento de Lucien elegido por destino).
El flujo actual NO contempla esta composición. Debe añadirse al actualizar IID.

---

## REGLA DE VARIABILIDAD DE PUBLICACIÓN (no siempre enlazar afuera)

Definida por Sam: no todos los posts de vocería deben sacar al lector de la
plataforma. Modular entre:
- A veces: traer a Lucien con device ("He recibido un mensaje de LucienSael...")
  + enlace a su terreno → redirección.
- A veces: dejar que el visitante EXPERIMENTE a Lucien ahí mismo (su voz en el
  post nativo, sin enlace) → retención. Si no le bastó, un post posterior lo
  "lleva de paseo" a su mundo.
- Dos voceros (Sam + UNRLVL) = múltiples fuentes de redirección hacia Lucien.

Razón técnica adicional: los posts con links externos tienen MENOS alcance
orgánico (LinkedIn/Meta penalizan sacar gente). Mezclar formatos protege el
alcance Y construye a Lucien. El flujo IID debe codificar esta variabilidad,
no enlazar afuera por defecto siempre.

---

## CUENTAS SOCIALES — ESTADO Y CREACIÓN

### Estado actual
- Meta (FB+IG): token OK. UNRLVL ya publica vía orchestrator. TikTok también (UNRLVL).
- X: Sam YA tiene cuenta personal (descubierto 2026-06-01).
- Faltan crear: @luciensael y @unrealville en X. LinkedIn Company Page de UNRLVL.

### Modelo de estructura (decidido)
- TODO bajo la cuenta/identidad real de Sam como admin. No se finge humano; se
  gestionan proyectos. Sam es el ancla real verificada.
- LinkedIn: UNRLVL = Company Page (crear). Lucien = SIN cuenta (solo citado).
- X: cuentas independientes vinculadas al login de Sam, encuadre creador/proyecto.

### Pasos creación cuentas X (@luciensael, @unrealville)
1. Cada cuenta necesita su propio email. Ideal: lucien@luciensael.com +
   email de marca UNRLVL. Alternativa: truco Gmail +alias.
2. Crear cada cuenta deslogueado/incógnito en x.com → "Crear cuenta".
3. Asignar handle en Settings: @luciensael / @unrealville (o variantes si tomados).
4. Vincular al login de Sam: perfil → "Añadir cuenta existente" → credenciales.
   Hasta ~5 cuentas por login, cambio sin re-loguear.
5. NO crear las dos back-to-back (X lee creación múltiple rápida como spam →
   suspende). Una hoy, usarla un poco, la otra al día siguiente. Desde IP real
   (España), no VPN.
6. Bio de Lucien: encuadre creador/proyecto + link a luciensael.com. NUNCA
   afirmar humano con vida civil.
7. X Premium (check azul) importa para alcance, pero activar tras algo de
   actividad normal, no en cuenta de cero minutos.

### Prerrequisito de orden
- Terminar DNS luciensael.com ANTES de crear @luciensael (bio enlaza a sitio vivo
  = legitimidad). Si DNS no propagó, crear @unrealville primero (unrealvillestudio.com
  ya vive) y @luciensael después.

### LinkedIn — perfil de Sam (estado 2026-06-01)
- Location = Panama City (coincide con documento, resuelve verificación). ✓
- About con narrativa Panamá/España/Florida. ✓
- Limpiar: ELIMINAR UNRLVL de "Projects" (queda en Experience + Organizations +
  futura Company Page). DEJAR "Lucien Sael" en Projects (mención del personaje).
- Verificar ortografía "Lucien Sael" consistente con luciensael.com.
- Crear Company Page de UNRLVL (botón "Create a Company Page" en panel For Business).
  No pide documentos de empresa, solo nombre/URL/industria/logo + checkbox de representación.

### API y publicación automática
- Crear cuenta ≠ publicación automática. APIs de X/LinkedIn = proyecto aparte
  (tiers de pago, aprobaciones). Parte del bloque "actualizar flujos IID".

---

## GENOME APPROACH — BLINDADO PARA EL UPDATE DEL ONBOARDING APP

**Propósito de esta sección:** cuando se actualice el OnboardingApp con la Fase
Voice Genome (pendiente con spec ya escrita en VOICE_GENOME_PHASE_SPEC.md), TODO
lo aprendido construyendo los genomas a mano debe quedar codificado en la
herramienta. Esto evita que el onboarding reproduzca los errores que cazamos a mano.
NO abreviar estos aprendizajes — son el método, no decoración.

### Los 4 genomas del ecosistema propio (estado y método)
- **unrlvl_default v1.0** — existe, completo, funciona. Es el EJEMPLO DE ORO de
  formato JSONB. Usar como few-shot, NUNCA como molde de contenido de otra voz.
- **lucien_editorial** — en construcción (sesión dedicada). Rama Voz Diseñada.
- **lucien_social** — pendiente (sesión dedicada, encadenada tras editorial).
- **sam_personal** — pendiente (sesión dedicada). Rama Voz Extraída (persona real).

### Aprendizaje 1 — Dos ramas de construcción según tipo de entidad
- **Voz Extraída** (persona real: Sam, futuras marcas con dueño real): se
  construye de MATERIAL FUENTE real (textos, About, registro conversacional).
  Puede aspirar a v1.0 si hay material suficiente.
- **Voz Diseñada** (personaje sintético: Lucien): NO hay persona real cuyo
  material extraer; la voz se define por DISEÑO editorial. Topa en v0.5 al crear;
  sube a v1.0 solo tras validar outputs reales.
- El onboarding DEBE preguntar al inicio qué rama es y ramificar el cuestionario.

### Aprendizaje 2 — Las fuentes aportan CAPAS distintas (no confundir)
Caso Lucien lo probó: un mismo artículo puede ser fuente válida para una capa e
inválida para otra.
- El artículo "the-intelligence-was-never-artificial" = universo TEMÁTICO de
  Lucien (válido) PERO voz de Sam-sin-filo (inválido como temperamento de Lucien).
- El BLUEPRINT (BP_Brand_Person_id.md) = TEMPERAMENTO (arrogancia, filo) pero
  mudo en lo editorial.
- Lección para el onboarding: NUNCA tratar una sola fuente como "la voz". Separar
  qué aporta cada fuente (tema / temperamento / registro / léxico) y triangular.
- Corolario brillante: lo que para una voz es contaminación, para otra es material
  legítimo. El artículo (basura para Lucien) ES muestra de voz de Sam.

### Aprendizaje 3 — El PASO DE TRIANGULACIÓN es obligatorio antes de construir
Antes de tocar las 9 dimensiones: leer todas las fuentes, mostrarle al humano
DÓNDE una fuente se aleja de la voz objetivo, y que el humano valide. Sin este
paso se captura voz domesticada/sesgada (el error original que dejó a Lucien sin
genoma real). El onboarding debe forzar este paso, no saltarlo.

### Aprendizaje 4 — Riesgo de "destilar de memoria"
Cuando Claude "conoce" al sujeto (caso Sam), la tentación es destilar el genoma de
memoria. ESO PRODUCE la-interpretación-de-Claude, no el sujeto. El onboarding debe
exigir material real aun cuando "parezca" conocer la voz. El conocimiento previo
sesga; el material ancla.

### Aprendizaje 5 — Una voz puede necesitar MÚLTIPLES voice_id
Lucien = editorial (largo, respira) + social (corto, muerde). NO es diferencia de
longitud sino de IDENTIDAD/respiración. El onboarding debe permitir varios voice_id
por marca y ayudar a decidir cuándo una diferencia justifica otro voice_id vs
modular con application_constraints. Criterio: ¿cambia el léxico/registro/relación,
o solo la longitud? Distinto registro = otro voice_id. Solo longitud = mismo
genoma, modular por canal.

### Aprendizaje 6 — Regla de coherencia de aterrizaje (ver sección arriba)
El onboarding/flujo debe codificar que en contenido de vocería, el genoma citado
lo elige el destino. Esta regla se simplifica mal sola — escribirla explícita.

### Aprendizaje 7 — Validación de plataforma vs cuentas reales
El genoma declara `application_constraints.platforms`; el onboarding DEBE cruzar
contra cuentas que existen de verdad y marcar warning si falta. Origen: el IID
generó 116 piezas para LinkedIn/X sin cuentas. No declarar plataforma sin capacidad.

### Aprendizaje 8 — Voz bilingüe = mismo genoma, reescritura no traducción
ES y EN aplican el MISMO genoma; la voz no se traduce, se reescribe desde origen
en cada idioma (regla content-pipeline). El onboarding debe capturar esto, no
asumir traducción.

---

## SECUENCIA HASTA CLIENTES (orden duro · decidido por Sam)

```
1. Genomas del ecosistema propio:
   lucien_editorial → lucien_social → sam_personal   (unrlvl_default ya existe)
        ↓
2. DIAGNOSTICAR SocialLab (estado incierto — qué hace, si publica, dual-mode)
        ↓
3. Actualizar flujos IID con:
   - matriz de canales por genoma
   - regla de coherencia de aterrizaje (2 genomas por post de vocería)
   - regla de variabilidad (no siempre enlazar afuera)
   - función de SocialLab ya clarificada
        ↓
4. TESTING end-to-end (validar Lucien en pipeline que ya corre para UNRLVL)
        ↓
5. Si R4B (ready for business / ICR) → calendario de publicaciones
        ↓
6. Producción propia up-and-running ICR
        ↓
7. RECIÉN ENTONCES integrar marcas de clientes (NSCF, FPHs)
```

Principio: las marcas de clientes NO son campo de pruebas. El motor propio se
prueba con UNRLVL/Lucien/Sam primero; los clientes entran cuando el flujo es ICR.

---

## DEPENDENCIAS (orden duro original — sigue vigente)

```
lucien_editorial v0.5 (sesión genoma)
        ↓
higiene datos + regenerar semillas + reescribir artículos EN/ES
        ↓
re-test pipeline publicación (verificar .limit(1), confirmar SocialLab)
        ↓
producción gobernada (UNRLVL ya publica; validar Lucien)
        ↓ (en paralelo: crear cuentas X/LinkedIn + lucien_social + sam_personal)
expansión multicanal completa según matriz
```

---
_Retoma AIID+artículos · datos verificados en vivo 2026-06-01 · ampliado con matriz de canales,
regla de aterrizaje, genome approach para onboarding y secuencia a clientes · retomar tras lucien_editorial_
