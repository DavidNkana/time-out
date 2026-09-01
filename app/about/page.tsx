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
    title: 'Stay focused',
    body: `Pick the next thing. Take a beat. Move on. ${brand.name} is built around doing less, on purpose.`,
  },
  {
    title: 'Show up clearly',
    body: 'No dark patterns, no surprise fees, no popup fatigue. If we need to tell you something, we tell you plainly.',
  },
  {
    title: 'Respect your time',
    body: 'Pages load quickly. Flows are short. Nothing asks for your email twice. Your time is not free.',
  },
  {
    title: 'Stay private',
    body: `${brand.name} stores only what it needs to do the job. You can ask us to delete your account at any time.`,
  },
];

export default function AboutPage() {
  return (
    <>
      <Header />
      <PromoBanner
        imageUrl="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=2000&q=70"
        alt="Real people working behind the scenes"
        eyebrow="Behind the project"
        headline={`What ${brand.name} is, in one sentence.`}
        subheadline="Read it, or just use the app. Both are valid."
        ctaHref="/contact"
        ctaLabel="Get in touch"
      />
      <InfoHeader title={`About ${brand.name}`} />
      <main className="mx-auto max-w-3xl px-4 py-10 pb-20 safe-bottom prose prose-sm">
        <p className="text-sm font-medium text-accent-700">Established {brand.about.founded}</p>
        <h1 className="mt-2 text-3xl font-semibold text-brand-950">{brand.tagline}</h1>
        <p className="mt-4 text-base text-brand-700 leading-relaxed">
          {brand.about.mission}
        </p>

        <h2 className="mt-10 text-2xl font-semibold text-brand-950">What we believe</h2>
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
          Questions, a bug, a missing feature, a partnership pitch?{' '}
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
