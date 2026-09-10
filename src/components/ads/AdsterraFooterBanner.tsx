'use client';

import {useEffect, useRef, useState} from 'react';
import {AdBanner} from '@/components/ads/AdsterraBanner';
import {getBannerConfig} from '@/lib/ad-config';

export function AdsterraFooterBanner({title = 'Advertisement'}: {title?: string}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateWidth = () => setContainerWidth(container.clientWidth);
    const resizeObserver = new ResizeObserver(updateWidth);

    updateWidth();
    resizeObserver.observe(container);

    return () => resizeObserver.disconnect();
  }, []);

  if (!getBannerConfig('728x90')) return null;

  const scale = containerWidth ? Math.min(1, containerWidth / 728) : 1;

  return (
    <div className="mx-auto max-w-4xl px-2 py-8 sm:px-5">
      <div
        ref={containerRef}
        className="mx-auto w-full max-w-[728px] overflow-hidden"
        style={{height: 90 * scale}}
      >
        <div
          className="h-[90px] w-[728px] origin-top-left"
          style={{transform: `scale(${scale})`}}
        >
          <AdBanner eager type="banner-728x90" title={title} />
        </div>
      </div>
    </div>
  );
}
