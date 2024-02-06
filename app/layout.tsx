import type { Metadata } from 'next';
import { ColorSchemeScript } from '@mantine/core';
import '@mantine/core/styles.css';
import './globals.css';
import { GoogleAnalytics } from '@next/third-parties/google';

const isProduction = process.env.NODE_ENV === 'production';

export const metadata: Metadata = {
  title: '1 Rep Max (1RM) Calculator',
  description:
    'The best 1 Rep Max (1RM) Calculator. Get percentage breakdowns and view the barbell loader with this free web app. Works for Bench Press, Squat, Deadlift, and more!',
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
      </body>
      {isProduction && <GoogleAnalytics gaId='G-TS8S6LZJLM' />}
    </html>
  );
}
