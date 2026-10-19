import { InfoHeader } from '@/components/ui/InfoHeader';
import { brand } from '@/lib/brand';

export const metadata = { title: 'Returns, Exchanges and Refunds Policy — Time-Out Home & Style' };

export default function ReturnsPage() {
  return (
    <>
      <InfoHeader title="Returns, Exchanges and Refunds" />
      <main className="prose prose-sm mx-auto max-w-3xl px-4 py-10 pb-20 safe-bottom prose-headings:text-brand-950 prose-a:text-accent-700">
        <p className="text-sm text-brand-500">Effective date: 11 October 2026</p>

        <h1>Returns, Exchanges and Refunds Policy</h1>
        <p>Thank you for shopping with Time-Out Home &amp; Style. We want you to be happy with your purchase. Please read our returns, exchanges and refunds policy before placing an order.</p>

        <h2>1. Returns and Exchanges</h2>
        <ul>
          <li>Customers who wish to return an item because they have changed their mind must contact us within 7 days of receiving the order.</li>
          <li>Items must be unused, undamaged and returned with their original packaging, labels and accessories.</li>
          <li>Clothing must be unworn, unwashed and in its original condition.</li>
          <li>Items that have been used, damaged by the customer or returned incomplete may not qualify for a change-of-mind return, subject to applicable consumer rights.</li>
          <li>Exchanges are subject to stock availability.</li>
        </ul>

        <h2>2. Damaged, Defective or Incorrect Items</h2>
        <p>If you receive an item that is damaged, defective or different from what you ordered, please contact us as soon as possible and provide your order number and photographs where appropriate.</p>
        <p>We will assess the issue and arrange an appropriate remedy in accordance with applicable consumer protection laws.</p>

        <h2>3. Refunds</h2>
        <ul>
          <li>Refunds will be processed after the returned item has been received and assessed, where an assessment is appropriate.</li>
          <li>Approved refunds will be made using the original payment method where reasonably possible.</li>
          <li>Processing times may depend on your bank or payment provider.</li>
          <li>Refunds, repairs and replacements will be handled in accordance with applicable South African law.</li>
        </ul>

        <h2>4. Return Delivery Costs</h2>
        <ul>
          <li>For a change-of-mind return, the customer may be responsible for reasonable return delivery costs, where permitted by law.</li>
          <li>If an item is defective, damaged on arrival or incorrectly supplied, we will arrange the return and remedy in accordance with applicable law.</li>
        </ul>

        <h2>5. Items That May Have Return Restrictions</h2>
        <p>Certain products, including personalised items and products subject to health or hygiene restrictions, may have special return conditions where permitted by law. These restrictions do not remove any consumer rights that cannot legally be excluded.</p>

        <h2>6. How to Request a Return</h2>
        <p>To request a return or exchange, please contact us through our official business contact details and provide:</p>
        <ul>
          <li>Your full name.</li>
          <li>Your order number.</li>
          <li>The name of the item you wish to return.</li>
          <li>The reason for the return.</li>
          <li>Photographs, where relevant.</li>
        </ul>
        <p>Please wait for our instructions before sending an item back.</p>

        <h2>7. Consumer Protection</h2>
        <p>This policy is subject to the laws of the Republic of South Africa, including the Consumer Protection Act and applicable electronic-commerce regulations. Nothing in this policy limits any consumer right that cannot legally be excluded.</p>

        <p><strong>Time-Out Home &amp; Style — Style for you, beauty for your home.</strong></p>
        <p>Returns contact: <a href={`mailto:${brand.contact.email}`}>{brand.contact.email}</a></p>
      </main>
    </>
  );
}
