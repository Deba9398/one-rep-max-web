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
  Menu,
  rem,
  ActionIcon,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconExternalLink,
  IconMoon,
  IconSun,
  IconMessageDots,
  IconUser,
  IconSettings,
  IconLogout,
  IconLogin,
  IconBrandGoogle,
  IconBrandGoogleFilled,
} from '@tabler/icons-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { AuthProvider, useAuth } from '../components/AuthContext';
import {
  googleProvider,
  signInWithGooglePopupInit,
  signOutUser,
} from '@/util/firebase';
import { linkWithPopup } from 'firebase/auth';

const themeOverrides: MantineThemeOverride = {
  primaryShade: { light: 9, dark: 4 },
  headings: {
    fontWeight: '500',
  },
  colors: {
    dark: [
      '#C1C2C5',
      '#A6A7AB',
      '#909296',
      '#5c5f66',
      '#373A40',
      '#2C2E33',
      '#25262b',
      '#1A1B1E',
      '#141517',
      '#101113',
    ],
  },
};

export default function Template({ children }: { children: React.ReactNode }) {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AuthProvider>
      <MantineProvider defaultColorScheme='auto' theme={themeOverrides}>
        <AppShell
          header={{ height: 64 }}
          navbar={{
            width: 300,
            breakpoint: 'sm',
            collapsed: { mobile: !opened },
          }}
          padding='md'
        >
          <AppShell.Header
            style={{
              background: 'var(--app-shell-color)',
            }}
          >
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
              <Title
                visibleFrom='sm'
                order={1}
                size={24}
                className='truncate flex-1'
              >
                1 Rep Max Calculator
              </Title>
              <Title
                hiddenFrom='sm'
                order={1}
                size={24}
                className='truncate flex-1'
              >
                1 Rep Max
              </Title>
              <ColorSchemeToggle />
              <UserProfile />
            </Group>
          </AppShell.Header>

          <NavBar />
          <AppShell.Main>{children}</AppShell.Main>
        </AppShell>
      </MantineProvider>
    </AuthProvider>
  );
}

function UserProfile() {
  const authContext = useAuth();

  const loggedInMenu = (
    <Menu.Dropdown>
      <Menu.Label>{authContext.currentUser?.email}</Menu.Label>
      <Menu.Item
        leftSection={<IconLogout style={{ width: rem(14), height: rem(14) }} />}
        onClick={signOutUser}
      >
        Log Out
      </Menu.Item>
    </Menu.Dropdown>
  );

  const unauthenticatedMenu = (
    <Menu.Dropdown>
      <Menu.Label>Profile</Menu.Label>
      <Menu.Item
        leftSection={
          <IconBrandGoogleFilled style={{ width: rem(14), height: rem(14) }} />
        }
        onClick={signInWithGooglePopupInit}
      >
        Log In with Google
      </Menu.Item>
    </Menu.Dropdown>
  );

  const anonymousMenu = (
    <Menu.Dropdown>
      <Menu.Label>Anonymous</Menu.Label>
      <Menu.Item
        leftSection={
          <IconBrandGoogleFilled style={{ width: rem(14), height: rem(14) }} />
        }
        onClick={() => linkWithPopup(authContext.currentUser!, googleProvider)}
      >
        Log In with Google
      </Menu.Item>
      <Menu.Item
        leftSection={<IconLogout style={{ width: rem(14), height: rem(14) }} />}
        onClick={signOutUser}
      >
        Log Out
      </Menu.Item>
    </Menu.Dropdown>
  );

  return (
    <Menu shadow='md' width={200}>
      <Menu.Target>
        <ActionIcon
          variant='default'
          px={0}
          size='xl'
          aria-label={'User Profile'}
          onClick={() => {}}
        >
          {authContext.currentUser?.photoURL ? (
            <img
              src={authContext.currentUser?.photoURL}
              alt='profile'
              style={{ height: '100%', width: '100%', objectFit: 'cover' }}
            />
          ) : (
            <IconUser />
          )}
        </ActionIcon>
      </Menu.Target>
      {authContext.currentUser
        ? authContext.currentUser.isAnonymous
          ? anonymousMenu
          : loggedInMenu
        : unauthenticatedMenu}
    </Menu>
  );
}

function ColorSchemeToggle() {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light', {
    getInitialValueInEffect: true,
  });

  useEffect(() => {
    const metaThemeColor = document.querySelector('meta[name=theme-color]');
    const color = computedColorScheme === 'light' ? '#ffffff' : '#25262b';

    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', color);
    }
  }, [computedColorScheme]);

  return (
    <ActionIcon
      variant='default'
      size='xl'
      aria-label={
        computedColorScheme === 'light' ? 'Use Dark Mode' : 'Use Light Mode'
      }
      onClick={() => {
        const newTheme = computedColorScheme === 'light' ? 'dark' : 'light';
        setColorScheme(newTheme);
      }}
    >
      {computedColorScheme === 'light' ? <IconMoon /> : <IconSun />}
    </ActionIcon>
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
    <AppShell.Navbar
      p='md'
      style={{
        background: 'var(--app-shell-color)',
      }}
    >
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
      <NavLink
        label='Send Feedback'
        href='mailto:codegardenerllc@gmail.com?subject=1 Rep Max Web Feedback'
        rightSection={<IconMessageDots size='1rem' stroke={1.5} />}
      />
    </AppShell.Navbar>
  );
}
