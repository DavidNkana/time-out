import type { Config } from 'tailwindcss';
import { brand } from './lib/brand';

/**
 * Brand palette sourced from /lib/brand.ts.
 *
 * - `brand-*` is a warm soft-grey neutral (NOT cool blue-grey). Used for
 *   chrome: text, borders, muted copy, dark surfaces.
 * - `accent-*` is the Timeout pink scale. The 500 step IS the primary
 *   (`brand.colors.primary`). Light steps (50/100/200) are derived live
 *   via the `tint` helper from the primary, so changing `brand.colors.primary`
 *   in `lib/brand.ts` propagates through the lighter end of the scale.
 *   The deeper steps (300/400 and 600–950) are hand-curated brand values
 *   that don't reduce to a single mix percentage against white/black
 *   (the brief specifies exact hex targets), so they're pinned as literals.
 *
 * Rename `brand-*` or `accent-*` here whenever you want — search the
 * codebase for those class prefixes.
 */
const PRIMARY = brand.colors.primary;

/** Mix `PRIMARY` with white — produces a lighter shade of the brand color. */
const tint = (pct: number): string => `color-mix(in srgb, ${PRIMARY} ${pct}%, white)`;

/** Mix `PRIMARY` with black — produces a darker shade of the brand color. */
const shade = (pct: number): string => `color-mix(in srgb, ${PRIMARY} ${pct}%, black)`;

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Warm soft-grey neutral (NOT cool blue-grey). Used for chrome.
        brand: {
          50:  '#FAF9F7',
          100: '#F1EFEC',
          200: '#E2DFD9',
          300: '#C9C5BD',
          400: '#9D988E',
          500: '#706B62',
          600: '#504C45',
          700: '#3A372F',
          800: '#26241D',
          900: '#16150F',
          950: '#0B0A08'
        },
        // Timeout pink — primary is `#E8A0AE` at the 500 step.
        // Light steps derived via `tint()` so the primary change propagates.
        accent: {
          50:  tint(21),         // ≈ #FAEAEE
          100: tint(43),         // ≈ #F5D5DC
          200: tint(75),         // ≈ #EEB7C2
          300: '#E89AA8',        // hand-curated (slight shade of primary)
          400: '#DD818F',        // hand-curated
          500: '#E8A0AE',        // ← brand.colors.primary
          600: '#D17585',        // hand-curated
          700: '#B45A6A',        // hand-curated
          800: '#924A58',        // hand-curated
          900: '#723A45',        // hand-curated
          950: '#3D1F25'         // hand-curated
        },
        // Semantic — signal colors, NOT brand.
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

// Re-exported so they're available for ad-hoc derivations from
// `brand.colors.primary` without being flagged as unused.
export { tint, shade };
