import type { Metadata } from 'next';
import { ColorSchemeScript } from '@mantine/core';
import '@mantine/core/styles.css';
import './globals.css';
import Script from 'next/script';

const isProduction = process.env.NODE_ENV === 'production';

export const metadata: Metadata = {
  title: 'One Rep Max (1RM) Calculator',
  description:
    'Calculate your one rep max (1RM), get percentage breakdowns, and visualize barbell plate configurations with this free web app. Works for Bench Press, Squat, Deadlift, and more!',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        {children}
        <GoogleAnalytics />
      </body>
    </html>
  );
}

function GoogleAnalytics() {
  if (!isProduction) {
    return null;
  }

  return (
    <>
      <Script
        async
        src='https://www.googletagmanager.com/gtag/js?id=G-TS8S6LZJLM'
      />
      <Script id='google-analytics'>
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-TS8S6LZJLM');
          `}
      </Script>
    </>
  );
}
