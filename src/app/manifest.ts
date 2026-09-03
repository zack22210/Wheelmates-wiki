import type {MetadataRoute} from 'next';
import en from '@/locales/en.json';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: en.site.name,
    short_name: en.site.shortName,
    description: en.seo.defaultDescription,
    start_url: '/',
    display: 'standalone',
    background_color: '#f3ead8',
    theme_color: '#102b46',
    icons: [
      {src: '/favicon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'maskable'}
    ]
  };
}
