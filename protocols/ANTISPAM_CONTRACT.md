# ANTI-SPAM CONTRACT — Requisitos duros de publicación multimarca
### Contrato vinculante para Builder, Scheduler y Watcher · UNRLVL Ecosystem
_Versión 1.0 · 2026-06-15 · NINGÚN componente de publicación puede construirse sin cumplir esto_

---

## 0. Por qué existe este contrato

UNRLVL opera múltiples marcas (LucienSael, UnrealvilleStudio, NeuroneSCF…) que **publican desde el mismo Business Portfolio Meta y con el mismo System User token**. A ojos de Meta, una sola entidad opera todas las páginas. Esto crea un riesgo de **spam coordinado**: si dos marcas hermanas publican contenido percibido como duplicado en ventana temporal cercana, el patrón "operador único posteando lo mismo en varias páginas" puede gatillar restricción simultánea de varias cuentas.

Las cuentas son **nuevas (0-3 meses)** → escrutinio máximo de las plataformas.

**Regla rectora:** preferimos no publicar a publicar algo que nos banee. Un cliente no perdona que su agencia se autobanee.

---

## 1. RIESGOS IDENTIFICADOS (verificados)

| # | Riesgo | Origen | Severidad |
|---|--------|--------|-----------|
| R1 | Contenido casi-idéntico entre marcas hermanas | Un hallazgo IID alimenta N marcas; builder cambia voz pero no estructura | **CRÍTICA** (arrastra varias cuentas) |
| R2 | Publicación robótica (hora exacta, intervalo fijo) | Scheduler sin jitter | ALTA |
| R3 | Mismo token/portfolio para todas las marcas | Infra Meta (verificado: prefijo token idéntico en las 3) | Amplifica R1 |
| R4 | Contenido reposteado/duplicado en el tiempo | Mismo tema regenerado sin variación | MEDIA |
| R5 | Volumen súbito en cuenta nueva | Salto de cadencia no gradual | MEDIA |

---

## 2. BUILDER — Requisitos duros

El builder de prompt (convergido en el Orchestrator) DEBE cumplir:

### 2.1 Divergencia estructural por ángulo (mitiga R1)
- Cuando un hallazgo se ramifica a N marcas, el builder **NO genera N variantes de voz sobre el mismo esqueleto.**
- Cada marca entra con su `angle` (columna en `brand_topics`) como **eje estructural, no como tono.**
- Ejemplo `ai-cognition`: Lucien = lectura filosófica/cultural; UNRLVL = lectura técnico-operativa con números. Deben producir piezas que un humano NO percibiría como relacionadas.
- El `angle` se lee de `brand_topics.angle` y es **obligatorio** para temas con `sibling_stagger=true`.

### 2.2 Principio de evidencia por marca
- UNRLVL: toda afirmación respaldada en números (hard_rule). Cero opinión suelta.
- Lucien: filosófico/cualitativo (territorio opuesto).
- El builder NUNCA mezcla registros entre marcas hermanas sobre el mismo tema.

### 2.3 Inyección de genoma correcta
- `brand_id` + `voice_id` resueltos desde `brand_topics` (voice_by_destination por plataforma).
- Inyectar `brand_voice_genome` real (no el viejo `default_voice`).

---

## 3. SCHEDULER — Requisitos duros

### 3.1 Jitter obligatorio (mitiga R2)
- NUNCA publicar a hora exacta. Aplicar desfase aleatorio (±N minutos, sugerido ±15-45).
- Respetar ventanas horarias humanas por plataforma (no 3am salvo que la audiencia lo justifique con data).

### 3.2 Desfase entre marcas hermanas (mitiga R1+R3)
- Para temas con `sibling_stagger=true`: dos marcas que comparten el tema NO publican el mismo día.
- Separación mínima sugerida: 48-72h entre publicaciones de marcas hermanas sobre el mismo dominio.

### 3.3 Cadencia en crescendo (mitiga R5)
- Leer `brand_topics.cadence` por fase (`month_1` / `month_2` / `month_3plus`) y plataforma.
- Respetar `rollout_phase`: en mes 1-2 solo phase 1 (Tier 1); phase 2 (Tier 2/3) recién mes 3+.
- El salto entre meses es gradual, nunca x2 de golpe.

### 3.4 Cadencia de referencia (cuentas nuevas, conservadora)
| Plataforma | Mes 1 | Mes 2 | Mes 3+ |
|---|---|---|---|
| LinkedIn | 2x/sem | 3x/sem | 4-5x/sem |
| X | 3x/sem | 5x/sem | 1x/día |
| Meta IG | 2x/sem | 3x/sem | 4-5x/sem |
| Meta FB | 2x/sem | 3x/sem | 4x/sem |

### 3.5 No-duplicación temporal (mitiga R4)
- Mismo tema no se republica con texto similar en menos de N semanas.
- Repurposeo permitido SOLO con variación real de texto/ángulo.

---

## 4. WATCHER — Gate de cumplimiento (idea de Sam, formalizada)

**El Watcher es un gate obligatorio que se ejecuta ANTES de que cualquier pieza llegue a la bandeja de aprobación.** Ninguna pieza pasa a `pending_approval` sin pasar el Watcher.

### 4.1 Función
Verificación automática de cumplimiento del contrato. El Watcher es el guardián que garantiza que ninguna publicación que viole el contrato siquiera llegue a los ojos de Sam para aprobar.

### 4.2 Checks que ejecuta (en orden)
1. **Similarity gate (R1):** compara la pieza contra otras piezas recientes de marcas hermanas sobre el mismo tema. Método: embedding similarity (umbral sugerido < 0.80 de coseno) o check semántico vía Claude. Si supera umbral → RECHAZA y marca para regeneración con ángulo más divergente.
2. **Sibling-window gate (R1+R3):** verifica que no haya otra pieza de marca hermana sobre el mismo dominio publicada o agendada dentro de la ventana de desfase (48-72h). Si la hay → reagenda, no publica junto.
3. **Cadence gate (R5):** verifica que publicar esta pieza no exceda la cadencia de la fase/plataforma actual. Si excede → encola para siguiente slot.
4. **Evidence gate (marca-específico):** para UNRLVL, verifica presencia de datos/números (no opinión suelta). Para Lucien, verifica que NO viole sus hard_rules (frame übermensch nunca manifiesto, cero mención de libros). Si falla → RECHAZA.
5. **Duplication gate (R4):** verifica que el tema no se haya publicado con texto similar en la ventana de no-repetición.
6. **Hard-rules gate:** valida todas las `hard_rules` del `brand_topics` de esa marca/tema (confidencialidades, anti-política, etc.).

### 4.3 Salidas del Watcher
- **PASS** → la pieza avanza a `pending_approval` (Sam aprueba).
- **REJECT** → la pieza vuelve al builder con el motivo (regenerar).
- **RESCHEDULE** → la pieza es válida pero el timing no; el Scheduler la reubica.
- Todo resultado se loguea (auditable): qué check falló, por qué.

### 4.4 Principio
> El Watcher hace al sistema más complejo a propósito. Esa complejidad es el costo de ser profesionales. Un sistema que publica y reza no es aceptable cuando nos jugamos las cuentas propias y las de clientes.

---

## 5. FLUJO COMPLETO CON BLINDAJES

```
IID research (hallazgo neutro)
   ↓
¿Qué marcas suscritas al tema? (brand_topics, rollout_phase activa)
   ↓
Por cada marca: Builder (angle estructural + genoma + evidencia)  ← §2
   ↓
WATCHER (6 checks)  ← §4   [NUEVO GATE OBLIGATORIO]
   ├─ REJECT → vuelve al builder
   ├─ RESCHEDULE → vuelve al Scheduler
   └─ PASS ↓
pending_approval (Sam aprueba)  ← modo piloto semi-manual
   ↓
Scheduler (jitter + desfase hermanas + cadencia)  ← §3
   ↓
Publish (Meta MCP / API por plataforma)
```

En R4B el Scheduler programa por marca × tema × destino × fase leyendo `brand_topics`; el Watcher sigue siendo gate obligatorio incluso en modo autónomo.

---

## 6. ESTADO DE IMPLEMENTACIÓN

| Componente | Estado |
|---|---|
| `brand_topics` con ejes + blindaje (angle, sibling_stagger, cadence, rollout_phase, purpose) | ✅ HECHO |
| Builder lee brand_topics + inyecta genoma | ⛔ PENDIENTE (CC) |
| Watcher (6 gates) | ⛔ PENDIENTE (CC) — construir ANTES del primer publish |
| Scheduler (jitter + desfase + crescendo) | ⛔ PENDIENTE (CC, fase R4B) |

**REGLA DE LANZAMIENTO:** el primer publish real NO ocurre hasta que Builder + Watcher estén operativos. El Scheduler puede venir después (en piloto, Sam aprueba manual y publica), pero el Watcher es prerequisito porque es el que evita el autobaneo.
