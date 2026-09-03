import { ImageResponse } from 'next/og';
import { getProductBySlug } from '@/lib/catalog/queries';
import { brand } from '@/lib/brand';

export const runtime = 'nodejs';
export const alt = `${brand.name} — product`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/**
 * Dynamic OG image for a product. Generated at /p/[slug]/opengraph-image.
 * Falls back to /opengraph-image if the image isn't there.
 */
export default async function OpengraphImage({
  params,
}: {
  params: { slug: string };
}) {
  const product = await getProductBySlug(params.slug);
  if (!product) {
    return new ImageResponse(
      (
        <div
          style={{
            background: brand.colors.dark,
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: brand.colors.bg,
            fontSize: 48,
            fontWeight: 700,
          }}
        >
          {brand.name} — {brand.tagline}
        </div>
      ),
      { ...size }
    );
  }

  const priceCents = product.variants[0]?.price_cents ?? 0;
  const price = `${(priceCents / 100).toFixed(2)}`;
  const image = product.images[0]?.url;
  const accent = brand.colors.primary;

  return new ImageResponse(
    (
      <div
        style={{
          background: brand.colors.dark,
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'row',
          color: brand.colors.bg,
          fontFamily: 'sans-serif',
        }}
      >
        {/* Left: image */}
        <div
          style={{
            width: 630,
            height: 630,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: brand.colors.bg,
          }}
        >
          {image ? (
            <img
              src={image}
              alt={product.name}
              width={630}
              height={630}
              style={{ objectFit: 'cover' }}
            />
          ) : (
            <div style={{ fontSize: 24, color: brand.colors.dark, fontWeight: 700 }}>{brand.name}</div>
          )}
        </div>

        {/* Right: text */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: 50,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
            <div
              style={{
                width: 32,
                height: 32,
                background: accent,
                borderRadius: 6,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 20,
                fontWeight: 700,
                color: brand.colors.bg,
              }}
            >
              {brand.name.charAt(0).toUpperCase()}
            </div>
            <span style={{ fontSize: 18, fontWeight: 600, color: '#cbd5e1' }}>{brand.name}</span>
          </div>
          <div style={{ fontSize: 22, color: '#94a3b8', marginBottom: 8 }}>
            {product.category?.name ?? 'Item'}
          </div>
          <div style={{ fontSize: 56, fontWeight: 700, lineHeight: 1.05, marginBottom: 24 }}>
            {product.name}
          </div>
          <div style={{ fontSize: 64, fontWeight: 800, color: accent, marginBottom: 24 }}>
            {price}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
