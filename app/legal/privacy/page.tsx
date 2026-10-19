import { InfoHeader } from '@/components/ui/InfoHeader';
import { brand } from '@/lib/brand';

export const metadata = { title: 'Privacy Notice — Time-Out Home & Style' };

export default function PrivacyPage() {
  return (
    <>
      <InfoHeader title="Privacy Notice" />
      <main className="prose prose-sm mx-auto max-w-3xl px-4 py-10 pb-20 safe-bottom prose-headings:text-brand-950 prose-a:text-accent-700">
        <p className="text-sm text-brand-500">Effective date: 11 October 2026</p>

        <h1>Privacy Notice</h1>
        <p>This Privacy Notice explains how Time-Out Home &amp; Style collects, uses and protects personal information when you use our app, website or shopping services.</p>

        <h2>1. Information We Collect</h2>
        <ul>
          <li><strong>Account information:</strong> your email address, display name and authentication details.</li>
          <li><strong>Order information:</strong> contact details, delivery address, products ordered, order status and return information.</li>
          <li><strong>Payment information:</strong> payment status and transaction references. Payment card details are handled by the relevant payment provider and are not stored by us.</li>
          <li><strong>Device and usage information:</strong> information needed to keep the app secure, remember your cart and improve the service when optional analytics are enabled.</li>
          <li><strong>Messages:</strong> information you provide when contacting us or requesting support.</li>
        </ul>

        <h2>2. How We Use Information</h2>
        <ul>
          <li>To create and manage your account.</li>
          <li>To process orders, returns, refunds and customer support requests.</li>
          <li>To arrange delivery through our delivery partners, including The Courier Guy.</li>
          <li>To send service messages such as order confirmations, delivery updates and security notices.</li>
          <li>To protect the app, prevent fraud and improve our products and services.</li>
        </ul>

        <h2>3. Service Providers</h2>
        <p>We use service providers that help us operate the app and fulfil orders, including hosting, database, authentication, email, payment and delivery providers. They may process information only as needed to provide their services to us.</p>

        <h2>4. Cookies and Analytics</h2>
        <p>We use necessary storage and cookies to keep you signed in, maintain your cart and support essential app functions. Optional analytics are used only where you provide consent. We do not sell personal information or use it for advertising profiles.</p>

        <h2>5. Retention and Security</h2>
        <p>We keep personal information for as long as it is needed to provide the service, meet legal and accounting obligations, resolve disputes and enforce our agreements. We use access controls, secure connections and appropriate safeguards, but no internet service can guarantee absolute security.</p>

        <h2>6. Your Rights</h2>
        <p>Subject to applicable law, you may ask us to access, correct or delete your personal information, or object to non-essential processing. You may also withdraw optional analytics consent. We may need to verify your identity before completing a request.</p>

        <h2>7. Contact</h2>
        <p>For privacy questions or requests, contact <a href={`mailto:${brand.contact.email}`}>{brand.contact.email}</a>.</p>

        <p><strong>Time-Out Home &amp; Style — Style for you, beauty for your home.</strong></p>
      </main>
    </>
  );
}
