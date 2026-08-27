# BP_Brand_Context — Lucien Sael

_Creado: 2026-08-26 · Mantenido por Claude · Marca: LucienSael_

---

## ⚠️ Este archivo NO es la fuente canónica

**El blueprint de marca de Lucien Sael vive en `BluePrints/brands/LucienSael/`** — creado el
2026-08-26 en los PRs **#2 y #3** de `BluePrints` (JSON + HTML + 2 SVG vectorizados). Este documento
**remite** a él y no lo duplica: duplicar un blueprint es garantizar que las dos copias divergan.

**Orden de precedencia, sin excepciones:**

1. **La DB** — `intel.brand_topics`, `intel.brand_cadence`, `intel.brand_publish_channels`,
   `intel.brand_rollout`, `brand_voice_genome`. Es lo que el carril **ejecuta**.
2. **`BluePrints/brands/LucienSael/`** — la identidad visual y verbal canónica.
3. **`brands/LucienSael/brand.json`** — espejo legible de (1) para las sesiones de contexto.
4. **Este archivo** — mapa y punteros.

Si (1) y (2) divergen, **no se corrige a mano ninguno de los dos**: se anota la divergencia y decide
Sam. Es literalmente lo que pasó el 2026-08-22 con el slogan y la firma, y lo que sigue abierto con
los pesos tipográficos.

---

## Dónde vive cada cosa

| Qué | Dónde | Estado |
|---|---|---|
| Blueprint de marca (JSON + HTML + SVG) | `BluePrints/brands/LucienSael/` | ✅ creado 2026-08-26 (PRs #2 y #3) |
| Identidad visual v1.0 (documento) | `brands/LucienSael/lucien-sael-brand-identity-v1.html` | ✅ canónico desde 2026-08-22 |
| Estatus canónico y mapa documento → tablas | `brands/LucienSael/IDENTITY_ASSETS.md` | ✅ |
| Logotipos vectorizados | `brands/LucienSael/LucienSael_logotype_{dark,light}-bg.svg` | ✅ trazados, no fuentes |
| Capa de persona | `brands/LucienSael/BP_Brand_Person_id.md` | ✅ |
| Config operativa de la marca | `brands/LucienSael/brand.json` | ✅ nace 2026-08-26 |
| Historia de sesiones | `brands/LucienSael/session_log.md` | ✅ |
| Corpus rescatado | `brands/LucienSael/corpus/` | ✅ |
| Voces (`lucien_editorial`, `lucien_social`) | `brand_voice_genome` (DB) | ✅ |

---

## Lo que un agente necesita saber antes de escribir para esta marca

- **Bilingüe, EN primero.** ES y EN se generan **por separado desde origen**; nunca se traduce uno
  del otro. Aplica también a las firmas.
- **El slogan no es la firma.** *«I build worlds. Some of them survive.»* es **slogan**: permanente,
  invariable, sin explicación, y **sólo en superficies propias** — footer web, byline editorial,
  email. La **firma** de una pieza distribuida es `— Lucien Sael · Builder, Thinker, Operator`
  (`lucien_editorial`) o `— luciensael.com` (`lucien_social`). **Ruling de Sam, 2026-08-22.**
- **La firma la estampa el sistema**, tras el PASS del Watcher. **El copy nunca la escribe.**
- **Los tres títulos no son rango corporativo:** nombran lo que hace. **Prohibido siempre:** «CEO»,
  «Founder», «Strategist», «Consultant».
- **Ningún dominio de Lucien declara el ángulo `expertise`.** No es olvido: la definición del
  catálogo `intel.content_angles` dice que ese ángulo **exige credencial propia**, y esta marca no
  se apoya en credencial. El límite del ángulo vive en el catálogo, no en el criterio del escritor.
- **Los cuatro dominios** son `ai-cognition`, `ai-identity`, `behavioral-science` y `human-essence`.
  **Rotan** dentro de los slots de cadencia; **no multiplican**.

---

## Estado al 2026-08-26

Entra al Scheduler con `rollout_started_at = 2026-08-26`. Cinco canales activos —`meta_fb`,
`meta_ig`, `x`, `tiktok`, `blog`—, 15 filas de cadencia, 20 de `brand_topic_platform_mode`, ángulos
en los 4 dominios. **Primer research de la historia de la marca** el mismo día: memo íntegro de
25.162 caracteres, `end_turn`, sin truncar.

**Abierto y bloqueante:** `judged_source` llega **NULL** en las 4 piezas vivas. Ver
`brands/LucienSael/session_log.md` (2026-08-26) y `AGENDA.md` **P1**.
