import { InfoHeader } from '@/components/ui/InfoHeader';

export const metadata = { title: 'Privacy Notice — Timeout' };

export default function PrivacyPage() {
  return (
    <>
      <InfoHeader title="Privacy Notice" />
      <main className="mx-auto max-w-3xl px-4 py-10 pb-20 safe-bottom prose prose-sm prose-headings:text-brand-950 prose-a:text-accent-700">
        <p className="text-sm text-brand-500">Scaffolding copy — replace before publishing. Last updated: {new Date().toISOString().slice(0, 10)}</p>

        <h1>Privacy Notice</h1>
        <p>
          This notice explains how Timeout (&ldquo;we&rdquo;, &ldquo;us&rdquo;) collects, uses, and protects personal
          information when you use our app or website. It is a placeholder — before
          publishing for real, replace every section below with copy that has been
          reviewed by counsel for the jurisdictions in which you operate.
        </p>

        <h2>1. Information We Collect</h2>
        <ul>
          <li><strong>Account:</strong> email, display name, password (hashed)</li>
          <li><strong>Usage:</strong> pages viewed, device type, app install ID</li>
          <li><strong>Optional:</strong> anything you choose to share in your profile or in messages to us</li>
        </ul>

        <h2>2. Why We Collect It</h2>
        <ul>
          <li>To provide the core feature you signed up for</li>
          <li>To send you service messages (confirmations, updates, security alerts)</li>
          <li>To improve the app and prevent abuse</li>
        </ul>

        <h2>3. How Long We Keep It</h2>
        <p>
          We keep your data for as long as your account is active, plus a short
          period after deletion for backup and audit purposes. You can request
          deletion at any time.
        </p>

        <h2>4. Who We Share It With</h2>
        <ul>
          <li><strong>Infrastructure providers</strong> — Supabase (database + auth), your hosting provider, your email provider</li>
          <li><strong>Analytics</strong> (optional) — PostHog or similar, only if you wire it up</li>
        </ul>
        <p>We do <strong>not</strong> sell your data to third parties.</p>

        <h2>5. Your Rights</h2>
        <ul>
          <li>Access — request a copy of your data</li>
          <li>Correction — fix inaccurate data</li>
          <li>Deletion — right to be forgotten</li>
          <li>Object — opt out of any non-essential processing</li>
        </ul>
        <p>To exercise any of these, see the contact section below.</p>

        <h2>6. Security</h2>
        <p>
          Data is encrypted in transit (HTTPS) and at rest (Supabase). Access is
          restricted via Supabase Row-Level Security (RLS) policies.
        </p>

        <h2>7. Cookies &amp; Tracking</h2>
        <p>
          We use the minimum cookies needed to keep you signed in. No advertising
          cookies. Analytics only if you enable them in your settings.
        </p>

        <h2>8. Contact</h2>
        <p>
          Privacy questions? Email <a href="mailto:hello@timeout.app">hello@timeout.app</a>.
        </p>
      </main>
    </>
  );
}
