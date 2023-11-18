'use client';
import PercentagesTable from '@/components/PercentagesTable';
import RepMaxTable from '@/components/RepMaxTable';
import { getWeightUnits, isMetricWeights } from '@/util/formatter';
import { calculateRepMaxValues } from '@/util/repMaxFormulas';
import {
  Box,
  Button,
  Card,
  Group,
  NumberInput,
  NumberInputHandlers,
  Space,
  Title,
} from '@mantine/core';
import { useRef, useState } from 'react';

export default function OneRepMaxCalc() {
  const [weightLifted, setWeightLifted] = useState<number>(
    isMetricWeights() ? 80 : 135
  );
  const [repsPerformed, setRepsPerformed] = useState<number>(8);

  const weightLiftedHandlersRef = useRef<NumberInputHandlers>(null);
  const weightLiftedInputRef = useRef<HTMLInputElement>(null);
  const repsPerformedHandlersRef = useRef<NumberInputHandlers>(null);
  const repsPerformedInputRef = useRef<HTMLInputElement>(null);

  const repMaxValues = calculateRepMaxValues(weightLifted, repsPerformed);

  const numberButtonProps = {
    size: 'xl',
    radius: '50%',
    w: 60,
    h: 60,
    p: 8,
    variant: 'light',
  };

  return (
    <main className='flex flex-col items-center'>
      <Box maw={600} mx='auto'>
        <Card padding='xl' radius='lg' withBorder>
          <div className='text-center'>
            <Title id='weightInputLabel' order={4} pb={8}>
              Weight ({getWeightUnits()})
            </Title>
            <Group gap={0}>
              <Button
                {...numberButtonProps}
                disabled={weightLifted <= 0}
                onClick={() => weightLiftedHandlersRef.current?.decrement()}
              >
                -
              </Button>
              <NumberInput
                className='text-center flex-1 px-4'
                size='xl'
                allowNegative={false}
                inputMode='decimal'
                aria-labelledby='weightInputLabel'
                min={0}
                max={1000}
                step={5}
                radius={'xl'}
                width={'100%'}
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
                {...numberButtonProps}
                disabled={weightLifted >= 1000}
                onClick={() => weightLiftedHandlersRef.current?.increment()}
              >
                +
              </Button>
            </Group>
          </div>

          <Space h={12} />
          <div className='text-center'>
            <Title id='repsInputLabel' order={4} pb={8}>
              Reps
            </Title>
            <Group gap={0}>
              <Button
                {...numberButtonProps}
                disabled={repsPerformed <= 1}
                onClick={() => repsPerformedHandlersRef.current?.decrement()}
              >
                -
              </Button>
              <NumberInput
                className='text-center flex-1 px-4'
                size='xl'
                inputMode='decimal'
                clampBehavior='strict'
                allowNegative={false}
                aria-labelledby='repsInputLabel'
                min={1}
                max={15}
                radius='xl'
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
                {...numberButtonProps}
                disabled={repsPerformed >= 15}
                onClick={() => repsPerformedHandlersRef.current?.increment()}
              >
                +
              </Button>
            </Group>
          </div>
          <Space h={12} />
        </Card>
      </Box>
      {/* 
      <PlateLoader weight={repMaxValues[1][0].value} /> */}

      <div className='container mx-auto mt-8'>
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
