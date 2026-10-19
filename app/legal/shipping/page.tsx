import { InfoHeader } from '@/components/ui/InfoHeader';
import { brand } from '@/lib/brand';

export const metadata = { title: 'Shipping Policy — Time-Out Home & Style' };

export default function ShippingPage() {
  return (
    <>
      <InfoHeader title="Shipping Policy" />
      <main className="mx-auto max-w-3xl px-4 py-10 pb-20 safe-bottom prose prose-sm prose-headings:text-brand-950 prose-a:text-accent-700">
        <p className="text-sm text-brand-500">Effective date: 11 October 2026</p>

        <h1>Shipping Policy</h1>

        <h2>Delivery options</h2>
        <p>Time-Out Home &amp; Style currently uses The Courier Guy for door delivery. The delivery fee and estimated arrival window are shown at checkout before you place your order.</p>

        <h2>Delivery times</h2>
        <p>All ETAs are estimates. Public holidays, weather, and courier issues may cause delays. Time-Out Home &amp; Style will keep you informed if your order is delayed.</p>

        <h2>Tracking</h2>
        <p>Once your order ships, you&rsquo;ll receive an email with a tracking link. You can also view tracking on your <a href="/account/orders">account orders page</a>.</p>

        <h2>Issues with delivery</h2>
        <p>If your order hasn&rsquo;t arrived within a reasonable time after the ETA, please email <a href={`mailto:${brand.contact.email}`}>{brand.contact.email}</a> with your order number.</p>
      </main>
    </>
  );
}
