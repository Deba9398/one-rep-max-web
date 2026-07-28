import type { Metadata } from 'next';
import { Box, Card, Title } from '@mantine/core';
import PrivacyContent from '@/components/PrivacyContent';

export const metadata: Metadata = {
  title: 'Privacy Policy | 1 Rep Max (1RM) Calculator',
  description:
    'Privacy policy for the 1 Rep Max Calculator. Your lifts and settings are stored in your own browser and are never sent to us. Explains what Google Analytics collects and how to opt out.',
};

export default function PrivacyPage() {
  return (
    <main className='flex flex-col items-center'>
      <Box maw={800} mx='auto'>
        <Title order={2} size='h4' className='pb-4 pt-4 text-center'>
          Privacy Policy
        </Title>
        <Card padding='xl' radius='lg' withBorder>
          <PrivacyContent />
        </Card>
      </Box>
    </main>
  );
}
