-- 013_seed_timeout_home_women_fashion.sql
-- 20 fresh products split between two new top-level categories:
--   - Home           (10 products)
--   - Women's Fashion (10 products)
--
-- All new slugs use the 'to-' prefix so this file is safe to re-run and so
-- the cleanup header can target the new products precisely without
-- disturbing the existing demo-* / dummy-* state from migrations 010/011.
--
-- Idempotent: cascade-cleans any prior to-% state, upserts the two new
-- categories, then re-inserts products + variants + images.

-- =====================================================================
-- STEP 1: Cascade cleanup of any prior to-% products
-- =====================================================================
-- Cascade: delete cart_items, order_items, reviews, images, variants, then products with to-% slug
-- (mirror the pattern in 010_seed_better_products.sql and 011_seed_30_products.sql)
delete from cart_items
  where variant_id in (
    select pv.id from product_variants pv
    left join products p on p.id = pv.product_id
    where p.id is null or p.slug like 'to-%'
  );
delete from order_items
  where variant_id in (
    select pv.id from product_variants pv
    left join products p on p.id = pv.product_id
    where p.id is null or p.slug like 'to-%'
  );
delete from reviews
  where product_id in (select id from products where slug like 'to-%');
delete from product_images
  where product_id in (select id from products where slug like 'to-%');
delete from product_variants
  where product_id in (select id from products where slug like 'to-%')
  or product_id not in (select id from products);
delete from products
  where slug like 'to-%'
  or id not in (select distinct product_id from product_variants);

-- =====================================================================
-- STEP 2: Upsert the two new top-level categories
-- (sort_order 1 and 2 so they appear at the top of the storefront;
-- the existing 10 categories stay untouched.)
-- =====================================================================
insert into public.categories (slug, name, sort_order) values
  ('home',           'Home',             1),
  ('womens-fashion', 'Women''s Fashion', 2)
on conflict (slug) do update set
  name       = excluded.name,
  sort_order = excluded.sort_order;

-- =====================================================================
-- STEP 3: 20 products + variants + images
--   Home           : 10 products (2 featured, 3 discounted)
--   Women's Fashion: 10 products (2 featured, 3 discounted)
-- All slugs prefixed 'to-'. Prices in ZAR cents.
-- =====================================================================
do $$
declare
  _home uuid := (select id from public.categories where slug = 'home');
  _wf   uuid := (select id from public.categories where slug = 'womens-fashion');
  _pid  uuid;
  _now  timestamptz := now();

  -- Reusable image array (verified Unsplash photo IDs reused from 010/011)
  _imgs text[] := array[
    'https://images.unsplash.com/photo-1555041469-a586c62ea9bc?w=800&h=800&fit=crop',  -- 1  pillow
    'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&h=800&fit=crop',  -- 2  bed/throw
    'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&h=800&fit=crop',  -- 3  plant/vase
    'https://images.unsplash.com/photo-1505693314120-0d443367891c?w=800&h=800&fit=crop',  -- 4  candle
    'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=800&fit=crop',  -- 5  plant
    'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=800&fit=crop',  -- 6  perfume
    'https://images.unsplash.com/photo-1604709177225-055f99402ea3?w=800&h=800&fit=crop',  -- 7  perfume
    'https://images.unsplash.com/photo-1603487742131-4160ec999306?w=800&h=800&fit=crop',  -- 8  diffuser
    'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&h=800&fit=crop',  -- 9  perfume
    'https://images.unsplash.com/photo-1542219550-37144d6d4f8a?w=800&h=800&fit=crop',  -- 10 perfume
    'https://images.unsplash.com/photo-1545239351-cefa43af60f3?w=800&h=800&fit=crop',  -- 11 dress
    'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&h=800&fit=crop',  -- 12 clothes/blouse
    'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=800&fit=crop',  -- 13 shirt/skirt
    'https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&h=800&fit=crop',  -- 14 jeans/trouser
    'https://images.unsplash.com/photo-1576566588028-5517d4071bf4?w=800&h=800&fit=crop',  -- 15 tshirt/cardigan
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=800&fit=crop',  -- 16 red shoe
    'https://images.unsplash.com/photo-1542293787938-c9e332b85c9c?w=800&h=800&fit=crop',  -- 17 shoes
    'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=800&fit=crop',  -- 18 bag
    'https://images.unsplash.com/photo-1564585222527-c2777a5b5d3a?w=800&h=800&fit=crop',  -- 19 perfume
    'https://images.unsplash.com/photo-1574180566232-aaad1b5de845?w=800&h=800&fit=crop',  -- 20 perfume
    'https://images.unsplash.com/photo-1572635196237-14b3f28103ed?w=800&h=800&fit=crop',  -- 21 sunglasses/scarf
    'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&h=800&fit=crop',  -- 22 lipstick
    'https://images.unsplash.com/photo-1556909211-d5fd1c5c5d2f?w=800&h=800&fit=crop',  -- 23 perfume
    'https://images.unsplash.com/photo-1556228720-da4e85a4ba42?w=800&h=800&fit=crop',  -- 24 denim
    'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=800&fit=crop',  -- 25 watch
    'https://images.unsplash.com/photo-1546863211-acd07f8d3f06?w=800&h=800&fit=crop',  -- 26 watch
    'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&h=800&fit=crop',  -- 27 perfume
    'https://images.unsplash.com/photo-1603006905003-be475563bc59?w=800&h=800&fit=crop'   -- 28 perfume
  ];
begin

  -- ===================================================================
  -- HOME (10 products)
  -- ===================================================================

  -- 1. Velvet Throw Pillow — FEATURED + DISCOUNT (R349 → R449)
  insert into public.products (slug, name, description, category_id, base_price_cents, compare_at_cents, is_featured, tags, created_at) values ('to-velvet-pillow','Velvet Throw Pillow','Cut from cotton velvet with a generous fill. It catches the light just enough to feel considered without trying too hard.', _home, 34900, 44900, true, '{velvet,pillow,pink,living room,gift}', _now - interval '2 hours') returning id into _pid;
  insert into public.product_variants (product_id, sku, name, options, stock) values
    (_pid,'VPIL-BLS','Blush','{"colour":"Blush"}',18),
    (_pid,'VPIL-CRM','Cream','{"colour":"Cream"}',22),
    (_pid,'VPIL-SGE','Sage','{"colour":"Sage"}',15);
  insert into public.product_images (product_id, url, alt_text, sort_order) values
    (_pid, _imgs[1],  'Blush velvet throw pillow on a cream linen sofa',     0),
    (_pid, _imgs[2],  'Velvet pillow detail shot on a wooden bench',         1);

  -- 2. Stonewashed Linen Throw
  insert into public.products (slug, name, description, category_id, base_price_cents, tags, created_at) values ('to-stonewashed-throw','Stonewashed Linen Throw','Stonewashed linen that softens with every wash. Light enough for the sofa, generous enough for the foot of the bed.', _home, 89900, '{linen,throw,bedroom,neutral}', _now - interval '5 hours') returning id into _pid;
  insert into public.product_variants (product_id, sku, name, options, stock) values
    (_pid,'SLT-OAT','Oatmeal','{"colour":"Oatmeal"}',14),
    (_pid,'SLT-SLT','Slate','{"colour":"Slate"}',10);
  insert into public.product_images (product_id, url, alt_text, sort_order) values
    (_pid, _imgs[2], 'Stonewashed linen throw folded at the foot of a bed', 0);

  -- 3. Hand-thrown Ceramic Vase — FEATURED
  insert into public.products (slug, name, description, category_id, base_price_cents, is_featured, tags, created_at) values ('to-ceramic-vase','Hand-thrown Ceramic Vase','Hand-thrown with a matte glaze. Each piece has its own quiet imperfection — the small ridge where the potter''s hand paused.', _home, 44900, true, '{ceramic,vase,minimalist,gift}', _now - interval '3 hours') returning id into _pid;
  insert into public.product_variants (product_id, sku, name, options, stock) values
    (_pid,'HCV-CRM','Cream','{"colour":"Cream"}',12);
  insert into public.product_images (product_id, url, alt_text, sort_order) values
    (_pid, _imgs[3], 'Matte cream ceramic vase holding a single eucalyptus stem', 0),
    (_pid, _imgs[5], 'Ceramic vase on a sunlit shelf',                           1);

  -- 4. Soy Wax Scented Candle
  insert into public.products (slug, name, description, category_id, base_price_cents, tags, created_at) values ('to-soy-candle','Soy Wax Scented Candle','Poured from a clean soy-coconut wax blend. Scented, not perfumed. 40-hour burn in a reusable glass vessel.', _home, 24900, '{candle,soy,home,scented}', _now - interval '1 day') returning id into _pid;
  insert into public.product_variants (product_id, sku, name, options, stock) values
    (_pid,'SC-FIG','Wild Fig','{"scent":"Wild Fig"}',20),
    (_pid,'SC-VAN','Vanilla Cedar','{"scent":"Vanilla Cedar"}',18),
    (_pid,'SC-ROS','Rose Garden','{"scent":"Rose Garden"}',15);
  insert into public.product_images (product_id, url, alt_text, sort_order) values
    (_pid, _imgs[4], 'Glass soy candle with a wooden wick in soft afternoon light', 0),
    (_pid, _imgs[6], 'Three scented candles lined up on a marble shelf',            1);

  -- 5. Hand-glazed Ceramic Mug Set — DISCOUNT (R299 → R389)
  insert into public.products (slug, name, description, category_id, base_price_cents, compare_at_cents, tags, created_at) values ('to-mug-set','Hand-glazed Ceramic Mug Set','Glazed by hand in small batches. Slightly uneven rims, fully watertight, made for unhurried mornings. Sold as a pair.', _home, 29900, 38900, '{ceramic,mug,kitchen,morning}', _now - interval '8 hours') returning id into _pid;
  insert into public.product_variants (product_id, sku, name, options, stock) values
    (_pid,'HCMS-CRM','Cream / Pair','{"colour":"Cream","set":"Pair"}',16),
    (_pid,'HCMS-SLT','Slate / Pair','{"colour":"Slate","set":"Pair"}',12);
  insert into public.product_images (product_id, url, alt_text, sort_order) values
    (_pid, _imgs[22], 'Pair of hand-glazed ceramic mugs on a wooden shelf', 0),
    (_pid, _imgs[7],  'Mug detail showing the soft glaze',                  1);

  -- 6. Walnut Serving Tray
  insert into public.products (slug, name, description, category_id, base_price_cents, tags, created_at) values ('to-walnut-tray','Walnut Serving Tray','Solid walnut with a hand-rubbed oil finish. Looks right on a bed, ottoman, or bathroom counter.', _home, 54900, '{walnut,tray,serving,wood}', _now - interval '2 days') returning id into _pid;
  insert into public.product_variants (product_id, sku, name, options, stock) values
    (_pid,'WST-STD','Standard 40cm','{"size":"Standard 40cm"}',9);
  insert into public.product_images (product_id, url, alt_text, sort_order) values
    (_pid, _imgs[25], 'Solid walnut serving tray with brass handles on a marble counter', 0);

  -- 7. Hand-woven Jute Area Rug
  insert into public.products (slug, name, description, category_id, base_price_cents, tags, created_at) values ('to-jute-rug','Hand-woven Jute Area Rug','Hand-woven from natural jute with a tight, flat weave. Anchors a room without competing with the rest of it.', _home, 119900, '{jute,rug,natural,floor}', _now - interval '6 hours') returning id into _pid;
  insert into public.product_variants (product_id, sku, name, options, stock) values
    (_pid,'HJR-160','160x230cm','{"size":"160x230cm"}',7),
    (_pid,'HJR-200','200x300cm','{"size":"200x300cm"}',5);
  insert into public.product_images (product_id, url, alt_text, sort_order) values
    (_pid, _imgs[5], 'Hand-woven jute rug in a sunlit living room', 0);

  -- 8. Glass Reed Diffuser
  insert into public.products (slug, name, description, category_id, base_price_cents, tags, created_at) values ('to-reed-diffuser','Glass Reed Diffuser','A glass vessel with rattan reeds. Quiet, room-filling scent for the corner you actually sit in. Lasts 8–12 weeks.', _home, 29900, '{diffuser,scented,home,gift}', _now - interval '4 hours') returning id into _pid;
  insert into public.product_variants (product_id, sku, name, options, stock) values
    (_pid,'GRD-FIG','Wild Fig','{"scent":"Wild Fig"}',22),
    (_pid,'GRD-VAN','Vanilla Cedar','{"scent":"Vanilla Cedar"}',18),
    (_pid,'GRD-ROS','Rose Garden','{"scent":"Rose Garden"}',15);
  insert into public.product_images (product_id, url, alt_text, sort_order) values
    (_pid, _imgs[8],  'Glass reed diffuser with rattan sticks on a marble shelf', 0),
    (_pid, _imgs[23], 'Diffuser styled on a wooden console',                     1);

  -- 9. Velvet Curtain Panel
  insert into public.products (slug, name, description, category_id, base_price_cents, tags, created_at) values ('to-velvet-curtain','Velvet Curtain Panel','Heavy cotton velvet with a soft drape. Falls in long, quiet folds that hold a room together. 140x220cm, eyelet top.', _home, 79900, '{velvet,curtain,living room,drape}', _now - interval '1 day') returning id into _pid;
  insert into public.product_variants (product_id, sku, name, options, stock) values
    (_pid,'VCP-IVR','Ivory','{"colour":"Ivory"}',12),
    (_pid,'VCP-SLT','Slate','{"colour":"Slate"}',9);
  insert into public.product_images (product_id, url, alt_text, sort_order) values
    (_pid, _imgs[27], 'Heavy velvet curtain panel in soft ivory hanging from a brass rod', 0);

  -- 10. Marble Coaster Set — DISCOUNT (R249 → R319)
  insert into public.products (slug, name, description, category_id, base_price_cents, compare_at_cents, tags, created_at) values ('to-marble-coasters','Marble Coaster Set','Solid marble, lightly honed. Each one is a little different — that''s the point. Set of four with cork backing.', _home, 24900, 31900, '{marble,coasters,kitchen,gift}', _now - interval '10 hours') returning id into _pid;
  insert into public.product_variants (product_id, sku, name, options, stock) values
    (_pid,'MCS-4SET','Set of 4','{"set":"Set of 4"}',18);
  insert into public.product_images (product_id, url, alt_text, sort_order) values
    (_pid, _imgs[26], 'Set of four honed marble coasters in neutral tones', 0),
    (_pid, _imgs[20], 'Marble coasters holding a glass of red wine',         1);

  -- ===================================================================
  -- WOMEN'S FASHION (10 products)
  -- ===================================================================

  -- 11. Linen Wrap Midi Dress — DISCOUNT (R699 → R899)
  insert into public.products (slug, name, description, category_id, base_price_cents, compare_at_cents, tags, created_at) values ('to-wrap-midi-dress','Linen Wrap Midi Dress','Cut from breathable European linen with a relaxed drape. The kind of dress that goes from breakfast to evening with a shoe swap.', _wf, 69900, 89900, '{linen,dress,midi,summer}', _now - interval '2 hours') returning id into _pid;
  insert into public.product_variants (product_id, sku, name, options, stock) values
    (_pid,'LWD-XS','XS','{"size":"XS"}',8),
    (_pid,'LWD-S', 'S', '{"size":"S"}', 12),
    (_pid,'LWD-M', 'M', '{"size":"M"}', 15),
    (_pid,'LWD-L', 'L', '{"size":"L"}', 10),
    (_pid,'LWD-XL','XL','{"size":"XL"}',6);
  insert into public.product_images (product_id, url, alt_text, sort_order) values
    (_pid, _imgs[11], 'Linen wrap midi dress in natural tone, modeled outdoors', 0),
    (_pid, _imgs[12], 'Midi dress flat-lay with a woven tote',                   1);

  -- 12. Silk-blend Blouse — FEATURED
  insert into public.products (slug, name, description, category_id, base_price_cents, is_featured, tags, created_at) values ('to-silk-blouse','Silk-blend Blouse','Silk-blend with a soft, weighty hand. Designed to be tucked, half-tucked, or left alone.', _wf, 64900, true, '{silk,blouse,workwear,gift}', _now - interval '6 hours') returning id into _pid;
  insert into public.product_variants (product_id, sku, name, options, stock) values
    (_pid,'SBB-BLS-S','Blush / S','{"colour":"Blush","size":"S"}',10),
    (_pid,'SBB-BLS-M','Blush / M','{"colour":"Blush","size":"M"}',14),
    (_pid,'SBB-BLS-L','Blush / L','{"colour":"Blush","size":"L"}',9),
    (_pid,'SBB-SGE-S','Sage / S', '{"colour":"Sage","size":"S"}', 8),
    (_pid,'SBB-SGE-M','Sage / M', '{"colour":"Sage","size":"M"}', 12),
    (_pid,'SBB-SGE-L','Sage / L', '{"colour":"Sage","size":"L"}', 7),
    (_pid,'SBB-IVR-S','Ivory / S','{"colour":"Ivory","size":"S"}',9),
    (_pid,'SBB-IVR-M','Ivory / M','{"colour":"Ivory","size":"M"}',12),
    (_pid,'SBB-IVR-L','Ivory / L','{"colour":"Ivory","size":"L"}',6);
  insert into public.product_images (product_id, url, alt_text, sort_order) values
    (_pid, _imgs[12], 'Silk-blend blouse in blush, photographed on a hanger', 0),
    (_pid, _imgs[13], 'Blouse styled with tailored trousers',                1);

  -- 13. Wide-leg Trouser
  insert into public.products (slug, name, description, category_id, base_price_cents, tags, created_at) values ('to-wide-leg-trouser','Wide-leg Trouser','A clean high-rise with a fluid leg. Sits where it should and stays there through the day.', _wf, 89900, '{trouser,wide-leg,workwear,linen}', _now - interval '1 day') returning id into _pid;
  insert into public.product_variants (product_id, sku, name, options, stock) values
    (_pid,'WLT-XS','XS','{"size":"XS"}',8),
    (_pid,'WLT-S', 'S', '{"size":"S"}', 11),
    (_pid,'WLT-M', 'M', '{"size":"M"}', 14),
    (_pid,'WLT-L', 'L', '{"size":"L"}', 9),
    (_pid,'WLT-XL','XL','{"size":"XL"}',6);
  insert into public.product_images (product_id, url, alt_text, sort_order) values
    (_pid, _imgs[14], 'High-rise wide-leg trouser in oat, modeled',       0),
    (_pid, _imgs[13], 'Wide-leg trouser styled with a tucked shirt',      1);

  -- 14. Cashmere-blend Knit Cardigan — DISCOUNT (R999 → R1299)
  insert into public.products (slug, name, description, category_id, base_price_cents, compare_at_cents, tags, created_at) values ('to-knit-cardigan','Cashmere-blend Knit Cardigan','Soft cashmere blend with ribbed cuffs and a relaxed boxy fit. The one you reach for by October.', _wf, 99900, 129900, '{cashmere,cardigan,knit,winter}', _now - interval '12 hours') returning id into _pid;
  insert into public.product_variants (product_id, sku, name, options, stock) values
    (_pid,'CKC-OAT-XS','Oatmeal / XS','{"colour":"Oatmeal","size":"XS"}',6),
    (_pid,'CKC-OAT-S', 'Oatmeal / S', '{"colour":"Oatmeal","size":"S"}', 10),
    (_pid,'CKC-OAT-M', 'Oatmeal / M', '{"colour":"Oatmeal","size":"M"}', 12),
    (_pid,'CKC-OAT-L', 'Oatmeal / L', '{"colour":"Oatmeal","size":"L"}', 8),
    (_pid,'CKC-OAT-XL','Oatmeal / XL','{"colour":"Oatmeal","size":"XL"}',5),
    (_pid,'CKC-SLT-S', 'Slate / S',   '{"colour":"Slate","size":"S"}',   7),
    (_pid,'CKC-SLT-M', 'Slate / M',   '{"colour":"Slate","size":"M"}',   9),
    (_pid,'CKC-SLT-L', 'Slate / L',   '{"colour":"Slate","size":"L"}',   6),
    (_pid,'CKC-BLK-S', 'Black / S',   '{"colour":"Black","size":"S"}',   8),
    (_pid,'CKC-BLK-M', 'Black / M',   '{"colour":"Black","size":"M"}',   10),
    (_pid,'CKC-BLK-L', 'Black / L',   '{"colour":"Black","size":"L"}',   7);
  insert into public.product_images (product_id, url, alt_text, sort_order) values
    (_pid, _imgs[15], 'Boxy cashmere-blend cardigan in oatmeal, modeled', 0);

  -- 15. Leather Slide Sandal
  insert into public.products (slug, name, description, category_id, base_price_cents, tags, created_at) values ('to-summer-sandal','Leather Slide Sandal','Vegetable-tanned leather with a moulded footbed. Slides on, stays on, walks quiet.', _wf, 54900, '{leather,sandal,summer,slide}', _now - interval '3 hours') returning id into _pid;
  insert into public.product_variants (product_id, sku, name, options, stock) values
    (_pid,'LSS-TAN-5','Tan / UK 5','{"colour":"Tan","size":"UK 5"}', 9),
    (_pid,'LSS-TAN-6','Tan / UK 6','{"colour":"Tan","size":"UK 6"}', 12),
    (_pid,'LSS-TAN-7','Tan / UK 7','{"colour":"Tan","size":"UK 7"}', 15),
    (_pid,'LSS-TAN-8','Tan / UK 8','{"colour":"Tan","size":"UK 8"}', 10),
    (_pid,'LSS-BLK-5','Black / UK 5','{"colour":"Black","size":"UK 5"}',7),
    (_pid,'LSS-BLK-6','Black / UK 6','{"colour":"Black","size":"UK 6"}',11),
    (_pid,'LSS-BLK-7','Black / UK 7','{"colour":"Black","size":"UK 7"}',13),
    (_pid,'LSS-BLK-8','Black / UK 8','{"colour":"Black","size":"UK 8"}',8);
  insert into public.product_images (product_id, url, alt_text, sort_order) values
    (_pid, _imgs[16], 'Leather slide sandal in tan on a stone surface', 0),
    (_pid, _imgs[17], 'Black leather slide sandal detail',             1);

  -- 16. Canvas Market Tote
  insert into public.products (slug, name, description, category_id, base_price_cents, tags, created_at) values ('to-canvas-tote','Canvas Market Tote','Heavyweight canvas with reinforced handles. Big enough for a laptop and a folded jumper. Gets softer the more you carry it.', _wf, 34900, '{canvas,tote,bag,everyday}', _now - interval '4 days') returning id into _pid;
  insert into public.product_variants (product_id, sku, name, options, stock) values
    (_pid,'CMT-NAT','Natural','{"colour":"Natural"}',25),
    (_pid,'CMT-BLK','Black', '{"colour":"Black"}',  20),
    (_pid,'CMT-OLV','Olive', '{"colour":"Olive"}',  15);
  insert into public.product_images (product_id, url, alt_text, sort_order) values
    (_pid, _imgs[18], 'Heavy canvas market tote with leather handles, photographed flat', 0);

  -- 17. Pleated Midi Skirt
  insert into public.products (slug, name, description, category_id, base_price_cents, tags, created_at) values ('to-pleated-skirt','Pleated Midi Skirt','Sunray pleats that move when you do. Midi length, elasticated back waist, no zip in sight.', _wf, 59900, '{pleated,skirt,midi,flowing}', _now - interval '18 hours') returning id into _pid;
  insert into public.product_variants (product_id, sku, name, options, stock) values
    (_pid,'PMS-XS','XS','{"size":"XS"}',8),
    (_pid,'PMS-S', 'S', '{"size":"S"}', 11),
    (_pid,'PMS-M', 'M', '{"size":"M"}', 14),
    (_pid,'PMS-L', 'L', '{"size":"L"}', 9),
    (_pid,'PMS-XL','XL','{"size":"XL"}',6);
  insert into public.product_images (product_id, url, alt_text, sort_order) values
    (_pid, _imgs[13], 'Pleated midi skirt in soft sage, photographed on a hanger', 0);

  -- 18. Cropped Denim Jacket — FEATURED
  insert into public.products (slug, name, description, category_id, base_price_cents, is_featured, tags, created_at) values ('to-denim-jacket','Cropped Denim Jacket','Cropped, clean, broken-in from the first wear. Heavy enough to feel like denim, soft enough to forget about.', _wf, 89900, true, '{denim,jacket,cropped,classic}', _now - interval '9 hours') returning id into _pid;
  insert into public.product_variants (product_id, sku, name, options, stock) values
    (_pid,'CDJ-XS','XS','{"size":"XS"}',7),
    (_pid,'CDJ-S', 'S', '{"size":"S"}', 10),
    (_pid,'CDJ-M', 'M', '{"size":"M"}', 13),
    (_pid,'CDJ-L', 'L', '{"size":"L"}', 9),
    (_pid,'CDJ-XL','XL','{"size":"XL"}',6);
  insert into public.product_images (product_id, url, alt_text, sort_order) values
    (_pid, _imgs[24], 'Cropped denim jacket in vintage wash, modeled', 0),
    (_pid, _imgs[14], 'Denim jacket styled with wide-leg trousers',    1);

  -- 19. Long Cashmere Scarf
  insert into public.products (slug, name, description, category_id, base_price_cents, tags, created_at) values ('to-cashmere-scarf','Long Cashmere Scarf','Long, fine-gauge cashmere. Wear it long, doubled, or loosely knotted — it never looks like it''s trying.', _wf, 79900, '{cashmere,scarf,winter,gift}', _now - interval '2 days') returning id into _pid;
  insert into public.product_variants (product_id, sku, name, options, stock) values
    (_pid,'LCS-OAT','Oatmeal',  '{"colour":"Oatmeal"}',   15),
    (_pid,'LCS-GRY','Soft Grey','{"colour":"Soft Grey"}', 12),
    (_pid,'LCS-BLK','Black',    '{"colour":"Black"}',     10);
  insert into public.product_images (product_id, url, alt_text, sort_order) values
    (_pid, _imgs[21], 'Long cashmere scarf in soft grey, draped on a wooden chair', 0),
    (_pid, _imgs[19], 'Cashmere scarf styled with a wool coat',                      1);

  -- 20. Linen Blazer — DISCOUNT (R1199 → R1549)
  insert into public.products (slug, name, description, category_id, base_price_cents, compare_at_cents, tags, created_at) values ('to-linen-blazer','Linen Blazer','A relaxed single-breasted blazer in soft Italian linen. The kind that earns its place on the back of a chair.', _wf, 119900, 154900, '{linen,blazer,workwear,summer}', _now - interval '14 hours') returning id into _pid;
  insert into public.product_variants (product_id, sku, name, options, stock) values
    (_pid,'LBL-XS','XS','{"size":"XS"}',5),
    (_pid,'LBL-S', 'S', '{"size":"S"}', 9),
    (_pid,'LBL-M', 'M', '{"size":"M"}', 11),
    (_pid,'LBL-L', 'L', '{"size":"L"}', 7),
    (_pid,'LBL-XL','XL','{"size":"XL"}',5);
  insert into public.product_images (product_id, url, alt_text, sort_order) values
    (_pid, _imgs[12], 'Relaxed single-breasted linen blazer in oat, modeled', 0),
    (_pid, _imgs[11], 'Linen blazer styled over a midi dress',                1);

end;
$$;
