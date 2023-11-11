'use client';
import { AppShell, Burger, Group, NavLink, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconExternalLink } from '@tabler/icons-react';
import Image from 'next/image';

import dynamic from 'next/dynamic';

const OneRepMaxCalc = dynamic(() => import('../components/OneRepMaxCalc'), {
  ssr: false,
});

export default function Home() {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 64 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding='md'
    >
      <AppShell.Header>
        <Group h='100%' px='md'>
          <Burger opened={opened} onClick={toggle} hiddenFrom='sm' size='sm' />
          <Image
            src='/logo.png'
            alt='1RM Calc Logo'
            width={36}
            height={36}
            priority
          />
          <Title order={3} className='pb-4 pt-4 text-center'>
            1 Rep Max Calculator
          </Title>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p='md'>
        <NavLink label='1 Rep Max Calculator' active />
        <NavLink
          label='Strength Standards'
          href='https://exrx.net/Testing/WeightLifting/StrengthStandards'
          target='_blank'
          rightSection={<IconExternalLink size='1rem' stroke={1.5} />}
        />
      </AppShell.Navbar>
      <AppShell.Main>
        <OneRepMaxCalc />
      </AppShell.Main>
    </AppShell>
  );
}
