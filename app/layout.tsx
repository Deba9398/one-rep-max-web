import type { Metadata, Viewport } from 'next';
import { ColorSchemeScript, mantineHtmlProps } from '@mantine/core';
import '@mantine/core/styles.css';
import { GoogleAnalytics } from '@next/third-parties/google';
import './globals.css';

const isProduction = process.env.NODE_ENV === 'production';

// Cloudflare Web Analytics. Cookieless and no consent banner required, unlike Google
// Analytics. Paste the token from Cloudflare dashboard -> Web Analytics -> your site;
// it is public, the same as the GA measurement id. Leave empty to not load the beacon.
//
// Not needed at all if the site runs on Cloudflare Pages with Web Analytics enabled in
// the project settings -- Cloudflare injects the beacon at the edge in that case.
const CLOUDFLARE_BEACON_TOKEN = '';

export const metadata: Metadata = {
  title: '1 Rep Max (1RM) Calculator',
  description:
    'The best 1 Rep Max (1RM) Calculator. Get percentage breakdowns and view the barbell loader with this free web app. Works for Bench Press, Squat, Deadlift, and more!',
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
      {isProduction && CLOUDFLARE_BEACON_TOKEN && (
        <script
          defer
          src='https://static.cloudflareinsights.com/beacon.min.js'
          data-cf-beacon={JSON.stringify({ token: CLOUDFLARE_BEACON_TOKEN })}
        />
      )}
      {isProduction && <GoogleAnalytics gaId='G-TS8S6LZJLM' />}
    </html>
  );
}
