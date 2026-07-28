import type { Metadata, Viewport } from 'next';
import { ColorSchemeScript, mantineHtmlProps } from '@mantine/core';
import '@mantine/core/styles.css';
import { GoogleAnalytics } from '@next/third-parties/google';
import { SITE_NAME, SITE_URL, pageSocialMetadata } from '@/util/site';
import './globals.css';

const isProduction = process.env.NODE_ENV === 'production';

const description =
  'The best 1 Rep Max (1RM) Calculator. Get percentage breakdowns and view the barbell loader with this free web app. Works for Bench Press, Squat, Deadlift, and more!';

export const metadata: Metadata = {
  // Makes every relative canonical/openGraph URL below resolve against the canonical
  // apex. Without it Next emits relative URLs that crawlers resolve per-host, which
  // is exactly the ambiguity the www -> apex redirect exists to remove.
  metadataBase: new URL(SITE_URL),
  title: '1 Rep Max (1RM) Calculator',
  description,
  applicationName: SITE_NAME,
  alternates: {
    canonical: '/',
  },
  ...pageSocialMetadata({
    title: '1 Rep Max (1RM) Calculator',
    description,
    path: '/',
  }),
};

export const viewport: Viewport = {
  themeColor: '#FFF',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // mantineHtmlProps carries data-mantine-color-scheme AND suppressHydrationWarning.
  // ColorSchemeScript rewrites that attribute from the stored preference before React
  // hydrates, so without the suppression React reports the rewrite as a mismatch.
  // defaultColorScheme must match MantineProvider in template.tsx.
  return (
    <html lang='en' {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript defaultColorScheme='auto' />
      </head>
      <body>{children}</body>
      {/* Cloudflare Web Analytics is enabled on the Pages project and injected at
          the edge, so there is no beacon script to add here. */}
      {isProduction && <GoogleAnalytics gaId='G-TS8S6LZJLM' />}
    </html>
  );
}
