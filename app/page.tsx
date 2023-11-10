'use client';
import RepMaxTable from '@/components/RepMaxTable';
import { calculateRepMaxValues } from '@/util/repMaxFormulas';
import {
  Box,
  Button,
  NumberInput,
  NumberInputHandlers,
  Title,
} from '@mantine/core';
import { useRef, useState } from 'react';

export default function Home() {
  const [weightLifted, setWeightLifted] = useState<number>(135);
  const [repsPerformed, setRepsPerformed] = useState<number>(8);

  const weightLiftedRef = useRef<NumberInputHandlers>(null);
  const repsPerformedRef = useRef<NumberInputHandlers>(null);

  const oneRepMax = calculateRepMaxValues(weightLifted, repsPerformed);

  return (
    <main className='flex min-h-screen flex-col items-center justify-between'>
      <div className='flex items-center justify-between'>
        <Box maw={340} mx='auto'>
          <Title order={2} className='pb-4 pt-4'>
            1 Rep Max Calculator
          </Title>
          <div className='flex items-end pb-4 text-center'>
            <Button
              size='xl'
              disabled={weightLifted <= 0}
              onClick={() => weightLiftedRef.current?.decrement()}
              variant='default'
            >
              -
            </Button>
            <NumberInput
              size='xl'
              allowNegative={false}
              inputMode='decimal'
              suffix=' lbs'
              min={0}
              max={1000}
              step={5}
              handlersRef={weightLiftedRef}
              onChange={(val) => setWeightLifted(parseFloat(val.toString()))}
              value={weightLifted}
              label='Weight Lifted (lbs)'
              hideControls
            />
            <Button
              size='xl'
              disabled={weightLifted >= 1000}
              onClick={() => weightLiftedRef.current?.increment()}
              variant='default'
            >
              +
            </Button>
          </div>

          <div className='flex items-end pb-8 text-center'>
            <Button
              size='xl'
              disabled={repsPerformed <= 1}
              onClick={() => repsPerformedRef.current?.decrement()}
              variant='default'
            >
              -
            </Button>
            <NumberInput
              size='xl'
              inputMode='decimal'
              suffix=' reps'
              className='text-center'
              clampBehavior='strict'
              allowNegative={false}
              min={0}
              max={15}
              handlersRef={repsPerformedRef}
              onChange={(val) => setRepsPerformed(parseFloat(val.toString()))}
              value={repsPerformed}
              label='Reps Performed'
              hideControls
            />
            <Button
              size='xl'
              disabled={repsPerformed >= 15}
              onClick={() => repsPerformedRef.current?.increment()}
              variant='default'
            >
              +
            </Button>
          </div>

          <RepMaxTable repMaxValues={oneRepMax} />
        </Box>
      </div>
    </main>
  );
}
