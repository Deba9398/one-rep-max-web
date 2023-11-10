'use client';
import RepMaxTable from '@/components/RepMaxTable';
import { calculateRepMaxValues } from '@/util/repMaxFormulas';
import { Box, NumberInput, NumberInputHandlers, Title } from '@mantine/core';
import { useRef, useState } from 'react';

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
            allowNegative={false}
            inputMode='decimal'
            suffix=' lbs'
            min={0}
            max={1000}
            onChange={(val) => setWeightLifted(parseFloat(val.toString()) || 0)}
            value={weightLifted}
            label='Weight Lifted (lbs)'
            hideControls
          />
          <NumberInput
            size='lg'
            inputMode='decimal'
            className='pb-8'
            suffix=' reps'
            clampBehavior='strict'
            allowNegative={false}
            min={0}
            max={15}
            onChange={(val) =>
              setRepsPerformed(parseFloat(val.toString()) || 1)
            }
            value={repsPerformed}
            label='Reps Performed'
            hideControls
          />

          <RepMaxTable repMaxValues={oneRepMax} />
        </Box>
      </div>
    </main>
  );
}
