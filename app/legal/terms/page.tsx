import { InfoHeader } from '@/components/ui/InfoHeader';
import { brand } from '@/lib/brand';

export const metadata = { title: 'Terms and Conditions — Time-Out Home & Style' };

export default function TermsPage() {
  return (
    <>
      <InfoHeader title="Terms and Conditions" />
      <main className="prose prose-sm mx-auto max-w-3xl px-4 py-10 pb-20 safe-bottom prose-headings:text-brand-950 prose-a:text-accent-700">
        <p className="text-sm text-brand-500">Effective date: 11 October 2026</p>

        <h1>Terms and Conditions</h1>
        <p>These Terms and Conditions apply to your use of the Time-Out Home &amp; Style app, website and online store. By using our services or placing an order, you agree to these terms.</p>

        <h2>1. About Time-Out Home &amp; Style</h2>
        <p>Time-Out Home &amp; Style offers curated clothing, accessories, home and lifestyle products through its online store. Product descriptions, availability and prices are shown on the relevant product or checkout page and may change before an order is accepted.</p>

        <h2>2. Accounts</h2>
        <ul>
          <li>You must provide accurate information when creating an account or placing an order.</li>
          <li>You are responsible for keeping your sign-in details secure.</li>
          <li>You must tell us promptly if you believe your account has been accessed without permission.</li>
          <li>We may suspend access where necessary to protect the store, customers or our systems.</li>
        </ul>

        <h2>3. Orders and Payment</h2>
        <p>An order is subject to product availability, successful payment authorisation and confirmation by us. The total price, delivery charge and available payment method are shown before order submission. We may contact you if information is missing or an order cannot be fulfilled.</p>

        <h2>4. Delivery</h2>
        <p>Orders are delivered through The Courier Guy to the delivery address supplied at checkout. Delivery estimates are not guarantees and may be affected by public holidays, weather, courier delays or incorrect address information. See our <a href="/legal/shipping">Shipping Policy</a> for more information.</p>

        <h2>5. Returns, Exchanges and Refunds</h2>
        <p>Our <a href="/legal/returns">Returns, Exchanges and Refunds Policy</a> explains the process and conditions that apply. Nothing in that policy or these terms limits a consumer right that cannot legally be excluded.</p>

        <h2>6. Acceptable Use</h2>
        <ul>
          <li>Do not use the app or website for unlawful, fraudulent or abusive activity.</li>
          <li>Do not interfere with, reverse engineer or introduce malicious code into our services.</li>
          <li>Do not copy, scrape or republish our product content, branding or software without permission.</li>
        </ul>

        <h2>7. Intellectual Property</h2>
        <p>Our brand, logos, product content, images, text and software belong to Time-Out Home &amp; Style or the relevant licensors. All rights not expressly granted are reserved.</p>

        <h2>8. Changes and Contact</h2>
        <p>We may update these terms when our services or legal obligations change. The effective date above will show when the current version took effect. Questions can be sent to <a href={`mailto:${brand.contact.email}`}>{brand.contact.email}</a>.</p>

        <p><strong>Time-Out Home &amp; Style — Style for you, beauty for your home.</strong></p>
      </main>
    </>
  );
}
