'use client';
import dynamic from 'next/dynamic';

const SettingsNoSsr = dynamic(() => import('../../components/Settings'), {
  ssr: false,
});

export default function Settings() {
  return <SettingsNoSsr />;
}
