import { MetadataRoute } from 'next';
import { SITE_URL } from '@/util/site';

export const dynamic = 'force-static';
export const revalidate = false;

// Static export has no request time, so this is the build time. That is the honest
// answer for a site whose content only changes when it is rebuilt.
const lastModified = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      // No trailing slash, so this matches the emitted <link rel="canonical"> exactly.
      url: SITE_URL,
      lastModified,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${SITE_URL}/terms`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/privacy`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];
}
