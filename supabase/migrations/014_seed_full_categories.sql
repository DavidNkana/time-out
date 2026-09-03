-- 014_seed_full_categories.sql
-- Timeout — full category restructure.
--
-- Goal: 8 active categories surfaced on the storefront, 12 inactive categories
-- held for granular admin-only categorization. All 20 relate to fashion OR home.
--
-- Idempotent: every row is an upsert keyed by slug, so this file is safe to re-run.
-- Existing products in the 'to-%' range stay in their assigned categories — this
-- migration does NOT touch any product data.
--
-- Active 8 (sort_order 1-8, is_active = true):
--   1. womens-fashion — Women's Fashion
--   2. shoes          — Footwear
--   3. bags           — Bags & Accessories
--   4. home           — Home
--   5. home-decor     — Home Decor
--   6. kitchen        — Kitchen & Dining
--   7. bedroom        — Bedding
--   8. bathroom       — Bath
--
-- Inactive 12 (sort_order 9-20, is_active = false):
--   9.  apparel             — Apparel
--   10. back-to-school      — Kids & Baby
--   11. everyday-essentials — Storage & Organization
--   12. curtains            — Curtains & Blinds
--   13. mens-fashion        — Men's Fashion            (NEW slug)
--   14. jewelry-watches     — Jewelry & Watches         (NEW slug)
--   15. activewear          — Activewear                (NEW slug)
--   16. lingerie-sleepwear  — Lingerie & Sleepwear      (NEW slug)
--   17. lighting            — Lighting                  (NEW slug)
--   18. furniture           — Furniture                 (NEW slug)
--   19. wall-art-mirrors    — Wall Art & Mirrors        (NEW slug)
--   20. candles-fragrance   — Candles & Fragrance       (NEW slug)

insert into public.categories (slug, name, sort_order, is_active) values
  -- ACTIVE (visible on storefront)
  ('womens-fashion',  'Women''s Fashion',         1, true),
  ('shoes',           'Footwear',                  2, true),
  ('bags',            'Bags & Accessories',        3, true),
  ('home',            'Home',                      4, true),
  ('home-decor',      'Home Decor',                5, true),
  ('kitchen',         'Kitchen & Dining',          6, true),
  ('bedroom',         'Bedding',                   7, true),
  ('bathroom',        'Bath',                      8, true),

  -- INACTIVE (admin-only, granular categorization)
  ('apparel',             'Apparel',                  9, false),
  ('back-to-school',      'Kids & Baby',              10, false),
  ('everyday-essentials', 'Storage & Organization',   11, false),
  ('curtains',            'Curtains & Blinds',        12, false),
  ('mens-fashion',        'Men''s Fashion',           13, false),
  ('jewelry-watches',     'Jewelry & Watches',        14, false),
  ('activewear',          'Activewear',               15, false),
  ('lingerie-sleepwear',  'Lingerie & Sleepwear',     16, false),
  ('lighting',            'Lighting',                 17, false),
  ('furniture',           'Furniture',                18, false),
  ('wall-art-mirrors',    'Wall Art & Mirrors',       19, false),
  ('candles-fragrance',   'Candles & Fragrance',      20, false)
on conflict (slug) do update set
  name       = excluded.name,
  sort_order = excluded.sort_order,
  is_active  = excluded.is_active;