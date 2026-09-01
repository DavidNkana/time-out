import { InfoHeader } from '@/components/ui/InfoHeader';

export const metadata = { title: 'Shipping Policy — Timeout' };

export default function ShippingPage() {
  return (
    <>
      <InfoHeader title="Shipping Policy" />
      <main className="mx-auto max-w-3xl px-4 py-10 pb-20 safe-bottom prose prose-sm prose-headings:text-brand-950 prose-a:text-accent-700">
        <p className="text-sm text-brand-500">Scaffolding copy — replace before publishing.</p>

        <h1>Shipping Policy</h1>

        <h2>Delivery options</h2>
        <p>Delivery options available to you are shown at checkout. They depend on your address, the items in your cart, and the couriers Timeout is currently integrating with.</p>

        <h2>Delivery times</h2>
        <p>All ETAs are estimates. Public holidays, weather, and courier issues may cause delays. We&rsquo;ll keep you informed if your order is delayed.</p>

        <h2>Tracking</h2>
        <p>Once your order ships, you&rsquo;ll receive an email with a tracking link. You can also view tracking on your <a href="/account/orders">account orders page</a>.</p>

        <h2>Issues with delivery</h2>
        <p>If your order hasn&rsquo;t arrived within a reasonable time after the ETA, please email <a href="mailto:support@timeout.app">support@timeout.app</a> with your order number.</p>
      </main>
    </>
  );
}
