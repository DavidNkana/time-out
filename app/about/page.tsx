import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { InfoHeader } from '@/components/ui/InfoHeader';
import { PwaInstallButton } from '@/components/marketing/PwaInstallButton';
import { PromoBanner } from '@/components/shop/PromoBanner';
import { brand } from '@/lib/brand';

export const metadata = {
  title: `About ${brand.name}`,
  description: brand.shortDescription,
};

const VALUES = [
  {
    title: 'Wear it often',
    body: 'We look for pieces that earn repeat wears, not one-day outfits that sit at the back of your wardrobe.',
  },
  {
    title: 'Choose with intention',
    body: 'The edit stays considered so finding something good feels more like instinct than endless scrolling.',
  },
  {
    title: 'Make room for life',
    body: 'The best clothes are the ones that move with you, from slow mornings to plans that were never in the diary.',
  },
  {
    title: 'Keep it honest',
    body: 'Clear prices, useful details, and support when you need it. No pressure, no theatre.',
  },
];

export default function AboutPage() {
  return (
    <>
      <Header />
      <PromoBanner
        imageUrl="/products/to-silk-blouse.svg"
        alt="Silk-blend blouse from the Timeout womenswear edit"
        eyebrow="Our point of view"
        headline={`Good clothes. Less noise.`}
        subheadline="A slower, sharper way to find the pieces you will actually wear."
        ctaHref="/c/womens-fashion"
        ctaLabel="Shop the edit"
      />
      <InfoHeader title={`About ${brand.name}`} />
      <main className="mx-auto max-w-3xl px-4 py-10 pb-20 safe-bottom prose prose-sm">
        <p className="text-sm font-medium text-accent-700">Established {brand.about.founded}</p>
        <h1 className="mt-2 text-3xl font-semibold text-brand-950">{brand.tagline}</h1>
        <p className="mt-4 text-base text-brand-700 leading-relaxed">
          {brand.about.mission}
        </p>

        <h2 className="mt-10 text-2xl font-semibold text-brand-950">The Timeout way</h2>
        <ul className="mt-4 grid gap-4 sm:grid-cols-2">
          {VALUES.map((v) => (
            <li key={v.title} className="rounded-lg border border-brand-200 bg-white p-5">
              <p className="text-base font-semibold text-brand-950">{v.title}</p>
              <p className="mt-2 text-sm text-brand-700 leading-relaxed">{v.body}</p>
            </li>
          ))}
        </ul>

        <h2 className="mt-10 text-2xl font-semibold text-brand-950">Talk to us</h2>
        <p className="mt-3 text-brand-700 leading-relaxed">
          Need help choosing a size, checking an order, or finding the right piece?{' '}
          <a href="/contact" className="text-brand-900 underline hover:text-brand-700">
            Drop us a message
          </a>{' '}
          or email{' '}
          <a href={`mailto:${brand.contact.email}`} className="text-brand-900 underline hover:text-brand-700">
            {brand.contact.email}
          </a>
          . Replies usually arrive within a day.
        </p>

        <PwaInstallButton />
      </main>

      <Footer />
    </>
  );
}
