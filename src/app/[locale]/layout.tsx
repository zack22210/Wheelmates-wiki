import type {Metadata} from 'next';
import type {ReactNode} from 'react';
import {hasLocale, NextIntlClientProvider} from 'next-intl';
import {getMessages, getTranslations, setRequestLocale} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
import {SiteHeader} from '@/components/SiteHeader';
import {SiteFooter} from '@/components/SiteFooter';
import {JsonLd} from '@/components/JsonLd';
import {CookieConsent} from '@/components/CookieConsent';
import {getAllContentGroups} from '@/lib/content';
import {formatArticleNavigationLabel} from '@/lib/content-label';
import {
  absoluteUrl,
  SITE_IMAGE_PATH,
  SITE_LOGO_PATH,
  SITE_URL
} from '@/config/site';

type Props = {
  children: ReactNode;
  params: Promise<{locale: string}>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export async function generateMetadata({params}: Omit<Props, 'children'>): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale});
  const image = absoluteUrl(SITE_IMAGE_PATH);
  const siteName = t('site.name');
  const description = t('seo.defaultDescription');

  return {
    metadataBase: new URL(SITE_URL),
    title: siteName,
    description,
    manifest: '/manifest.webmanifest',
    icons: {
      icon: [{url: '/favicon.svg', type: 'image/svg+xml'}]
    },
    openGraph: {
      type: 'website',
      locale,
      siteName,
      url: SITE_URL,
      title: siteName,
      description,
      images: [{url: image, width: 1920, height: 1080, alt: t('media.heroAlt')}]
    },
    twitter: {
      card: 'summary_large_image',
      title: siteName,
      description,
      images: [image]
    }
  };
}

export default async function LocaleLayout({children, params}: Props) {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  setRequestLocale(locale);
  const messages = await getMessages();
  const t = await getTranslations({locale});
  const navigationLabels = t.raw('nav') as Record<string, string>;
  const contentGroups = await getAllContentGroups(locale);
  const navigationGroups = contentGroups.map((group) => ({
    contentType: group.contentType,
    label: navigationLabels[group.contentType],
    count: group.articles.length,
    articles: group.articles.map(({slug, title}) => ({
      slug,
      title,
      navigationLabel: formatArticleNavigationLabel(slug)
    }))
  }));
  const organization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: t('site.name'),
    url: SITE_URL,
    logo: absoluteUrl(SITE_LOGO_PATH),
    image: absoluteUrl(SITE_IMAGE_PATH)
  };

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{__html: `(function(){try{var t=localStorage.getItem('game-wiki-theme');var d=t?t==='dark':matchMedia('(prefers-color-scheme: dark)').matches;document.documentElement.classList.toggle('dark',d);document.documentElement.dataset.theme=d?'dark':'light'}catch(e){}})()`}} />
      </head>
      <body>
        <template dangerouslySetInnerHTML={{__html: `<!--
THESIS: WheelMates reads like a two-lane RC marshal board, not a generic game-wiki hero.
OWN-WORLD: Cobalt and signal orange divide cream workbench paper; mechanical rails, wheel marks, and official gameplay imagery carry the system.
STORY: Visitors identify the released PC co-op game, confirm Friend's Pass and play modes, then move toward verified guides.
FIRST VIEWPORT: The official two-car scene fills the frame; the logo, compact answer-led copy, and Steam action sit on the left while both cars remain visible.
FORM: Slot-car marshal board, grounded direction 4, seed 75790ef1.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, and DESIGN.md
-->`}} />
        <NextIntlClientProvider messages={messages}>
          <JsonLd data={organization} />
          <SiteHeader groups={navigationGroups} />
          {children}
          <SiteFooter />
          <CookieConsent />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
