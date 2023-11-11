'use client';
import PercentagesTable from '@/components/PercentagesTable';
import RepMaxTable, { RepMaxChart } from '@/components/RepMaxTable';
import { getWeightUnits } from '@/util/formatter';
import { calculateRepMaxValues } from '@/util/repMaxFormulas';
import {
  Box,
  Button,
  Card,
  NumberInput,
  NumberInputHandlers,
  Space,
  Title,
} from '@mantine/core';
import { useRef, useState } from 'react';

export default function OneRepMaxCalc() {
  const [weightLifted, setWeightLifted] = useState<number>(135);
  const [repsPerformed, setRepsPerformed] = useState<number>(8);

  const weightLiftedHandlersRef = useRef<NumberInputHandlers>(null);
  const weightLiftedInputRef = useRef<HTMLInputElement>(null);
  const repsPerformedHandlersRef = useRef<NumberInputHandlers>(null);
  const repsPerformedInputRef = useRef<HTMLInputElement>(null);

  const repMaxValues = calculateRepMaxValues(weightLifted, repsPerformed);

  return (
    <main className='flex flex-col items-center'>
      <Box maw={600} mx='auto'>
        <Card padding={'lg'} radius='md' withBorder>
          <div className='text-center'>
            <Title order={4} pb={8}>
              Weight ({getWeightUnits()})
            </Title>
            <Button.Group>
              <Button
                size='xl'
                disabled={weightLifted <= 0}
                onClick={() => weightLiftedHandlersRef.current?.decrement()}
                variant='light'
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
                px={0}
                radius={0}
                ref={weightLiftedInputRef}
                handlersRef={weightLiftedHandlersRef}
                onChange={(val) => setWeightLifted(parseFloat(val.toString()))}
                onFocus={() => weightLiftedInputRef.current?.select()}
                value={weightLifted}
                hideControls
                styles={{
                  input: {
                    textAlign: 'center',
                  },
                }}
              />
              <Button
                size='xl'
                disabled={weightLifted >= 1000}
                onClick={() => weightLiftedHandlersRef.current?.increment()}
                variant='light'
              >
                +
              </Button>
            </Button.Group>
          </div>

          <Space h={12} />
          <div className='text-center'>
            <Title order={4} pb={8}>
              Reps
            </Title>
            <Button.Group>
              <Button
                size='xl'
                disabled={repsPerformed <= 1}
                onClick={() => repsPerformedHandlersRef.current?.decrement()}
                variant='light'
              >
                -
              </Button>
              <NumberInput
                className='px-1 text-center'
                size='xl'
                inputMode='decimal'
                clampBehavior='strict'
                allowNegative={false}
                min={1}
                max={15}
                px={0}
                radius={0}
                ref={repsPerformedInputRef}
                handlersRef={repsPerformedHandlersRef}
                onChange={(val) => setRepsPerformed(parseFloat(val.toString()))}
                onFocus={() => repsPerformedInputRef.current?.select()}
                value={repsPerformed}
                hideControls
                styles={{
                  input: {
                    textAlign: 'center',
                  },
                }}
              />
              <Button
                size='xl'
                disabled={repsPerformed >= 15}
                onClick={() => repsPerformedHandlersRef.current?.increment()}
                variant='light'
              >
                +
              </Button>
            </Button.Group>
          </div>
        </Card>
      </Box>

      <div className='container mx-auto mt-8'>
        <RepMaxChart repMaxValues={repMaxValues} />
        <div className='flex flex-col items-center justify-center xl:flex-row xl:items-start -mx-2 lg:-mx-0'>
          <div className='px-2 xl:px-4 w-full xl:w-1/2 max-w-[600px]'>
            <Title order={4} className='pb-4 pt-4 text-center'>
              Rep Max
            </Title>
            <RepMaxTable repMaxValues={repMaxValues} />
          </div>
          <div className='px-2 xl:px-4 w-full xl:w-1/2 max-w-[600px]'>
            <Title order={4} className='pb-4 pt-4 text-center'>
              Percentages of 1RM
            </Title>
            <PercentagesTable repMaxValues={repMaxValues} />
          </div>
        </div>
      </div>
    </main>
  );
}
