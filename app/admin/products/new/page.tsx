import { requireAdmin } from '@/lib/auth/session';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { NewProductForm } from '@/components/admin/NewProductForm';
import { getAllCategories } from '@/lib/catalog/queries';
import Link from 'next/link';

export default async function NewProductPage() {
  await requireAdmin();
  // Admin sees every category (active + inactive) so products can be filed
  // into granular inactive buckets for internal categorization.
  const categories = await getAllCategories();

  return (
    <>
      <Header />
      <main className="mx-auto max-w-4xl px-4 py-10 pb-20 safe-bottom">
        <Link href="/admin/products" className="text-sm text-brand-600 hover:underline">← Back to products</Link>
        <h1 className="mt-2 text-2xl font-semibold text-brand-950">Add new product</h1>
        <p className="mt-1 text-sm text-brand-600">Create a product with variants, images, and pricing.</p>

        <div className="mt-6">
          <NewProductForm categories={categories.map((c) => ({ id: c.id, name: c.name, slug: c.slug }))} />
        </div>
      </main>
      <Footer />
    </>
  );
}