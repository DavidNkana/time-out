import { getCategories } from '@/lib/catalog/queries';
import { CategoryCardImage } from './CategoryCardImage';
import { TrackedLink } from '@/components/ui/TrackedLink';

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
    <div className="relative mt-6">
      <div className="no-scrollbar flex snap-x gap-3 overflow-x-auto pb-2 pr-8">
        {cards.map((c) => (
          <CategoryCardLink key={c.slug} category={c} />
        ))}
      </div>
    </div>
  );
}

function CategoryCardLink({ category }: { category: CategoryCard }) {
  return (
    <TrackedLink
      href={`/c/${category.slug}`}
      event="category_click"
      eventProperties={{ category: category.slug }}
      className="group w-[118px] shrink-0 snap-start"
    >
      <div className="relative aspect-square overflow-hidden rounded-[1.35rem] border border-brand-200 bg-brand-100 shadow-sm transition-transform duration-200 group-hover:-translate-y-1">
        <CategoryCardImage src={category.imageUrl} alt={category.name} />
      </div>
      <span className="mt-2 block truncate text-center text-xs font-semibold text-brand-800">
        {category.name}
      </span>
    </TrackedLink>
  );
}
