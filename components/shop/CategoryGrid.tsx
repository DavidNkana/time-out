import Link from 'next/link';
import { getCategories } from '@/lib/catalog/queries';
import { CategoryCardImage } from './CategoryCardImage';

type CategoryCard = {
  slug: string;
  name: string;
  imageUrl: string;
};

export async function CategoryGrid() {
  // Source of truth: the active categories in the DB. Sort order is set there
  // (sort_order 1-8 for the 8 storefront-visible categories).
  const categories = await getCategories();
  const cards: CategoryCard[] = categories.map((c) => ({
    slug: c.slug,
    name: c.name,
    imageUrl: `/categories/${c.slug}.svg`,
  }));

  return (
    <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
      {cards.map((c) => (
        <CategoryCardLink key={c.slug} category={c} />
      ))}
    </div>
  );
}

function CategoryCardLink({ category }: { category: CategoryCard }) {
  return (
    <Link
      href={`/c/${category.slug}`}
      className="group relative aspect-square overflow-hidden rounded-lg bg-brand-100"
    >
      <CategoryCardImage src={category.imageUrl} alt={category.name} />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
      <span className="absolute bottom-2 left-2 right-2 text-sm font-medium text-white drop-shadow-sm">
        {category.name}
      </span>
    </Link>
  );
}