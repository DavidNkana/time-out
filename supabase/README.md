# Supabase — Timeout

This folder contains SQL **scaffolding only**. It is here to make spinning up a fresh Timeout Supabase project quicker.

**Do not reuse credentials or project refs from the previous project this repo was bootstrapped from.**

## Before running migrations

1. **Create a fresh Supabase project** at https://supabase.com — pick a region near your users.
2. **Update `config.toml`**:
   - Set `project_id = "timeout"` (or your project's slug).
   - Set `site_url` in `[auth]` to your real deployed Timeout URL.
3. **Copy the env template** to your hosting provider (and to `.env.local` for dev):
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY` — server-only, never expose.

## Running the migrations

From the project root:

```bash
supabase link --project-ref <your-project-ref>
supabase db push
```

Or run them manually via the Supabase dashboard SQL editor, in numerical order.

## Post-migration checklist

- [ ] Add Storage buckets (e.g. product images) and RLS policies — see `migrations/003_product_images_storage.sql` for the pattern.
- [ ] Add your admin user UUID(s) to `public.admins`.
- [ ] Update the seed data (`migrations/002_seed_categories.sql`, `010_seed_better_products.sql`, `011_seed_30_products.sql`) — these are sample seeds inherited from the bootstrap project. Replace with Timeout-specific seed data, including a neutral default for the `brand` text column and a real-looking internal review email.
- [ ] Wire up auth providers (email, Google, etc.) in Supabase Auth settings.
- [ ] Wire up email templates in Supabase Auth → Templates (replace any leftover brand strings in the templates).
- [ ] If you use push notifications, set up FCM and drop `google-services.json` into `android/app/`.

## What was renamed during bootstrap

- `brand` text column default updated from the bootstrap project's brand string to `'Timeout'`.
- Seed review email namespace updated to `*.timeout.internal`.
- File-header comments updated to refer to Timeout.

The actual schema (tables, columns, RLS policies, indexes, storage setup) is structural and was kept as-is so the scaffold is useful. Review every migration before running it against a real project.
