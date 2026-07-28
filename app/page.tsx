import type { Metadata } from 'next';
import OneRepMaxCalc from '@/components/OneRepMaxCalc';
import { SITE_NAME, SITE_URL } from '@/util/site';

// A server component so it can carry its own metadata and structured data.
// OneRepMaxCalc is the 'use client' boundary.
export const metadata: Metadata = {
  alternates: {
    canonical: '/',
  },
};

// Every answer below is visible in the rendered page (see HelpContent), which is
// what Google requires of FAQ markup. If that copy changes, change these too.
const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      '@id': `${SITE_URL}/#app`,
      name: SITE_NAME,
      url: `${SITE_URL}/`,
      applicationCategory: 'HealthApplication',
      operatingSystem: 'Any',
      browserRequirements: 'Requires JavaScript.',
      description:
        'Free 1 Rep Max (1RM) calculator. Estimates your one rep max from any set, shows every rep max and training percentage, and visualises which plates to load on the bar.',
      inLanguage: 'en-US',
      isAccessibleForFree: true,
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      publisher: {
        '@type': 'Organization',
        name: 'Code Gardener LLC',
      },
    },
    {
      '@type': 'FAQPage',
      '@id': `${SITE_URL}/#faq`,
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How do I use the 1 rep max calculator?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Warm up, then perform the lift in a rep range you are comfortable with, doing as many reps as you can with good form. Rep ranges under 8 generally yield more accurate estimates. Enter the weight you lifted and the number of reps you completed, and your estimated 1 rep max is the first value in the table.',
          },
        },
        {
          '@type': 'Question',
          name: 'Which formulas does the calculator use?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'It uses seven well known formulas: Brzycki, Epley, Lander, Lombardi, Mayhew et al., O’Connor et al., and Wathan. The results are averaged together to produce the final estimate.',
          },
        },
        {
          '@type': 'Question',
          name: 'What do the colors on the estimates mean?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The colors show how much the seven formulas disagree, measured as their standard deviation. Green means 2% or less, orange means 2% to 4%, and red means over 4%. A lower spread means more agreement between the formulas and a more confident estimate.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can I use it for any lift?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. Any lift works, from compound lifts like the bench press, squat, and deadlift to isolation lifts like bicep curls.',
          },
        },
      ],
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type='application/ld+json'
        // Escaping "<" keeps a stray closing tag in the data from ending the script.
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, '\\u003c'),
        }}
      />
      <OneRepMaxCalc />
    </>
  );
}
