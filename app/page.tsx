'use client';
import dynamic from 'next/dynamic';

const OneRepMaxCalc = dynamic(() => import('../components/OneRepMaxCalc'), {
  ssr: false,
});

export default function Home() {
  return <OneRepMaxCalc />;
}
