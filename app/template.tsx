'use client';
import {
  AppShell,
  Group,
  Burger,
  Title,
  NavLink,
  Divider,
  Button,
  useMantineColorScheme,
  useComputedColorScheme,
  CSSVariablesResolver,
  MantineProvider,
  MantineThemeOverride,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconExternalLink, IconMoon, IconSun } from '@tabler/icons-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const resolver: CSSVariablesResolver = (theme) => ({
  variables: {
    '--title-fw': '500',
  },
  light: {
    '--app-body-background': '#f8f9fa',
    '--mantine-color-text': '#333',
  },
  dark: {
    '--app-body-background': '--mantine-color-body',
  },
});

const themeOverrides: MantineThemeOverride = {
  primaryShade: { light: 9, dark: 4 },
  headings: {
    fontWeight: '500',
  },
};

export default function Template({ children }: { children: React.ReactNode }) {
  const [opened, { toggle }] = useDisclosure();

  return (
    <MantineProvider
      defaultColorScheme='auto'
      cssVariablesResolver={resolver}
      theme={themeOverrides}
    >
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
          <Group h='100%' w='100%' px='md'>
            <Burger
              opened={opened}
              onClick={toggle}
              aria-label='Menu'
              hiddenFrom='sm'
              size='sm'
            />
            <Image
              src='/logo.png'
              alt='1RM Calc Logo'
              width={36}
              height={36}
              priority
            />
            <Title order={3} className='truncate flex-1'>
              1 Rep Max Calculator
            </Title>
            <ColorSchemeToggle />
          </Group>
        </AppShell.Header>

        <NavBar />
        <AppShell.Main
          style={{
            background: 'var(--app-body-background)',
          }}
        >
          {children}
        </AppShell.Main>
      </AppShell>
    </MantineProvider>
  );
}

function ColorSchemeToggle() {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light', {
    getInitialValueInEffect: true,
  });

  return (
    <Button
      variant='default'
      px={16}
      size='lg'
      aria-label={
        computedColorScheme === 'light' ? 'Use Dark Mode' : 'Use Light Mode'
      }
      onClick={() =>
        setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')
      }
    >
      {computedColorScheme === 'light' ? <IconMoon /> : <IconSun />}
    </Button>
  );
}

function NavBar() {
  const pathname = usePathname();

  const activeLinks = [
    {
      label: '1 Rep Max Calculator',
      href: '/',
    },
    {
      label: 'Settings',
      href: '/settings',
    },
  ];

  return (
    <AppShell.Navbar p='md'>
      {activeLinks.map((l) => (
        <NavLink
          key={l.label}
          label={l.label}
          component={Link}
          href={l.href}
          active={pathname === l.href}
        />
      ))}
      <Divider my='sm' />
      <NavLink
        label='Strength Standards'
        href='https://exrx.net/Testing/WeightLifting/StrengthStandards'
        target='_blank'
        rightSection={<IconExternalLink size='1rem' stroke={1.5} />}
      />
    </AppShell.Navbar>
  );
}
