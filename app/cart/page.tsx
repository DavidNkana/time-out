import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CartView } from '@/components/shop/CartView';

export default function CartPage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-3xl px-4 py-10 pb-20 safe-bottom">
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-accent-700">Nearly yours</p>
        <h1 className="mt-2 font-display text-4xl font-semibold tracking-[-0.04em] text-brand-950">Your bag</h1>
        <p className="mt-3 text-sm text-brand-600">A few good choices, ready when you are.</p>
        <div className="mt-7">
          <CartView />
        </div>
      </main>
      <Footer />
    </>
  );
}
