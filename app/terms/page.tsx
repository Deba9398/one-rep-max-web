import type { Metadata } from 'next';
import { Box, Card, Title } from '@mantine/core';
import TermsContent from '@/components/TermsContent';
import { pageSocialMetadata } from '@/util/site';

const title = 'Terms of Use & Disclaimer | 1 Rep Max (1RM) Calculator';
const description =
  'Terms of use and safety disclaimer for the 1 Rep Max Calculator. Estimates are for informational purposes only and are not medical, fitness, or professional training advice.';

// A server component on purpose: it needs no client state, so it can carry its own
// metadata and the whole page ends up in the prerendered HTML.
export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: '/terms',
  },
  ...pageSocialMetadata({ title, description, path: '/terms' }),
};

export default function TermsPage() {
  return (
    <main className='flex flex-col items-center'>
      <Box maw={800} mx='auto'>
        <Title order={2} size='h4' className='pb-4 pt-4 text-center'>
          Terms of Use &amp; Disclaimer
        </Title>
        <Card padding='xl' radius='lg' withBorder>
          <TermsContent />
        </Card>
      </Box>
    </main>
  );
}
