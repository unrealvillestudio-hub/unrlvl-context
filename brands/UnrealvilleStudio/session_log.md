# SESSION LOG — 2026-05-25 v2

## Sesión: Meta MCP — LucienSael + UnclaimedBusinessUser investigation
**Fecha:** 2026-05-25 (continuación)
**Tipo:** Meta infra + Supabase schema

---

## COMPLETADO ✅

### LucienSael — meta_accounts
- ✅ Brand LucienSael insertada en meta_accounts
- page_id: 1076134175585218 — owned by UNREALville Studio ✅
- ig_user_id: null — cuota Meta agotada, pendiente
- ad_account_id: null — cuota Meta agotada, Ad Account propio pendiente. Usar UNRLVL Ads interim.
- system_token: mismo unrlvlopssystem — correcto (un token para todas las marcas del portfolio)

### Supabase schema fix
- ✅ meta_accounts: ig_user_id + ad_account_id → nullable
- Razón: marcas en onboarding pueden no tener IG o AdAcc aún
- Pendiente: añadir guards en route.ts del MCP para null checks

### UnclaimedBusinessUser FromPool — investigado
- Es la cuenta @unrealvillestudio IG añadida al portfolio sin completar claim desde el lado IG
- No es un intruso — es el propio IG de UNRLVL sin propietario humano identificado
- Riesgo: Full Control sobre portfolio sin claim completado
- Fix: Instagram → Accounts Center → Connected experiences → aceptar invitación
- Estado: no encontrado el punto de entrada desde Instagram web. Pendiente resolver.
- Decisión: NO eliminar — riesgo de romper el vínculo IG↔Portfolio

### Meta portfolio UNREALville Studio — estado verificado
- Samuel Moreno Mendoza: Full Control · 2 FB Pages + 1 Ad Account + 1 IG + 1 App
- unrlvlopssystem: Full Control · 2 FB Pages + 1 IG (UNREALville + Lucien Sael)
- UnclaimedBusinessUser @unrealvillestudio: Full Control (unclaimed — ver arriba)
- Ad Account: UNRLVL Ads — bajo Samuel Moreno Mendoza Full Control
- App: UNRLVL Publisher — Full Control

---

## PENDIENTES
1. NSCF meta_accounts — investigar portfolio NSCF, resolver assets, insertar brand
2. LucienSael IG — crear cuando Meta libere cuota
3. LucienSael Ad Account propio — crear cuando Meta libere cuota
4. UnclaimedBusinessUser claim — completar desde IG Accounts Center
5. MCP route.ts — añadir null guards para ig_user_id + ad_account_id
6. Ayra Sprint 0 — DEADLINE 5 JUN 🔴

---

## LEARNINGS: 1 adicional
- META_UNCLAIMED_BUSINESS_USER: guardado en professor_learnings
