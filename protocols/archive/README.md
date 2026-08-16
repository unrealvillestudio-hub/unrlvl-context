# protocols/archive
Documentos de protocolo y specs **cumplidos o superados**, conservados por valor histórico.
No se cargan en sesión. No son fuente de verdad de nada vivo.
Antes de archivar cada uno se extrajo su contenido todavía vigente al lugar que corresponde
(skill, AGENDA o Professor). Si buscás algo de un archivo de aquí, probablemente su parte
viva esté en otro sitio — este es el original completo.

| Archivo | Archivado | Por qué | Qué se rescató antes |
|---|---|---|---|
| `DRYRUN_PLAN_IID_PILOT.md` | 2026-08-16 | Su premisa está muerta: el `.limit(1)` se retiró (hoy `DISPATCH_LIMIT=5`) y la queue tiene 0 cadáveres (verificado en `intel.iid_content_queue`). La Fase 4.1 no se saltó: se cumplió por otra vía. | La batería de pruebas negativas §2.3 → `skills/content-pipeline/SKILL.md`. |
| `R4B_SPECS_CC.md` | 2026-08-16 | 7 de sus 8 criterios cerrados y verificados (5e-5-bis, 5o, 5p-a, 5p-b, 5q, 5e-4 + pgvector instalado). El único abierto se extrajo a AGENDA con dueño en vez de completarse: no se toca producción para poder archivar un documento. | El DDL de `intel.content_embeddings` (§5e-2, corregido a `vector(768)`) y el flag de §5e-3 → `AGENDA.md`. |
| `IID_OUTPUT_QUALITY_LOTE_A_SPEC.md` | 2026-07-21 | Los 5 fixes están live y verificados (§10.6). Solo el move-to-permanent quedó verificado-por-deploy, pendiente del primer publish real a Meta. | El addendum §10 (4 suposiciones falsas del spec que CC desmontó al leer el código real) → Professor, 21-jul. |
| `RETOMA_AIID_ARTICULOS.md` | 2026-07-21 | Su plan operativo caducó: `iid_content_queue` y `content_pieces` están vacías (las 204 piezas fueron descarte deliberado por ruido off-brand). | La composición de dos genomas en vocería → AGENDA #79. La variabilidad de publicación → `skills/voice-craft/SKILL.md` §1.10. |
