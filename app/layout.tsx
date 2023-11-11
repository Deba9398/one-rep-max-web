import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { MantineProvider, ColorSchemeScript } from '@mantine/core';
import '@mantine/core/styles.css';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'One Rep Max Calculator',
  description:
    'A 1 rep max calculator is a tool that estimates the maximum weight a person can lift in a single repetition of an exercise based on their performance with lighter weights for multiple repetitions.',
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
      <body className={inter.className}>
        <MantineProvider defaultColorScheme='auto'>{children}</MantineProvider>
      </body>
    </html>
  );
}
