-- ============================================================
-- UNRLVL Supabase Seed — Fase 1
-- Generado: 2026-03-25 · Fuente: DB_VARIABLES_v6_4.xlsx
-- Ejecutar DESPUÉS del DDL (UNRLVL_Supabase_Schema.md)
-- ============================================================

-- ============================================================
-- TABLE: brands (8 marcas activas del ecosistema)
-- ============================================================

INSERT INTO brands (id, display_name, tagline, market, language_primary, sam_role, type, industry, status, health, visual_identity, default_negative_prompt, agent_tone, positioning) VALUES
('DiamondDetails', 'Diamond Details', NULL, 'Alicante, Costa Blanca (Comunidad Valenciana)', 'es-ES', 'studio', 'brand', 'automotive_detailing', 'active', 'green',
'High-end automotive detailing. Cinematic workshop / garage, moody lighting with clean highlights, glossy paint reflections, water beading/foam/microfiber action, premium sports/sedan look. Dark neutral background, strong negative space for copy. Avoid readable plates; keep it modern and expensive.',
'Service visuals. No absolute guarantees. No readable text or numbers. No identifiable license plates. No unsafe workshop scenes.',
'authoritative',
'Uno de los shops más profesionales de toda la Comunidad Valenciana. Certificaciones, garantías premium, servicios para joyas automotrices.');

INSERT INTO brands (id, display_name, tagline, market, language_primary, sam_role, type, industry, status, health, visual_identity, default_negative_prompt, agent_tone, positioning) VALUES
('VizosCosmetics', 'Vizos Cosmetics', NULL, 'Miami (Florida) y España', 'es-ES', 'studio', 'brand', 'high_end_beauty', 'active', 'green',
'Editorial runway style, bold dramatic shadows, obsidian surfaces, high fashion lighting, ultra-sharp focus on hair texture and product detail. Miami luxury premium aesthetic.',
'Professional haircare visuals only. No medical claims. No absolute results. Focus on salon-quality aesthetic and product texture.',
'authoritative',
'Marca de cuidado capilar profesional con más de 40 años de experiencia entre EE.UU. y España.');

INSERT INTO brands (id, display_name, tagline, market, language_primary, sam_role, type, industry, status, health, visual_identity, default_negative_prompt, agent_tone, positioning) VALUES
('D7Herbal', 'D7 Herbal', 'Siete fuerzas naturales, una raíz más fuerte', 'Alicante, Madrid, España, Comunidad Valenciana', 'es-ES', 'studio', 'brand', 'cosmetic_haircare', 'active', 'green',
'Dermocosmetic botanical haircare. Clean premium bathroom/spa lifestyle. Bright neutral palette, soft natural light, realistic scalp and hair micro-textures. Strong negative space. PRODUCT FIDELITY LOCK: bottle must match source asset exactly — same rounded dome top, transparent cap, blue spray pump, white nozzle, label layout. Do NOT redesign or recolor.',
'Cosmetic only. No medical/clinical claims. No readable text. PRODUCT FIDELITY LOCK: D7Herbal bottle must match source asset exactly. If scene shows application: cap must be removed, spray directed only onto scalp.',
'warm',
'Loción capilar con 7 extractos vegetales que actúan en sinergia para fortalecer el folículo piloso y crear condiciones óptimas de crecimiento.');

INSERT INTO brands (id, display_name, tagline, market, language_primary, sam_role, type, industry, status, health, visual_identity, default_negative_prompt, agent_tone, positioning) VALUES
('VivoseMask', 'Vivosé Mask', NULL, 'Alicante, Madrid, España, Comunidad Valenciana', 'es-ES', 'studio', 'brand', 'beauty_haircare', 'active', 'yellow',
'Modern spa-luxury aesthetic. Silk textures, soft blush and white tones, close-up macro hair details, hydration and shine emphasis. Minimal props, clean negative space.',
'Cosmetic claims only. No medical/cure language. Focus on hydration, shine, softness as perceived cosmetic benefits.',
'calm',
'Mascarilla capilar intensiva de alto rendimiento para reparar, nutrir y dar brillo al cabello maltratado. Marca hermana de D7Herbal.');

INSERT INTO brands (id, display_name, tagline, market, language_primary, sam_role, type, industry, status, health, visual_identity, default_negative_prompt, agent_tone, positioning) VALUES
('PatriciaOsorioPersonal', 'Patricia Osorio · Personal', NULL, 'Miami, FL', 'es-FL', 'studio', 'personal_brand', 'beauty_professional', 'active', 'green',
'Editorial clean, Miami daylight, warm tones. Professional latina woman 35-45, impeccably styled hair, Miami premium style, warm authority.',
'No medical claims. No guaranteed results.',
'energetic',
'Colorista y estilista de autoridad en Miami. Especialista en colorimetría, balayage, salud capilar y estilismo premium.');

INSERT INTO brands (id, display_name, tagline, market, language_primary, sam_role, type, industry, status, health, visual_identity, default_negative_prompt, agent_tone, positioning) VALUES
('PatriciaOsorioComunidad', 'Patricia Osorio · Comunidad', NULL, 'Miami, FL', 'es-FL', 'studio', 'personal_brand', 'beauty_professional', 'active', 'green',
'Community-focused content. Educational, warm, approachable. Behind-the-scenes salon life, tutorials, community engagement.',
'No medical claims. No guaranteed results.',
'energetic',
'Canal de comunidad de Patricia Osorio — educación capilar, tutoriales y lifestyle Miami.');

INSERT INTO brands (id, display_name, tagline, market, language_primary, sam_role, type, industry, status, health, visual_identity, default_negative_prompt, agent_tone, positioning) VALUES
('PatriciaOsorioVizosSalon', 'Patricia Osorio · Vizos Salón', NULL, 'Miami, FL', 'es-FL', 'studio', 'personal_brand', 'beauty_salon', 'active', 'green',
'Salon Vizos Miami premium aesthetic. Professional salon environment, product showcases, before/after transformations.',
'No medical claims. Professional salon content only.',
'authoritative',
'Patricia Osorio en contexto del Salón Vizos Miami — distribución exclusiva Neurone Cosmética.');

INSERT INTO brands (id, display_name, tagline, market, language_primary, sam_role, type, industry, status, health, visual_identity, default_negative_prompt, agent_tone, positioning) VALUES
('NeuroneCosmetics', 'Neurone Cosmética', NULL, 'South & Central Miami, FL', 'es-FL', 'studio', 'brand', 'professional_colorimetry', 'active', 'yellow',
'Professional colorimetry brand. Lab-meets-salon aesthetic. Technical precision, professional authority.',
'No medical claims. Professional colorimetry only. No absolute results.',
'authoritative',
'Distribución exclusiva South & Central Miami. Colorimetría profesional con tecnología Nano Tribología.');

-- ============================================================
-- TABLE: humanize_profiles — HUMANIZE F2.5 (5 DEFAULTs globales)
-- ============================================================

INSERT INTO humanize_profiles (brand_id, medium, authenticity_rules, temperature) VALUES
(NULL, 'copy', 'Voz humana auténtica. Varía ritmo de frases: cortas y largas alternadas. Usa contracciones naturales del idioma. Puntuación expresiva: puntos suspensivos, em-dash. Primera persona cuando posible. PROHIBIDO: ''En conclusión'', ''Es importante destacar'', ''Ciertamente'', ''innovador/revolucionario/transformador'', párrafos simétricos perfectos, listas de 3 puntos idénticos en longitud.', 1.1);

INSERT INTO humanize_profiles (brand_id, medium, authenticity_rules, temperature) VALUES
(NULL, 'image', 'Imperfecciones dérmicas naturales: poros, variación tonal, sin áreas uniformemente lisas. Asimetría facial sutil. Flyaways y variación de volumen en cabello. Micro-expresiones, no sonrisa congelada de stock. Ropa con arrugas naturales de movimiento. PROHIBIDO: piel plástica/cera, simetría perfecta, poses de stock, iluminación sin sombras naturales en contexto lifestyle.', NULL);

INSERT INTO humanize_profiles (brand_id, medium, authenticity_rules, temperature) VALUES
(NULL, 'video', 'Micro-movimientos entre tomas: respiración visible, parpadeo natural (~1 cada 5s). Handheld con micro-vibración orgánica, no gimbal perfecto. Eyeline no siempre directo al lente. Gestos que anticipan el énfasis vocal. Composición regla de tercios con intención, variación de 30°+ entre cortes. PROHIBIDO: personajes inmóviles entre diálogos, estabilización perfecta en UGC.', NULL);

INSERT INTO humanize_profiles (brand_id, medium, authenticity_rules, temperature) VALUES
(NULL, 'voice', 'Pausas de respiración naturales en puntos de puntuación. Micro-hesitaciones controladas (100-150ms) en transiciones de idea. Velocidad variable: más rápido en info secundaria, más lento en mensaje clave. Coloración emocional: sube en hook, asienta en desarrollo, cierra con convicción. PROHIBIDO: cadencia uniforme robótica, pausas mecánicas idénticas, velocidad constante.', NULL);

INSERT INTO humanize_profiles (brand_id, medium, authenticity_rules, temperature) VALUES
(NULL, 'web', 'Fotografía candid sobre staged. Luz natural imperfecta preferida a estudio uniforme. Headlines conversacionales, no corporativos. Párrafos máx 3-4 líneas. Segunda persona directa (tú/usted según marca). Microcopy de UI con personalidad. PROHIBIDO: fotos de stock de personas con sonrisa perfecta, copy en tercera persona impersonal, UI microcopy genérico (Submit/Learn More/Click Here).', NULL);

-- ============================================================
-- TABLE: compliance_rules (globales + por marca)
-- ============================================================

-- Globales (brand_id NULL)
INSERT INTO compliance_rules (brand_id, rule_type, jurisdiction, rule_text, severity, applies_to) VALUES
(NULL, 'advertising', 'global', 'Prohibido inventar: certificaciones, homologaciones, garantías, pruebas, resultados clínicos, claims médicos, ''clínicamente probado'', autorizaciones legales. Si falta evidencia usa placeholders [COMPLETAR]. Evita absolutos: ''garantizado'', ''cura'', ''100%''.', 'hard', '["copy","image","video","voice","web"]'::jsonb);

INSERT INTO compliance_rules (brand_id, rule_type, jurisdiction, rule_text, severity, applies_to) VALUES
(NULL, 'medical_claims', 'global', 'Producto cosmético. No sustituye diagnóstico ni tratamiento médico. Resultados variables según tipo de cabello/piel y constancia de uso. Ante irritación o reacción, suspender uso y consultar profesional.', 'hard', '["copy","video","voice"]'::jsonb);

INSERT INTO compliance_rules (brand_id, rule_type, jurisdiction, rule_text, severity, applies_to) VALUES
(NULL, 'advertising', 'ES', 'No lectura de matrículas en imágenes. No escenas de taller inseguras. Sin garantías absolutas. Servicios sujetos a inspección previa. Garantías solo si se especifican por escrito.', 'hard', '["copy","image","video"]'::jsonb);

-- Por marca
INSERT INTO compliance_rules (brand_id, rule_type, jurisdiction, rule_text, severity, applies_to) VALUES
('DiamondDetails', 'advertising', 'ES', 'No absolute guarantees. Service-focused claims only. No readable plates or text. No unsafe workshop scenes. Show technical precision.', 'hard', '["copy","image","video"]'::jsonb);

INSERT INTO compliance_rules (brand_id, rule_type, jurisdiction, rule_text, severity, applies_to) VALUES
('VizosCosmetics', 'medical_claims', 'global', 'Professional haircare. No medical claims. Salon-quality aesthetic required. No absolute results.', 'hard', '["copy","image","video","voice"]'::jsonb);

INSERT INTO compliance_rules (brand_id, rule_type, jurisdiction, rule_text, severity, applies_to) VALUES
('D7Herbal', 'medical_claims', 'ES', 'Cosmetic only. No medical/clinical claims (no cure/guarantee/disease language). No exaggerated before/after. PRODUCT FIDELITY LOCK: D7Herbal bottle must match source asset exactly when visible. Application scenes: cap must be removed, spray directed only onto scalp.', 'hard', '["copy","image","video","voice"]'::jsonb);

INSERT INTO compliance_rules (brand_id, rule_type, jurisdiction, rule_text, severity, applies_to) VALUES
('VivoseMask', 'medical_claims', 'ES', 'Cosmetic claims only. No medical/cure language. Focus on hydration and shine as perceived cosmetic benefits.', 'hard', '["copy","image","video","voice"]'::jsonb);

INSERT INTO compliance_rules (brand_id, rule_type, jurisdiction, rule_text, severity, applies_to) VALUES
('PatriciaOsorioPersonal', 'advertising', 'FL_US', 'No medical claims. No guaranteed results. Educational content focus.', 'soft', '["copy","video","voice"]'::jsonb);

INSERT INTO compliance_rules (brand_id, rule_type, jurisdiction, rule_text, severity, applies_to) VALUES
('NeuroneCosmetics', 'medical_claims', 'FL_US', 'Professional colorimetry. No medical claims. No absolute results. Distribution exclusive South & Central Miami. No competitor comparisons by name.', 'hard', '["copy","image","video","voice"]'::jsonb);

INSERT INTO compliance_rules (brand_id, rule_type, jurisdiction, rule_text, severity, applies_to) VALUES
('NeuroneCosmetics', 'advertising', 'FL_US', 'Bilingual content (es-FL + EN option). Distribución exclusiva South & Central Miami — indicar en copy cuando sea relevante.', 'soft', '["copy"]'::jsonb);

-- ============================================================
-- TABLE: imagelab_presets (7 presets globales por canal)
-- ============================================================

INSERT INTO imagelab_presets (brand_id, canal, realism_level, film_look, lens_preset, depth_of_field, aspect_ratio, extra_params) VALUES
(NULL, 'WEB', 'editorial_clean', 'digital_clean', '35mm_hero', 'deep', '16:9', '{"preset_id":"W0101","framing":"centered","skin_detail":"subtle","grain_level":0,"notes":"Web institucional limpio premium — sin dramatizar"}'::jsonb);

INSERT INTO imagelab_presets (brand_id, canal, realism_level, film_look, lens_preset, depth_of_field, aspect_ratio, extra_params) VALUES
(NULL, 'LANDING', 'cinematic', 'digital_clean', '50mm_lifestyle', 'medium', '4:5', '{"preset_id":"L0101","framing":"negative_space_right","skin_detail":"realistic","grain_level":1,"notes":"Landing conversion — product-forward, espacio negativo derecha para copy/CTA"}'::jsonb);

INSERT INTO imagelab_presets (brand_id, canal, realism_level, film_look, lens_preset, depth_of_field, aspect_ratio, extra_params) VALUES
(NULL, 'LANDING', 'cinematic', '35mm_film', '35mm_hero', 'shallow', '4:5', '{"preset_id":"L0201","framing":"negative_space_right","skin_detail":"realistic","grain_level":1,"notes":"Landing cinematic premium — DOF corto, más impacto visual"}'::jsonb);

INSERT INTO imagelab_presets (brand_id, canal, realism_level, film_look, lens_preset, depth_of_field, aspect_ratio, extra_params) VALUES
(NULL, 'META', 'cinematic', '35mm_film', '85mm_portrait', 'shallow', '1:1', '{"preset_id":"M0101","framing":"rule_of_thirds","skin_detail":"realistic","grain_level":1,"notes":"Meta thumbstopper — rostro + producto, encuadre thirds para scroll-stop"}'::jsonb);

INSERT INTO imagelab_presets (brand_id, canal, realism_level, film_look, lens_preset, depth_of_field, aspect_ratio, extra_params) VALUES
(NULL, 'META', 'editorial_clean', 'digital_clean', '50mm_lifestyle', 'medium', '4:5', '{"preset_id":"M0201","framing":"negative_space_right","skin_detail":"subtle","grain_level":0,"notes":"Meta clean editorial — lifestyle natural"}'::jsonb);

INSERT INTO imagelab_presets (brand_id, canal, realism_level, film_look, lens_preset, depth_of_field, aspect_ratio, extra_params) VALUES
(NULL, 'TIKTOK', 'cinematic', '35mm_film', '35mm_hero', 'shallow', '9:16', '{"preset_id":"T0101","framing":"rule_of_thirds","skin_detail":"realistic","grain_level":1.5,"notes":"TikTok cinematic — scroll-stop"}'::jsonb);

INSERT INTO imagelab_presets (brand_id, canal, realism_level, film_look, lens_preset, depth_of_field, aspect_ratio, extra_params) VALUES
(NULL, 'TIKTOK', 'ugc_style', 'digital_clean', '24mm_wide', 'medium', '9:16', '{"preset_id":"T0201","framing":"centered","skin_detail":"realistic","grain_level":2,"notes":"TikTok UGC — auténtico, handheld"}'::jsonb);

-- ============================================================
-- SEED FASE 1 COMPLETE
-- brands: 8 · humanize_profiles: 5 · compliance_rules: 11 · imagelab_presets: 7
-- Siguiente: seed_phase2.sql (output_templates 16 SMPC + canal_blocks 13 + ctas + keywords)
-- ============================================================
