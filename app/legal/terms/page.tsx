import { InfoHeader } from '@/components/ui/InfoHeader';

export const metadata = { title: 'Terms & Conditions — Timeout' };

export default function TermsPage() {
  return (
    <>
      <InfoHeader title="Terms & Conditions" />
      <main className="mx-auto max-w-3xl px-4 py-10 pb-20 safe-bottom prose prose-sm prose-headings:text-brand-950 prose-a:text-accent-700">
        <p className="text-sm text-brand-500">Scaffolding copy — replace before publishing.</p>

        <h1>Terms &amp; Conditions</h1>

        <h2>1. About Timeout</h2>
        <p>
          Timeout is a [describe] service operated from [your jurisdiction]. By using
          the app or website you agree to these terms.
        </p>

        <h2>2. Your Account</h2>
        <ul>
          <li>You are responsible for keeping your password safe.</li>
          <li>You are responsible for what happens under your account.</li>
          <li>Tell us if you suspect someone else is using your account.</li>
        </ul>

        <h2>3. Acceptable Use</h2>
        <ul>
          <li>Don&rsquo;t do anything illegal through the service.</li>
          <li>Don&rsquo;t try to break the service or load-test it without permission.</li>
          <li>Don&rsquo;t scrape or republish our content without permission.</li>
        </ul>

        <h2>4. Content</h2>
        <p>
          All content on this site (logos, images, copy, code) belongs to Timeout
          or our licensors. Don&rsquo;t copy or redistribute without permission.
        </p>

        <h2>5. Liability</h2>
        <p>
          Timeout&rsquo;s total liability for any claim is limited to the amount
          you paid for the relevant transaction (or a reasonable cap if the
          service is free). We&rsquo;re not liable for indirect or consequential
          damages.
        </p>

        <h2>6. Changes</h2>
        <p>
          We may update these terms. If the change is material we&rsquo;ll give
          you notice (in-app or by email). Continued use after the change means
          you accept the new terms.
        </p>

        <h2>7. Contact</h2>
        <p>
          Questions? Email <a href="mailto:hello@timeout.app">hello@timeout.app</a>.
        </p>
      </main>
    </>
  );
}
