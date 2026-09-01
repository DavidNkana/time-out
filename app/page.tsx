import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CategoryGrid } from '@/components/shop/CategoryGrid';
import { ProductGrid } from '@/components/shop/ProductGrid';
import { RecentlyViewed } from '@/components/shop/RecentlyViewed';
import { PromoBanner } from '@/components/shop/PromoBanner';
import { VideoBanner } from '@/components/shop/VideoBanner';
import { getTodaysPicks, listProducts } from '@/lib/catalog/queries';
import { brand } from '@/lib/brand';

export default async function HomePage() {
  const todaysPicks = await getTodaysPicks(10);
  const featured = await listProducts({ featured: true, sort: 'newest', limit: 6 });

  return (
    <>
      <Header />
      <main className="flex-1 pb-12 safe-bottom">
        <section className="mx-auto max-w-6xl px-4 py-6 md:py-10">
          <div className="flex items-baseline justify-between gap-4">
            <h2 className="text-xl md:text-2xl font-semibold text-brand-950">Browse by category</h2>
            <Link href="/categories" className="text-sm text-brand-600 hover:underline whitespace-nowrap">View all</Link>
          </div>
          <CategoryGrid />
        </section>

        {/* Promo banner 1 — full-bleed image, between Categories and Today's picks */}
        <PromoBanner
          imageUrl="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=2000&q=70"
          alt="A calm, naturally lit living space"
          eyebrow={brand.home.eyebrow || 'Welcome to Timeout'}
          headline={brand.home.headline || `Take a beat. Then ${brand.name}.`}
          subheadline={brand.home.subheadline || 'A focused, distraction-free way to find what you came for.'}
          ctaHref={brand.home.primaryCta.href}
          ctaLabel={brand.home.primaryCta.label}
        />

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

        {/* Promo banner 2 — full-bleed LOOPING VIDEO, before the trust strip */}
        <VideoBanner
          videoUrl="https://cdn.pixabay.com/video/2015/10/16/1006-142621176_large.mp4"
          posterUrl="https://cdn.pixabay.com/video/2015/10/16/1006-142621176_tiny.jpg"
          eyebrow="Fresh"
          headline={`What's new on ${brand.name}.`}
          subheadline="Picked for this week. Updated often."
          ctaHref={brand.home.secondaryCta.href}
          ctaLabel={brand.home.secondaryCta.label}
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
