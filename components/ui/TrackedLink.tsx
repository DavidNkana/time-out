'use client';

import Link, { type LinkProps } from 'next/link';
import type { AnchorHTMLAttributes, PropsWithChildren } from 'react';
import { trackEvent } from '@/lib/utils/analytics';

type Props = PropsWithChildren<LinkProps & AnchorHTMLAttributes<HTMLAnchorElement> & {
  event: string;
  eventProperties?: Record<string, unknown>;
}>;

export function TrackedLink({ event, eventProperties, onClick, children, ...props }: Props) {
  return (
    <Link
      {...props}
      onClick={(e) => {
        trackEvent(event, eventProperties);
        onClick?.(e);
      }}
    >
      {children}
    </Link>
  );
}
