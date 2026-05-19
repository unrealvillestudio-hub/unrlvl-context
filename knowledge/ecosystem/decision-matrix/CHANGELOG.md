# AYRA — Principio de construcción
_knowledge/ecosystem/decision-matrix/CHANGELOG.md — entrada 2026-05-18_
_Aprobado por Sam: 2026-05-18_

---

## Patrón descubierto: infraestructura de operaciones = infraestructura de Ayra

**El descubrimiento:** durante la sesión del 2026-05-18, construyendo el sistema de email sequences (tablas content_sequences, lab_configs, Creative Engine, sequenceBridge, Orchestrator v2.2, CopyLab v9.0), Sam señaló: "ya estamos construyendo los cimientos de Ayra, ¿correcto?"

**Lo que descubrimos juntos:** cuando el trabajo técnico de una sesión está bien diseñado, la infraestructura de operaciones del ecosistema y la infraestructura de Ayra son el mismo trabajo. No son proyectos paralelos.

- Las tablas que Ayra va a monitorear → se crean en el sprint de contenido
- Los nodos del jobRunner de Ayra → son los labs que se conectan en el sprint de integración
- El system prompt que Ayra inyectará al llamar a Claude → es el skill corregido en el sprint de copy
- Los endpoints que Ayra llamará autónomamente → son los mismos que Claude llama manualmente hoy

**La implicación práctica:** cuando se diseña cualquier sprint técnico del ecosistema, la pregunta correcta es "¿qué nodo de Ayra estamos construyendo?" — no tratarlo como trabajo separado de Ayra. Cuando llegue el sprint de Ayra, los nodos ya existen. Solo hay que conectar el cron y el jobRunner.

**Estado al 2026-05-18:**
- content_sequences + content_sequence_pieces → tablas que Ayra monitoreará para job `content_publish`
- klaviyo en lab_configs → nodo destino del jobRunner
- email_sequence pack en CopyLab → lab que Ayra invocará desde executeStage()
- sequenceBridge → el bridge que Ayra usará para parse + write + deploy autónomo
- rotate_sequence_current() → función que Ayra llamará para iniciar cada run
