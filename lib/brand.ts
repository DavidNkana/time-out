/**
 * CENTRAL BRAND CONFIG
 *
 * Every brand-touched string, color, file path, and copy block lives here
 * so rebrands = one-file edits, not find-and-replace through the codebase.
 *
 * Timeout — bootstrapped fresh. No storefront, suppliers, or physical address
 * baked in. Before shipping for real, replace the placeholder contact details
 * with the Timeout-specific ones.
 */

export const brand = {
  // Identity
  name: 'Timeout',
  short: 'Timeout',
  legalName: 'Timeout',
  tagline: 'Wear the moment.',
  shortDescription:
    'A considered edit of womenswear, accessories, and everyday pieces for the way you move.',
  founded: new Date().getFullYear(),

  // Colors — Timeout defaults. Tweak freely; brand-* stays a warm soft grey
  // neutral, accent-* is the Timeout pink (soft rose). Semantic feedback
  // colors (success/warning/danger/info) live in tailwind.config.ts and
  // are intentionally NOT brand-driven.
  colors: {
    primary: '#E8A0AE',     // soft rose — CTAs, links, brand accents
    accent: '#F0B7C1',      // lighter hover / soft fills
    dark: '#16150F',        // headings on white (warm near-black)
    text: '#16150F',        // body
    muted: '#706B62',       // subtle text (warm mid-grey)
    border: '#E8E5E0',      // borders (warm light grey)
    bg: '#FFFFFF',          // page background
    bgAlt: '#FBE9EE',       // soft pink tint for highlight surfaces (accent-50)
    bgMuted: '#FAF6F4',     // warm off-white (brand-50 equivalent)
  },

  // Files (paths are relative to /public so usable in <img src> or CSS url())
  logo: '/olia-logo.png',
  favicon: '/olia-app-icon.jpg',
  ogDefault: '/olia-logo.png', // paired with opengraph-image.tsx

  // Contact — Olia (Time-Out Home and Style)
  contact: {
    address: {
      line1: '',
      line2: '',
      country: '',
    },
    phone: '+27 76 895 2322',
    whatsapp: '+27 76 895 2322',
    whatsappLink: 'https://wa.me/27768952322',
    email: 'chaukeolia78@gmail.com',
    hours: '',
  },

  // Socials — leave blank until Timeout picks its actual channels.
  social: {
    facebook: '',
    facebookShare: '',
    twitter: '',
    twitterHandle: '',
    whatsappShare: '',
    email: 'mailto:chaukeolia78@gmail.com',
    website: '',
  },

  // URLs used in OG/canonical/legal — environment-overridable.
  // Defaults are the deployment URL. Set NEXT_PUBLIC_SITE_URL in your
  // hosting provider (e.g. Vercel) to point this at the real Timeout site.
  get siteUrl() {
    return (process.env.NEXT_PUBLIC_SITE_URL || 'https://timeout.example.com').replace(/\/+$/, '');
  },

  // Email subjects (handover to Resend)
  email: {
    fromName: 'Timeout',
    // from address comes from RESEND_FROM_EMAIL env
    replyTo: 'chaukeolia78@gmail.com',
    orderConfirmationSubject: 'Your Timeout order is confirmed',
    orderShippedSubject: 'Your order is on its way',
    newsletterWelcomeSubject: 'Welcome to Timeout',
    returnUpdateSubject: 'Update on your return',
  },

  // Legal
  privacyOfficer: 'Timeout',
  copyrightLine: '© {year} Timeout. All rights reserved.',
  whatsappStoreLink: '',

  // Home hero copy.
  home: {
    eyebrow: 'The new edit',
    headline: 'Dress for the life you want.',
    subheadline: 'Quiet luxury, easy layers, and pieces that move with your day.',
    primaryCta: { href: '/c/womens-fashion', label: 'Explore womenswear' },
    secondaryCta: { href: '/new', label: 'See what is new' },
  },

  // About page copy — placeholder
  about: {
    intro:
      'Timeout is a considered edit for getting dressed with less noise and more instinct.',
    founded: new Date().getFullYear(),
    mission:
      'We look for the pieces that earn their place: easy to wear, easy to style, and made for real days.',
  },
} as const;

export type Brand = typeof brand;
