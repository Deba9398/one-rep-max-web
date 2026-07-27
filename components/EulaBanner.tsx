'use client';
import { Anchor, Button, Group, Paper, Text } from '@mantine/core';
import Link from 'next/link';
import { useState } from 'react';
import { logEvent } from '@/util/analytics';
import { useHydrated } from '@/util/units';
import { TERMS_VERSION } from './TermsContent';

const STORAGE_KEY = 'eulaAccepted';

// A dismissible bar rather than a blocking modal: an interstitial covering the content
// on arrival from search is what Google's intrusive interstitial guidance penalises,
// while a small easily-dismissed banner is explicitly allowed.
export default function EulaBanner() {
  const hydrated = useHydrated();
  const [dismissed, setDismissed] = useState(false);

  // Read storage only after hydration, so the banner is absent from the prerendered
  // HTML and the browser's first render reproduces it exactly.
  const accepted =
    hydrated && localStorage.getItem(STORAGE_KEY) === TERMS_VERSION;

  function accept() {
    localStorage.setItem(STORAGE_KEY, TERMS_VERSION);
    setDismissed(true);
    logEvent('accept_terms');
  }

  if (!hydrated || accepted || dismissed) {
    return null;
  }

  return (
    <Paper
      withBorder
      shadow='md'
      p='sm'
      role='region'
      aria-label='Terms of use notice'
      style={{
        position: 'fixed',
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 200,
        borderRadius: 0,
      }}
    >
      <Group justify='center' gap='md' wrap='wrap'>
        <Text size='sm' style={{ flex: '1 1 320px', maxWidth: 620 }}>
          Estimates are for information only &mdash; not medical, fitness, or
          training advice. By continuing you accept the{' '}
          <Anchor component={Link} href='/terms'>
            Terms of Use
          </Anchor>
          .
        </Text>
        <Group gap='xs' wrap='nowrap'>
          <Button
            component={Link}
            href='/terms'
            variant='subtle'
            size='sm'
            onClick={() => logEvent('open_terms_from_banner')}
          >
            Read terms
          </Button>
          <Button size='sm' onClick={accept}>
            Got it
          </Button>
        </Group>
      </Group>
    </Paper>
  );
}
