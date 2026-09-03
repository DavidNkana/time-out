'use client';

import { useState } from 'react';

type Props = {
  src: string;
  alt: string;
};

/**
 * Image with a generic grey fallback if the category SVG is missing on disk.
 * Until every active category has its own illustration, a missing file would
 * otherwise render a broken-image icon — much worse than a calm placeholder.
 */
export function CategoryCardImage({ src, alt }: Props) {
  const [errored, setErrored] = useState(false);

  if (errored) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-brand-200">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <span className="px-4 text-center text-sm font-medium text-brand-700">
          {alt}
        </span>
      </div>
    );
  }

  return (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setErrored(true)}
      className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
    />
  );
}