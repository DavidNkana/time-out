import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import Link from 'next/link';
import { CategoryGrid } from '@/components/shop/CategoryGrid';

export default function CategoriesPage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-6xl min-w-0 overflow-x-hidden px-4 py-6 pb-20 safe-bottom">
        <nav className="text-xs text-brand-500">
          <Link href="/" className="hover:underline">Home</Link>
          <span className="mx-1">/</span>
          <span className="text-brand-700">All categories</span>
        </nav>
        <p className="mt-4 text-[11px] font-bold uppercase tracking-[0.2em] text-accent-700">Find your next favourite</p>
        <h1 className="mt-2 font-display text-4xl font-semibold tracking-[-0.04em] text-brand-950">The full edit</h1>
        <p className="mt-3 max-w-lg text-sm leading-6 text-brand-600">From easy layers to the details that make a room feel like yours, start wherever your mood takes you.</p>
        <div className="mt-6">
          <CategoryGrid />
        </div>
      </main>
      <Footer />
    </>
  );
}
