import { MetadataRoute } from 'next';
import { SITE_URL } from '@/util/site';

export const dynamic = 'force-static';
export const revalidate = false;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Nothing to rank for, and it duplicates the shell of every other page.
      disallow: '/settings',
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
