import type { Metadata } from 'next';

// The single canonical origin. The apex is the canonical host: www and plain http
// both 301 here at the Cloudflare edge, so every generated URL must use this exact
// form or we hand crawlers a redirect hop for no reason.
export const SITE_URL = 'https://onerepmaxcalc.com';

export const SITE_NAME = '1 Rep Max Calculator';

/**
 * Builds the openGraph/twitter block for a page.
 *
 * Next does not deep-merge `openGraph` from the parent layout: a page that declares
 * its own replaces the parent's outright. Without this helper every page inherited
 * the root's og:url and og:title, so /terms and /privacy both told crawlers they
 * were the homepage.
 *
 * The image has to be listed explicitly for the same reason. The
 * app/opengraph-image.png file convention only injects itself into a segment that
 * has not declared its own openGraph block, so once these pages declared one they
 * silently lost their og:image.
 */
const OG_IMAGE = {
  url: '/opengraph-image.png',
  width: 1200,
  height: 630,
  alt: '1 Rep Max Calculator - estimate your one rep max for any lift',
};

export function pageSocialMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Pick<Metadata, 'openGraph' | 'twitter'> {
  return {
    openGraph: {
      type: 'website',
      siteName: SITE_NAME,
      locale: 'en_US',
      title,
      description,
      url: path,
      images: [OG_IMAGE],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [OG_IMAGE],
    },
  };
}
