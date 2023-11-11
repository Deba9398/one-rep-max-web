'use client';
import PercentagesTable from '@/components/PercentagesTable';
import RepMaxTable from '@/components/RepMaxTable';
import { getWeightUnits } from '@/util/formatter';
import { calculateRepMaxValues } from '@/util/repMaxFormulas';
import {
  Box,
  Button,
  NumberInput,
  NumberInputHandlers,
  Title,
} from '@mantine/core';
import { useRef, useState } from 'react';

export default function OneRepMaxCalc() {
  const [weightLifted, setWeightLifted] = useState<number>(135);
  const [repsPerformed, setRepsPerformed] = useState<number>(8);

  const weightLiftedRef = useRef<NumberInputHandlers>(null);
  const repsPerformedRef = useRef<NumberInputHandlers>(null);

  const repMaxValues = calculateRepMaxValues(weightLifted, repsPerformed);

  return (
    <main className='flex flex-col items-center'>
      <Box maw={600} mx='auto'>
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
            min={0}
            max={1000}
            step={5}
            handlersRef={weightLiftedRef}
            onChange={(val) => setWeightLifted(parseFloat(val.toString()))}
            value={weightLifted}
            label={`Weight (${getWeightUnits()})`}
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
      </Box>

      <div className='container mx-auto'>
        <div className='flex flex-col items-center justify-center xl:flex-row xl:items-start -mx-2 lg:-mx-0'>
          <div className='px-2 xl:px-4 w-full xl:w-1/2 max-w-[600px]'>
            <Title order={3} className='pb-4 pt-4 text-center'>
              Rep Max
            </Title>
            <RepMaxTable repMaxValues={repMaxValues} />
          </div>
          <div className='px-2 xl:px-4 w-full xl:w-1/2 max-w-[600px]'>
            <Title order={3} className='pb-4 pt-4 text-center'>
              Percentages of 1RM
            </Title>
            <PercentagesTable repMaxValues={repMaxValues} />
          </div>
        </div>
      </div>
    </main>
  );
}
