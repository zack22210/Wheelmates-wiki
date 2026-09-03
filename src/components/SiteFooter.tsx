import Image from 'next/image';
import {ExternalLink} from 'lucide-react';
import {getTranslations} from 'next-intl/server';
import {Link} from '@/i18n/navigation';
import {SITE_LOGO_PATH} from '@/config/site';

type FooterConfig = {
  navigationLabel: string;
  notice: string;
  links: Array<{label: string; kind: 'external' | 'internal'; href?: string; linkKey?: string}>;
};

export async function SiteFooter({locale}: {locale: string}) {
  // Keep the locale explicit during parallel static generation. This component
  // renders outside the page-level try/catch, so an implicit request locale can
  // otherwise surface only as an opaque Server Components prerender error.
  const t = await getTranslations({locale});
  const config = t.raw('footer') as FooterConfig;
  const externalLinks = t.raw('links') as Record<string, string>;

  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div className="footer-brand">
          <span className="brand-mark"><Image src={SITE_LOGO_PATH} alt="" width={106} height={64} /></span>
          <div>
            <strong>{t('site.name')}</strong>
            <p>{config.notice}</p>
          </div>
        </div>
        <nav aria-label={config.navigationLabel}>
          {config.links.map((item) => {
            const href = item.kind === 'external' && item.linkKey ? externalLinks[item.linkKey] : item.href;
            if (!href) return <span key={item.label}>{item.label}</span>;
            return item.kind === 'external' ? (
              <a href={href} target="_blank" rel="noreferrer" key={item.label}>
                {item.label} <ExternalLink aria-hidden="true" />
              </a>
            ) : (
              <Link href={href} key={item.label}>{item.label}</Link>
            );
          })}
        </nav>
      </div>
    </footer>
  );
}
