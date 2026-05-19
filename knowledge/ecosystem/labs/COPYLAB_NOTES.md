# COPYLAB — Creative Engine
_knowledge/ecosystem/labs/COPYLAB_NOTES.md_
_Aprobado por Sam: 2026-05-18_

---

## Creative Engine — Layers 14, 15, 16

**El descubrimiento:** buildCopyPrompt.ts era excelente como guardarraíles de marca pero producía copy correcto y plano. La pieza que faltaba no era más contexto de marca — era intención creativa estructurada.

**Lo que resuelve:** la diferencia entre copy consistente y copy memorable.

### Layer 14 — CREATIVE_VECTOR
44 vectores en 6 categorías (A-F) que definen el mecanismo de entrada — cómo abre el copy. No el tono, el ángulo de apertura. Selección aleatoria dentro del pool compatible por `content_type`. Nunca repite el mismo vector dos veces consecutivas para la misma marca.

Categorías: Observación directa (A) · Verdad sin filtro (B) · Identificación social (C) · Narrativa de tensión (D) · Autoridad diagnóstica (E) · Urgencia real (F).

### Layer 15 — TENSION_ARCHITECTURE
10 arquitecturas que definen cómo se mueve la presión emocional a lo largo del copy. No es el tono — es la curva. Ejemplos: T1 INVERTED_PYRAMID (Cart A canónico — reveal tardío), T2 EARLY_SPIKE (Cart B — tensión máxima desde el primer segundo), T10 THE_QUIET_KNIFE (cada frase corta sin que se note la presión).

### Layer 16 — AGGRO_DIAL
5 niveles de convicción desde AGGRO_1 WHISPER hasta AGGRO_5 FULL_AGGRO. AGGRO no es volumen — es la disposición a incomodar en servicio de la conversión. Regla crítica: FULL_AGGRO sin substancia construida en las capas anteriores = spam que daña la marca. FULL_AGGRO con substancia = la conversión más limpia que existe.

### Sistema de compatibilidad
Tabla `creative_compatibility_rules` en Supabase define qué combinaciones vector+tension+aggro son válidas por `content_type`. Excluye AGGRO_4/5 de content_types que no han construido el argumento (welcome, post_purchase). Excluye vectores F (urgencia) de Cart A. Excluye vectores E (autoridad PO) de Cart B — PO ya fue usada en Cart A.

### Implementación
- Tablas Supabase: `creative_vectors`, `tension_architectures`, `aggro_presets`, `creative_compatibility_rules`
- Implementado en: `CopyLab/api/execute.ts` v9.0 (layers 14/15/16)
- Brand-agnostic: universal para todos los labs y marcas del ecosistema
