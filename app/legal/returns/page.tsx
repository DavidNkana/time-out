import { InfoHeader } from '@/components/ui/InfoHeader';

export const metadata = { title: 'Returns Policy — Timeout' };

export default function ReturnsPage() {
  return (
    <>
      <InfoHeader title="Returns Policy" />
      <main className="mx-auto max-w-3xl px-4 py-10 pb-20 safe-bottom prose prose-sm prose-headings:text-brand-950 prose-a:text-accent-700">
        <p className="text-sm text-brand-500">Scaffolding copy — replace before publishing.</p>

        <h1>Returns Policy</h1>

        <h2>Return window</h2>
        <p>You have a window from the date of delivery to return an item for a refund. The exact window is shown on your order page and at checkout.</p>

        <h2>Eligibility</h2>
        <ul>
          <li>The item must be unused and in the same condition you received it</li>
          <li>It must be in the original packaging with all tags attached (where applicable)</li>
          <li>You must have the receipt or order confirmation</li>
        </ul>
        <p>Some items are non-returnable for hygiene or customisation reasons. Those are flagged on the product page.</p>

        <h2>How to return</h2>
        <ol>
          <li>Email <a href="mailto:returns@timeout.app">returns@timeout.app</a> with your order number and the reason</li>
          <li>We&rsquo;ll send you a return authorisation and the return address</li>
          <li>Pack the item securely and ship it to us (return shipping is at your cost unless the item arrived damaged or incorrect)</li>
          <li>Once we receive and inspect the item, we&rsquo;ll notify you of the refund decision</li>
        </ol>

        <h2>Refunds</h2>
        <p>Refunds are processed within a few business days of us receiving the returned item, via the original payment method.</p>

        <h2>Damaged or wrong items</h2>
        <p>If your item arrives damaged or you received the wrong thing, we&rsquo;ll cover the return shipping. Email <a href="mailto:returns@timeout.app">returns@timeout.app</a> with photos within 48 hours of delivery.</p>

        <h2>Exchanges</h2>
        <p>Need a different variant? Email us and we&rsquo;ll arrange an exchange (subject to stock availability).</p>

        <h2>Contact</h2>
        <p><a href="mailto:returns@timeout.app">returns@timeout.app</a></p>
      </main>
    </>
  );
}
