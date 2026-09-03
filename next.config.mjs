import createMDX from '@next/mdx';
import createNextIntlPlugin from 'next-intl/plugin';

const withMDX = createMDX({
  options: {
    remarkPlugins: ['remark-gfm']
  }
});

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
  reactStrictMode: true,
  poweredByHeader: false,
  experimental: {
    // Each route reads the shared MDX catalogue. Keep hosted static generation
    // below the file-descriptor and memory pressure of highly parallel workers.
    staticGenerationMaxConcurrency: 2,
    staticGenerationMinPagesPerWorker: 40
  }
};

export default withNextIntl(withMDX(nextConfig));
