# ronda-empleo

## Qué hace
Asistente de búsqueda de empleo para personas a las que el operador ayuda.
Ejecuta una ronda completa: triaje de la bandeja de la persona, búsqueda de
ofertas por perfiles, deduplicación (ventana 60 días), match oferta↔CV, envío
de un correo agrupado vía Resend, registro de lo enviado, y asistencia a
candidaturas (cartas + respuestas de formulario).

Parametrizado por persona. Nada específico vive en el skill: todo es dato en
job_seekers / job_offers_sent (proyecto XMMs puoybldykxqvhvtnwrld).

## Invocación
- "corre ronda-empleo para <persona>"
- "ronda-empleo <persona> perfil <perfil>"
- "ronda-empleo <persona> asistir <oferta>"
- "ronda-empleo <persona> triaje"   (solo revisar bandeja)

## Datos
- job_seekers: full_name, email, phone, ref_location, radius_km, exclusions[],
  profiles (perfil→CV), strategy_notes.
- job_offers_sent: dedupe. fingerprint = md5(normalizar(empleador|puesto|municipio)).
  Ventana 60 días (reaparición pasada la ventana = oportunidad nueva).

## Fases
1. Cargar contexto de la persona (SELECT job_seekers).
2. TRIAJE DE BANDEJA (si hay conector de correo de solo-lectura autorizado):
   - Leer inbox reciente de la persona.
   - Descartar ruido: agregadores repetidos (Jooble, Jobsora, Talent, JobLeads,
     betterjobsonline, jotjob), cursos, puestos fuera de perfil o fuera de radio.
   - EXTRAER Y PRIORIZAR: (a) procesos activos que requieren acción (ETT que
     pide referencias/entrevista, p.ej. Randstad), (b) ofertas reales cercanas
     de fuentes fiables (Job Today, Indeed), (c) ofertas ya vistas sin completar.
   - Un proceso activo (referencias, entrevista) es SIEMPRE prioridad máxima:
     vale más que cualquier oferta nueva.
3. BUSCAR por perfil. Prioridad de fuentes:
   (a) empleadores directos con portal propio (Teamtailor/ATS)
   (b) agregadores de negocio local con inscripción directa (Job Today)
   (c) agregadores grandes → enlace a búsqueda filtrada viva (Indeed, Jooble)
   Objetivo: hasta 10 ofertas útiles por perfil (mínimo lo que haya real; no
   rellenar con ruido ni con lo excluido).
4. FILTRAR: radius_km + exclusions + dedupe contra job_offers_sent (<60 días).
5. MATCH cada oferta con su CV (profiles).
6. REDACTAR correo agrupado por perfil, con bloques visuales por prioridad:
   puesto, empleador, distancia, por qué encaja, enlace, CV a usar.
7. ENVIAR vía endpoint Resend genérico (api_endpoint del ecosistema).
8. REGISTRAR ofertas nuevas en job_offers_sent (fingerprint + datos + fecha).
9. (A demanda) ASISTIR candidatura:
   - Carta de motivación adaptada a la empresa = plantilla base del perfil +
     strategy_notes de la persona.
   - Respuestas a formularios ("preséntate en N caracteres", "¿por qué eres
     adecuada?", "aptitudes relevantes"), y first-message genérico por perfil.
   - Respetar SIEMPRE strategy_notes (framing del CV, títulos, fechas).

## Reglas
- Verificar vigencia: marcar fecha de detección; avisar "verifica antes de
  aplicar" en agregadores; no prometer que un enlace siga vivo.
- Distancia percibida ≠ km: respetar exclusions aunque entren en radio.
- Registrar bolsas permanentes (supermercados, Poseidón) aparte: no son
  vacantes puntuales, no se deduplican como ofertas.
- Complementar SIEMPRE con recordatorio de entrega en persona (paseo marítimo,
  centros comerciales) — funciona muy bien en costa turística.
- Tono de cartas y correos: cercano, primera persona, sin corporativismo.
- Cadencia: semanal en temporada alta, quincenal en meses flojos. Iniciado por
  el operador (no hay disparador automático aún).
- El skill NO reimplementa envío ni motores: llama al endpoint Resend.
- Multimarca: ninguna persona/marca hardcodeada. Persona = fila.
