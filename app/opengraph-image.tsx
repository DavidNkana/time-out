import { ImageResponse } from 'next/og';
import { brand } from '@/lib/brand';

export const runtime = 'nodejs';
export const alt = `${brand.name} — ${brand.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#1a1f26',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'row',
          color: '#fff',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            width: 630,
            height: 630,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: brand.colors.primary,
            color: '#fff',
            fontSize: 320,
            fontWeight: 900,
          }}
        >
          {brand.name.charAt(0).toUpperCase()}
        </div>
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: 50,
          }}
        >
          <div style={{ fontSize: 18, color: '#cbd5e1', letterSpacing: 4, textTransform: 'uppercase', marginBottom: 8 }}>
            Welcome
          </div>
          <div style={{ fontSize: 64, fontWeight: 800, lineHeight: 1.0, marginBottom: 24 }}>
            {brand.name}
          </div>
          <div style={{ fontSize: 28, color: '#94a3b8', marginBottom: 32 }}>
            {brand.tagline}
          </div>
          <div style={{ fontSize: 22, color: '#cbd5e1' }}>
            {brand.shortDescription}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
