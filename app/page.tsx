import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CategoryGrid } from '@/components/shop/CategoryGrid';
import { ProductGrid } from '@/components/shop/ProductGrid';
import { RecentlyViewed } from '@/components/shop/RecentlyViewed';
import { VideoBanner } from '@/components/shop/VideoBanner';
import { TrackedLink } from '@/components/ui/TrackedLink';
import { getTodaysPicks, listProducts } from '@/lib/catalog/queries';

export default async function HomePage() {
  const todaysPicks = await getTodaysPicks(10);
  const featured = await listProducts({ featured: true, sort: 'newest', limit: 6 });

  return (
    <>
      <Header />
      <main className="flex-1 pb-12 safe-bottom">
        <section className="mx-auto max-w-6xl px-4 pb-3 pt-5 md:pt-8">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-accent-700">The edit</p>
              <h2 className="mt-1 font-display text-2xl font-semibold tracking-tight text-brand-950 md:text-3xl">Shop your mood</h2>
            </div>
            <Link href="/categories" className="mb-1 text-xs font-semibold uppercase tracking-wider text-brand-500 hover:text-accent-700">All edits</Link>
          </div>
          <CategoryGrid />
        </section>

        <section className="mx-auto max-w-6xl px-4 py-5 md:py-8">
          <div className="relative isolate overflow-hidden rounded-[2rem] bg-brand-950 px-6 py-8 text-white shadow-xl shadow-accent-100 md:min-h-[390px] md:px-12 md:py-12">
            <div className="absolute -right-16 -top-20 -z-10 h-72 w-72 rounded-full bg-accent-700/30 blur-3xl" />
            <div className="absolute bottom-0 right-0 -z-10 h-48 w-2/3 bg-gradient-to-l from-accent-900/70 to-transparent" />
            <div className="relative z-10 max-w-lg">
              <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-accent-200">Timeout / womenswear</p>
              <h1 className="mt-4 font-display text-4xl font-semibold leading-[0.95] tracking-[-0.04em] sm:text-5xl md:text-7xl">Dress for the life you want.</h1>
              <p className="mt-5 max-w-sm text-sm leading-6 text-white/70 md:text-base">Quiet luxury, easy layers, and pieces that move with your day.</p>
              <TrackedLink href="/c/womens-fashion" event="hero_cta_click" className="mt-7 inline-flex items-center gap-3 rounded-full bg-accent-300 px-5 py-3 text-sm font-bold text-brand-950 hover:bg-white">
                Explore the edit
                <span aria-hidden="true">↗</span>
              </TrackedLink>
            </div>
            <div className="pointer-events-none absolute -bottom-12 right-[-2%] hidden h-[115%] w-[48%] max-w-[380px] rotate-3 sm:block md:right-[5%]">
              <img src="/products/to-wrap-midi-dress.svg" alt="" className="h-full w-full object-contain drop-shadow-2xl" />
            </div>
          </div>
        </section>

        {/* Today's picks — newest products (or today's if any added today) */}
        {todaysPicks.length > 0 && (
          <section className="mx-auto max-w-6xl px-4 py-10 md:py-14">
            <div className="flex items-baseline justify-between gap-4">
              <h2 className="text-xl md:text-2xl font-semibold text-brand-950">Today&apos;s picks</h2>
              <Link href="/new" className="text-sm text-brand-600 hover:underline whitespace-nowrap">View all</Link>
            </div>
            <p className="mt-1 text-sm text-brand-600">
              {todaysPicks.length} new {todaysPicks.length === 1 ? 'item' : 'items'} added recently.
            </p>
            <div className="mt-6">
              <ProductGrid products={todaysPicks} />
            </div>
            {todaysPicks.length >= 10 && (
              <div className="mt-6 text-center">
                <Link
                  href="/new"
                  className="inline-flex items-center rounded-md border border-brand-300 bg-white px-5 py-2.5 text-sm font-medium text-brand-900 hover:bg-brand-50"
                >
                  View all →
                </Link>
              </div>
            )}
          </section>
        )}

        {featured.length > 0 && (
          <section className="mx-auto max-w-6xl px-4 py-10 md:py-14">
            <div className="flex items-baseline justify-between gap-4">
              <h2 className="text-xl md:text-2xl font-semibold text-brand-950">Featured</h2>
              <Link href="/new" className="text-sm text-brand-600 hover:underline whitespace-nowrap">See all</Link>
            </div>
            <p className="mt-1 text-sm text-brand-600">Hand-picked favourites.</p>
            <div className="mt-6">
              <ProductGrid products={featured} showPreview />
            </div>
          </section>
        )}

        {/* Fashion campaign reel — use a runway clip rather than the old home-interior reel. */}
        <VideoBanner
          videoUrl="https://cdn.pixabay.com/video/2021/09/04/87554-601149870_large.mp4"
          sources={[
            'https://cdn.pixabay.com/video/2021/09/04/87554-601149870_large.mp4',
            'https://cdn.pixabay.com/video/2021/09/04/87554-601149870_tiny.mp4',
          ]}
          posterUrl="/categories/womens-fashion.svg"
          eyebrow="The Timeout runway"
          headline="A little more you."
          subheadline="See the pieces, styling, and easy confidence in this season's women's edit."
          ctaHref="/c/womens-fashion"
          ctaLabel="Shop womenswear"
          align="center"
        />

        <section className="mt-8 border-t border-brand-200 bg-brand-50">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-4 py-8 md:grid-cols-3 md:gap-8 md:py-10">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-white flex items-center justify-center text-brand-900">📦</div>
              <div>
                <p className="font-medium text-brand-900">Delivered where you are</p>
                <p className="text-sm text-brand-600">Configurable shipping — configure in your settings.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-white flex items-center justify-center text-brand-900">↩</div>
              <div>
                <p className="font-medium text-brand-900">Easy returns</p>
                <p className="text-sm text-brand-600">Send it back within the window shown on your order.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-white flex items-center justify-center text-brand-900">🔒</div>
              <div>
                <p className="font-medium text-brand-900">Secure checkout</p>
                <p className="text-sm text-brand-600">Payments run through trusted processors. We never see card numbers.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Recently viewed — only renders after the user has visited any item */}
        <section className="mx-auto max-w-6xl px-4 pb-4">
          <RecentlyViewed heading="Continue where you left off" />
        </section>
      </main>
      <Footer />
    </>
  );
}
