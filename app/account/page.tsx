import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { requireUser, getCurrentCustomer } from '@/lib/auth/session';
import { LogoutButton } from '@/components/auth/LogoutButton';
import Link from 'next/link';

export default async function AccountPage() {
  const user = await requireUser();
  const customer = await getCurrentCustomer();

  // Display name: full_name first, then email prefix (before @), then email
  const displayName = customer?.full_name || user.email?.split('@')[0] || user.email;

  return (
    <>
      <Header />
      <main className="mx-auto max-w-5xl px-4 py-8 pb-20 safe-bottom md:py-12">
        <div className="overflow-hidden rounded-[2rem] bg-brand-950 px-6 py-8 text-white md:px-10 md:py-10">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-accent-200">Your Timeout</p>
              <h1 className="mt-3 font-display text-4xl font-semibold tracking-[-0.04em] md:text-5xl">Welcome back, {displayName}</h1>
              <p className="mt-3 text-sm text-white/60">{user.email}</p>
            </div>
            <LogoutButton redirectTo="/" />
          </div>
        </div>

        <p className="mt-10 text-[11px] font-bold uppercase tracking-[0.2em] text-accent-700">Your wardrobe, in one place</p>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {[
            { label: 'Orders & delivery', href: '/account/orders', desc: 'Track your pieces from checkout to your door.', mark: '01' },
            { label: 'Saved pieces', href: '/account/wishlist', desc: 'Keep the things you love close for later.', mark: '02' },
            { label: 'Delivery details', href: '/account/addresses', desc: 'Save your favourite places to receive orders.', mark: '03' },
            { label: 'Profile & preferences', href: '/account/settings', desc: 'Make your account feel like yours.', mark: '04' }
          ].map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="group rounded-[1.35rem] border border-brand-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-accent-300 hover:shadow-lg hover:shadow-accent-50"
            >
              <div className="flex items-start justify-between gap-4">
                <p className="text-lg font-semibold text-brand-950">{card.label}</p>
                <span className="text-xs font-bold tracking-wider text-accent-600">{card.mark}</span>
              </div>
              <p className="mt-2 max-w-sm text-sm leading-6 text-brand-600">{card.desc}</p>
              <span className="mt-5 inline-flex text-xs font-bold uppercase tracking-wider text-brand-500 group-hover:text-accent-700">Open section <span className="ml-2">↗</span></span>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
