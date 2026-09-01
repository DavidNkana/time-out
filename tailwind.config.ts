import type { Config } from 'tailwindcss';
import { brand } from './lib/brand';

/**
 * Brand palette sourced from /lib/brand.ts.
 * brand-* stays neutral/warm slate. accent-* is the Timeout primary (`#5B8DEF`).
 *
 * Rename `brand-*` or `accent-*` here whenever you want — search the
 * codebase for those class prefixes.
 */
const { colors } = (() => {
  const hex = (s: string) => s.replace('#', '');
  const tint = (pct: number) => `color-mix(in srgb, ${brand.colors.primary} ${pct}%, white)`;
  const shade = (pct: number) => `color-mix(in srgb, ${brand.colors.primary} ${pct}%, black)`;
  void hex; void tint; void shade;
  return { colors: null as any };
})();

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Neutral base (kept stable — used for chrome)
        brand: {
          50:  '#f4f6f7',
          100: '#e6eaed',
          200: '#c9d2d8',
          300: '#a3b1bb',
          400: '#788a98',
          500: '#566c7d',
          600: '#42566a',
          700: '#374657',
          800: '#2f3a48',
          900: '#29313c',
          950: '#1a1f26'
        },
        // Timeout primary (`#5B8DEF`) — used for CTAs, badges, links
        accent: {
          50:  '#eef4ff',
          100: '#dde9ff',
          200: '#b8d1ff',
          300: '#93baff',
          400: '#6e9ff7',
          500: '#5B8DEF',  // primary
          600: '#4671d3',
          700: '#3a5db4',
          800: '#314d94',
          900: '#283c75',
          950: '#1a2755'
        },
        // Semantic
        success: '#16a34a',
        warning: '#f59e0b',
        danger:  '#dc2626',
        info:    '#2563eb'
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif']
      },
      borderRadius: {
        sm: '4px',
        DEFAULT: '6px',
        md: '8px',
        lg: '12px',
        xl: '16px'
      }
    }
  },
  plugins: []
};

export default config;
