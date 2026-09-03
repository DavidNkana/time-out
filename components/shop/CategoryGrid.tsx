import Link from 'next/link';

type Category = {
  slug: string;
  name: string;
  imageUrl: string;
};

// Timeout ships with two top-level categories. The DB schema allows more,
// but the storefront surfaces only Home and Women's Fashion.
const CATEGORIES: Category[] = [
  { slug: 'home',           name: 'Home',            imageUrl: '/categories/home.svg' },
  { slug: 'womens-fashion', name: "Women's Fashion", imageUrl: '/categories/womens-fashion.svg' }
];

export function CategoryGrid() {
  return (
    <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
      {CATEGORIES.map((c) => (
        <Link
          key={c.slug}
          href={`/c/${c.slug}`}
          className="group relative aspect-square overflow-hidden rounded-lg bg-brand-100"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={c.imageUrl}
            alt={c.name}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
          <span className="absolute bottom-2 left-2 right-2 text-sm font-medium text-white drop-shadow-sm">
            {c.name}
          </span>
        </Link>
      ))}
    </div>
  );
}