## Qué hace este PR
<!-- Describe el cambio en 1-3 líneas -->

## Tipo de cambio
- [ ] Fix de bug
- [ ] Feature nueva
- [ ] Refactor / deuda técnica
- [ ] Config / infra

## Checklist antes de mergear a main
- [ ] Probado en Vercel Preview URL (pegar URL aquí)
- [ ] `tsc --noEmit` clean (si aplica al repo)
- [ ] `next build` o `vite build` clean
- [ ] Prueba funcional manual realizada en preview
- [ ] No hay console.log / debug code sin resolver
- [ ] Variables de entorno documentadas si se agregaron

## Notas para el reviewer
<!-- Contexto adicional, screenshots, links -->

## Checklist de la regla multimarca (`MULTIBRAND_RULE.md` §8)
- [ ] Test de la marca N+1 respondido (§2, las 4 preguntas)
- [ ] Sin `brand_id` literal en capa compartida
- [ ] Sin claves fijas sobre JSONB abierto (se itera, no se enumera a mano)
- [ ] Constantes y CHECK nombrados por FUNCIÓN, no por caso de marca
- [ ] Si toca un eje existente: alias legacy conservado y documentado
- [ ] Orden respetado: PR de código antes que DDL
- [ ] Ejes nuevos declarados en `ecosystem.json`

## Checklist propio de este repo (solo lectura)
- [ ] **No agrega ninguna tool de escritura** (enviar, responder, reenviar, borrar, mover, etiquetar, marcar como leído)
- [ ] **No persiste contenido de mensajes** en ninguna tabla, caché ni archivo
- [ ] Ningún `console.log` con cuerpo, asunto, remitente, destinatario, adjunto, `message_id` ni la cadena de búsqueda
- [ ] Si toca carpetas: sigue siendo constante en `lib/folders.ts`, con la papelera excluida
- [ ] `npm test` en verde, incluidos los dos tests obligatorios de papelera
