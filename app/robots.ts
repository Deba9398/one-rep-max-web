import { MetadataRoute } from 'next';
import { SITE_URL } from '@/util/site';

export const dynamic = 'force-static';
export const revalidate = false;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // /settings is deliberately NOT disallowed. It carries robots: noindex, and a
      // crawler that is blocked here never fetches the page to see that directive —
      // Google can then still index the URL from inbound links. Blocking and
      // noindexing the same URL are mutually exclusive; noindex is the one we want.
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
