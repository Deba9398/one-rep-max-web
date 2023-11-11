'use client';
import PercentagesTable from '@/components/PercentagesTable';
import RepMaxTable from '@/components/RepMaxTable';
import {
  calculateOneRepMax,
  calculateRepMaxValues,
} from '@/util/repMaxFormulas';
import {
  Box,
  Button,
  NumberInput,
  NumberInputHandlers,
  Space,
  Title,
} from '@mantine/core';
import { useRef, useState } from 'react';

export function OneRepMaxCalc() {
  const [weightLifted, setWeightLifted] = useState<number>(135);
  const [repsPerformed, setRepsPerformed] = useState<number>(8);

  const weightLiftedRef = useRef<NumberInputHandlers>(null);
  const repsPerformedRef = useRef<NumberInputHandlers>(null);

  const oneRepMax = calculateOneRepMax(weightLifted, repsPerformed);
  const repMaxValues = calculateRepMaxValues(weightLifted, repsPerformed);

  return (
    <main className='flex min-h-screen flex-col items-center justify-between'>
      <div className='flex items-center justify-between'>
        <Box maw={340} mx='auto'>
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
              className='px-1 text-center'
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
              label='Weight'
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
              className='px-1 text-center'
              size='xl'
              inputMode='decimal'
              suffix=' reps'
              clampBehavior='strict'
              allowNegative={false}
              min={0}
              max={15}
              handlersRef={repsPerformedRef}
              onChange={(val) => setRepsPerformed(parseFloat(val.toString()))}
              value={repsPerformed}
              label='Reps'
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

          <Title order={3} className='pb-4 pt-4 text-center'>
            Rep Max
          </Title>
          <RepMaxTable repMaxValues={repMaxValues} />

          <Space h='lg' />
          <Title order={3} className='pb-4 pt-4 text-center'>
            Percentages of 1RM
          </Title>
          <PercentagesTable oneRepMax={oneRepMax} />

          <Space h='lg' />
        </Box>
      </div>
    </main>
  );
}
