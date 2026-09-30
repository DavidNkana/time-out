'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CartButton } from '@/components/shop/CartButton';
import { SearchAutocomplete } from '@/components/shop/SearchAutocomplete';
import { WishlistButton } from '@/components/shop/WishlistButton';
import { brand } from '@/lib/brand';

const NAV_LINKS = [
  { href: '/new',             label: 'New in' },
  { href: '/c/womens-fashion', label: 'Womenswear' },
  { href: '/categories',      label: 'The edit' },
  { href: '/about',            label: 'Our story' },
];

export function Header() {
  const pathname = usePathname();

  function isActive(href: string) {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  }

  return (
    <header className="sticky top-0 z-40 border-b border-brand-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 safe-top">
      <div className="hidden bg-brand-950 px-4 py-2 text-center text-[10px] font-bold uppercase tracking-[0.22em] text-accent-100 sm:block">
        The new womenswear edit is here · Easy returns
      </div>
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3.5 md:py-4">
        <Link href="/" className="flex flex-shrink-0 items-center gap-2">
          <img
            src={brand.logo}
            alt={`${brand.name} logo`}
            className="h-8 w-auto sm:h-9"
          />
          <span className="hidden border-l border-brand-200 pl-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-500 sm:block">The everyday edit</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`relative rounded-full px-3.5 py-2 text-xs font-semibold transition-colors ${
                isActive(l.href)
                  ? 'bg-accent-50 text-accent-700'
                  : 'text-brand-600 hover:bg-brand-50 hover:text-brand-950'
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1 sm:gap-2">
          <SearchAutocomplete />
          <WishlistButton />
          <Link href="/account" aria-label="Profile" className="inline-flex rounded-full border border-brand-200 p-2 text-brand-700 hover:border-accent-300 hover:bg-accent-50">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <circle cx="12" cy="8" r="4" />
              <path d="M4 21c0-4 4-7 8-7s8 3 8 7" />
            </svg>
          </Link>
          <CartButton />
        </div>
      </div>

      <nav aria-label="Mobile shop navigation" className="no-scrollbar overflow-x-auto border-t border-brand-100 bg-brand-50/70 px-3 py-2 md:hidden">
        <ul className="flex min-w-max items-center justify-center gap-1">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`inline-flex rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider ${isActive(link.href) ? 'bg-white text-accent-700 shadow-sm' : 'text-brand-500'}`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
