'use client';
import RepMaxTable from '@/components/RepMaxTable';
import { calculateRepMaxValues } from '@/util/repMaxFormulas';
import { Box, NumberInput, Title } from '@mantine/core';
import { useState } from 'react';

export default function Home() {
  const [weightLifted, setWeightLifted] = useState<number>(135);
  const [repsPerformed, setRepsPerformed] = useState<number>(8);

  const oneRepMax = calculateRepMaxValues(weightLifted, repsPerformed);

  return (
    <main className='flex min-h-screen flex-col items-center justify-between'>
      <div className='flex items-center justify-between'>
        <Box maw={340} mx='auto'>
          <Title order={2} className='pb-4 pt-4'>
            1 Rep Max Calculator
          </Title>
          <NumberInput
            size='lg'
            className='pb-4'
            onChange={(val) => setWeightLifted(parseFloat(val.toString()))}
            defaultValue={weightLifted}
            label='Weight Lifted (lbs)'
          />
          <NumberInput
            size='lg'
            className='pb-8'
            onChange={(val) => setRepsPerformed(parseFloat(val.toString()))}
            defaultValue={repsPerformed}
            label='Reps Performed'
          />

          <RepMaxTable repMaxValues={oneRepMax} />
        </Box>
      </div>
    </main>
  );
}
