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
  tagline: 'Take a beat. Then go.',
  shortDescription:
    'Timeout is a calm, focused app for the everyday things worth slowing down for.',
  founded: new Date().getFullYear(),

  // Colors — Timeout defaults. Tweak freely; brand-* stays neutral, accent-* is the timeout color.
  colors: {
    primary: '#5B8DEF',     // calm blue
    accent: '#7AA1F2',      // lighter (hover)
    dark: '#1a1f26',       // headings on white
    text: '#1a1f26',       // body
    muted: '#64748b',      // subtle text
    border: '#e5e7eb',     // borders
    bg: '#ffffff',
    bgAlt: '#eef4ff',      // soft blue tint for highlights (50)
    bgMuted: '#f8fafc',    // brand-50 equivalent
  },

  // Files (paths are relative to /public so usable in <img src> or CSS url())
  logo: '/brand/logo.png',
  favicon: '/brand/favicon.png',
  ogDefault: '/brand/og-default.png', // paired with opengraph-image.tsx

  // Contact — placeholders only. Replace before shipping for real.
  contact: {
    address: {
      line1: '',
      line2: '',
      country: '',
    },
    phone: '',
    whatsapp: '',
    whatsappLink: '',
    email: 'hello@timeout.app',
    hours: '',
  },

  // Socials — leave blank until Timeout picks its actual channels.
  social: {
    facebook: '',
    facebookShare: '',
    twitter: '',
    twitterHandle: '',
    whatsappShare: '',
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
    replyTo: 'hello@timeout.app',
    orderConfirmationSubject: 'Your Timeout order is confirmed',
    orderShippedSubject: 'Your order is on its way',
    newsletterWelcomeSubject: 'Welcome to Timeout',
    returnUpdateSubject: 'Update on your return',
  },

  // Legal
  privacyOfficer: 'Timeout',
  copyrightLine: '© {year} Timeout. All rights reserved.',
  whatsappStoreLink: '',

  // Home hero copy — placeholder; replace when Timeout's voice lands.
  home: {
    eyebrow: '',
    headline: 'Welcome to Timeout',
    subheadline: '',
    primaryCta: { href: '/new', label: 'See what is new' },
    secondaryCta: { href: '/contact', label: 'Get in touch' },
  },

  // About page copy — placeholder
  about: {
    intro:
      'Timeout is a fresh project — built calmly, on purpose. Replace this copy once the story is written.',
    founded: new Date().getFullYear(),
    mission:
      'Replace this mission statement with what Timeout actually stands for.',
  },
} as const;

export type Brand = typeof brand;
