'use client';
import dynamic from 'next/dynamic';

const LogNoSsr = dynamic(() => import('./Log'), {
  ssr: false,
});

export default function Log() {
  return <LogNoSsr />;
}
