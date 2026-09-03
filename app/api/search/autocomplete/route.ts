import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

/**
 * GET /api/search/autocomplete?q=<term>
 *
 * Public. Lightweight endpoint for the header search dropdown.
 * Returns up to 8 product hits + matching category suggestions + the storefront's
 * active categories as `popular` (used by the empty-query dropdown).
 *
 * No auth, no cookies, no image JOIN — just IDs and slugs the dropdown can render
 * with placeholder thumbnails. The full /search page fetches images + reviews.
 */
export async function GET(req: NextRequest) {
  const q = (req.nextUrl.searchParams.get('q') ?? '').trim();

  const supabase = await createClient();

  // Active categories that drive the empty-query "popular" list. Always loaded
  // (cheap) so the dropdown has a default set even before the user types.
  const { data: popular } = await supabase
    .from('categories')
    .select('id, slug, name')
    .eq('is_active', true)
    .order('sort_order', { ascending: true })
    .limit(6);

  if (!q || q.length < 2) {
    return NextResponse.json({
      products: [],
      categories: [],
      suggestions: [],
      popular: popular ?? [],
    });
  }

  // 1. Category suggestions first (cheap, always-show on PLP fallback)
  const { data: cats } = await supabase
    .from('categories')
    .select('id, slug, name')
    .or(`name.ilike.%${q}%,slug.ilike.%${q}%`)
    .limit(4);

  // 2. Product matches using the existing FTS index
  const { data: products } = await supabase
    .from('products')
    .select('id, slug, name, base_price_cents, compare_at_cents')
    .eq('is_active', true)
    .textSearch('search_tsv', q, { type: 'websearch', config: 'english' })
    .limit(8);

  const items = (products ?? []).map((p: any) => ({
    id: p.id,
    slug: p.slug,
    name: p.name,
    base_price_cents: p.base_price_cents,
    compare_at_cents: p.compare_at_cents ?? null,
    on_sale: p.compare_at_cents != null && p.compare_at_cents > p.base_price_cents,
  }));

  return NextResponse.json({
    products: items,
    categories: cats ?? [],
    suggestions: [], // reserved for future trending searches
    popular: [], // populated only when q is empty
  });
}