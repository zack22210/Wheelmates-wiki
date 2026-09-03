import 'server-only';

import type {Metadata} from 'next';
import {getTranslations} from 'next-intl/server';
import {routing} from '@/i18n/routing';

export type LegalPageKey = 'about' | 'privacy' | 'terms' | 'copyright';
export type LegalSection = {title: string; body: string};

export async function getLegalCopy(key: LegalPageKey, locale: string) {
  const t = await getTranslations({locale});
  return {
    title: t(`legal.${key}.title`),
    intro: t(`legal.${key}.intro`),
    sections: t.raw(`legal.${key}.sections`) as LegalSection[],
    homeLabel: t('article.home'),
    breadcrumbLabel: t('accessibility.breadcrumb')
  };
}

export async function getLegalMetadata(key: LegalPageKey, pathname: string, locale: string): Promise<Metadata> {
  const t = await getTranslations({locale});
  const canonical = locale === routing.defaultLocale ? pathname : `/${locale}${pathname}`;
  const languages = Object.fromEntries(
    routing.locales.map((item) => [item, item === routing.defaultLocale ? pathname : `/${item}${pathname}`])
  );
  return {
    title: t(`legal.${key}.metaTitle`),
    description: t(`legal.${key}.metaDescription`),
    alternates: {canonical, languages}
  };
}
