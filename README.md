# Timeout

**Status:** Fresh project — bootstrapped and ready to build.

Timeout is a calm, focused app. It runs as a web app, an iOS App Store app, and a Google Play Store app — all from **one Next.js codebase wrapped with Capacitor**.

> **Scaffolding note** — Timeout was bootstrapped from a similar Capacitor + Next.js base. The native shells (`ios/`, `android/`), Supabase migrations under `supabase/migrations/`, and the central brand config in `lib/brand.ts` are all in place, but every line of business copy, contact detail, and product data is a placeholder. Replace it before shipping for real.

---

## Table of contents

1. [Stack](#stack)
2. [Quick start](#quick-start)
3. [Project layout](#project-layout)
4. [Environment variables](#environment-variables)
5. [Scripts](#scripts)
6. [Capacitor (native shells)](#capacitor-native-shells)
7. [Supabase](#supabase)
8. [Deploying](#deploying)
9. [Replacing scaffolding](#replacing-scaffolding)

---

## Stack

- **Web** — Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS
- **Auth + DB + Storage** — Supabase (Postgres, RLS, Auth, Storage)
- **Native** — Capacitor 6 (iOS + Android), single webview shells pointing at the deployed site
- **State** — Zustand for client stores (cart, wishlist, recent items)
- **Payments + couriers + email** — scaffolded but optional; wire them up only when Timeout needs them

## Quick start

```bash
# 1. Install deps
npm install

# 2. Copy the env template and fill in the values you need
cp .env.example .env.local

# 3. Start the web app
npm run dev
# → http://localhost:3000

# 4. Type-check + lint
npm run typecheck
npm run lint
```

For native development you also need Xcode (macOS) and/or Android Studio. See `docs/CAPACITOR_SETUP.md`.

## Project layout

```
.
├── app/                    Next.js App Router pages + API routes
│   ├── api/                server routes (cart sync, test-email, etc.)
│   ├── account/            signed-in user pages
│   ├── admin/              single-admin console
│   ├── legal/              privacy, terms, returns, shipping
│   └── ...                 marketing, shop, auth, etc.
├── components/             reusable UI (shop, ui, layout, marketing, ...)
├── lib/                    domain code + brand config
│   ├── brand.ts            CENTRAL brand config — change this to rebrand
│   ├── cart/               cart logic + zustand store
│   ├── catalog/            product/category queries
│   ├── supabase/           Supabase clients (client, server, middleware, admin)
│   └── ...
├── public/                 static assets (brand/, icons, manifest, offline.html)
├── supabase/
│   ├── migrations/         SQL migrations (scaffolded, see Supabase section)
│   └── README.md           how to point this folder at a fresh Timeout project
├── ios/                    Capacitor iOS shell (Xcode project)
├── android/                Capacitor Android shell (Gradle project)
├── capacitor.config.ts     app IDs, server URL, plugin config
├── middleware.ts           Supabase session refresh
├── next.config.mjs         Next config
└── tailwind.config.ts      brand palette + accent colours
```

## Environment variables

All real secrets live in `.env.local` (never committed). The template is in `.env.example`.

| Variable | Purpose | Required for |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Public Supabase project URL | web, native |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public anon key | web, native |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-only key — admin ops, webhooks | server routes |
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL (OG, sitemap) | web, native deep links |
| `NEXT_PUBLIC_APP_NAME` | Display name override | optional |
| `NEXT_PUBLIC_SUPPORT_EMAIL` | Public support email | optional |
| `PAYFAST_*`, `YOCO_*`, `OZOW_*` | Payment gateways (when wired up) | optional |
| `PARGO_*`, `THE_COURIER_GUY_*`, `DAWN_WING_*` | Couriers (when wired up) | optional |
| `RESEND_API_KEY`, `RESEND_FROM_EMAIL` | Transactional email | optional |
| `NEXT_PUBLIC_POSTHOG_*` | Analytics | optional |
| `FCM_SERVER_KEY`, `APNS_*` | Push notifications | optional |

`.env*` (other than `.env.example`) is ignored by git.

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Next.js dev server on `:3000` |
| `npm run build` | Production Next.js build |
| `npm run start` | Run production build |
| `npm run lint` | Next.js ESLint |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run cap:sync` | `cap sync` — copy web assets into native shells |
| `npm run cap:open:android` | Open Android Studio |
| `npm run cap:open:ios` | Open Xcode |
| `npm run cap:build:android` | Build web, then `cap sync android` |
| `npm run cap:build:ios` | Build web, then `cap sync ios` |

## Capacitor (native shells)

- **App ID**: `com.timeout.app` (iOS + Android)
- **Display name**: `Timeout`
- **Server URL**: `https://timeout.example.com` (overridable — set `NEXT_PUBLIC_SITE_URL` when you wire a real domain; for local testing use `http://10.0.2.2:3000` on Android or `http://localhost:3000` on iOS sim)
- **Deep links**: `https://<your-domain>/*` + `timeout://app/*`

Setup, signing, and store submission: see [`docs/CAPACITOR_SETUP.md`](./docs/CAPACITOR_SETUP.md).

## Supabase

The `supabase/migrations/` folder ships as scaffolding only. **Do not** reuse any credentials from the project this repo was bootstrapped from.

To point Timeout at a fresh Supabase project:

1. Create the project at https://supabase.com
2. Edit `supabase/config.toml` and update `project_id`
3. Run the migrations in order from `supabase/migrations/`
4. Set the env vars in your hosting provider (and `.env.local` for dev)
5. Add Storage buckets + RLS as needed

See [`supabase/README.md`](./supabase/README.md) for the full handoff checklist.

## Deploying

The web app is a standard Next.js 14 app — it deploys unchanged to Vercel, Netlify, Fly, a Docker host, or anywhere with Node 18+.

The native apps point at the deployed site via `capacitor.config.ts`, so updating the web app does not require a new store release. You only need to cut a new store release when:

- `capacitor.config.ts` itself changes (app IDs, server URL, plugin settings)
- Native-side assets change (icons, splash, `Info.plist`, `AndroidManifest.xml`, signing config)
- A new Capacitor plugin is added

## Replacing scaffolding

Before shipping for real, replace:

- **Brand** — `lib/brand.ts`, `public/site.webmanifest`, `public/brand/*` (icons, logo, splash)
- **App icons** — `ios/App/App/Assets.xcassets/AppIcon.appiconset/AppIcon-512@2x.png` and `android/app/src/main/res/mipmap-*/ic_launcher*.png`
- **Splash screens** — `ios/App/App/Assets.xcassets/Splash.imageset/*` and `android/app/src/main/res/drawable-*/splash.png`
- **Off-screen stored in zustand / localStorage** is namespaced under `timeout.*` and `timeout:*` — clean those up if you want a fresh start
- **Supabase data** — see the handoff checklist in `supabase/README.md`
- **Contact details in `lib/brand.ts`** — phone, WhatsApp, email, address, socials

---

## License

Private project. All rights reserved.
