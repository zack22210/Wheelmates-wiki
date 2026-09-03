import en from '@/locales/en.json';

export const SITE_IMAGE_PATH = en.media.heroImage;
export const SITE_LOGO_PATH = en.media.logoImage;
export const ARTICLE_IMAGE_PATH = en.media.articleImage;

const DEFAULT_SITE_URL = 'https://wheelmates-wiki.wiki';

function normalizeSiteUrl(value: string | undefined): string {
  const raw = value?.trim().replace(/^['"]|['"]$/g, '');
  if (!raw) return DEFAULT_SITE_URL;

  // Accept either a bare domain or a URL copied from Markdown settings/docs.
  const markdownTarget = raw.match(/^\[[^\]]+\]\((https?:\/\/[^)]+)\)$/)?.[1];
  const candidate = markdownTarget ?? (/^https?:\/\//i.test(raw) ? raw : `https://${raw}`);

  try {
    return new URL(candidate).origin;
  } catch {
    return DEFAULT_SITE_URL;
  }
}

export const SITE_URL = normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL);

export function absoluteUrl(pathname: string): string {
  return `${SITE_URL}${pathname.startsWith('/') ? pathname : `/${pathname}`}`;
}

