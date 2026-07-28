'use client';
import PercentagesTable from '@/components/PercentagesTable';
import RepMaxTable from '@/components/RepMaxTable';
import { useUnitPreference } from '@/util/units';
import { calculateRepMaxValues } from '@/util/repMaxFormulas';
import {
  Box,
  Button,
  Card,
  Group,
  NumberInput,
  NumberInputHandlers,
  SegmentedControl,
  Space,
  Title,
} from '@mantine/core';
import { IconMinus, IconPlus } from '@tabler/icons-react';
import { SetStateAction, useEffect, useMemo, useRef, useState } from 'react';
import { HelpContent } from './Help';
import { logEvent } from '@/util/analytics';
import {
  DEFAULT_REPS_PERFORMED,
  DEFAULT_WEIGHT_LIFTED_IMPERIAL,
  getLastRepsPerformed,
  getLastWeightLifted,
  setLastRepsPerformed,
  setLastWeightLifted,
} from '@/util/localStorage';

export default function OneRepMaxCalc() {
  const { units, isMetric, setUnits, hydrated } = useUnitPreference();

  // Seeded with the build-time defaults so the first render matches the static HTML,
  // then replaced with the visitor's saved values once we're past hydration.
  const [weightLifted, setWeightLifted] = useState<number>(
    DEFAULT_WEIGHT_LIFTED_IMPERIAL
  );
  const [repsPerformed, setRepsPerformed] = useState<number>(
    DEFAULT_REPS_PERFORMED
  );

  useEffect(() => {
    if (!hydrated) {
      return;
    }

    setWeightLifted(getLastWeightLifted(isMetric));
    setRepsPerformed(getLastRepsPerformed());
    // Runs once, when the stored unit preference lands. After that these values are owned
    // by user input, and the unit toggle converts them rather than re-reading storage.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hydrated]);

  const updateWeightLiftedAndCache = (weightLifted: number) => {
    setLastWeightLifted(weightLifted);
    setWeightLifted(weightLifted);
  };

  const updateRepsPerformedAndCache = (repsPerformed: number) => {
    setLastRepsPerformed(repsPerformed);
    setRepsPerformed(repsPerformed);
  };

  const updateUnitPreference = (val: SetStateAction<string>) => {
    if (val === 'kg') {
      updateWeightLiftedAndCache(Math.round(weightLifted / 2.20462));
    } else {
      updateWeightLiftedAndCache(Math.round(weightLifted * 2.20462));
    }

    setUnits(val.toString());
    logEvent('change_units_pref_orm');
  };

  const helpMemoized = useMemo(() => {
    return (
      <Card padding='xl' radius='lg' withBorder>
        <HelpContent isMetricWeights={isMetric} />
      </Card>
    );
  }, [isMetric]);

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

  // Not <main>: AppShell.Main already renders the page's main landmark.
  return (
    <div className='flex flex-col items-center'>
      <Box maw={600} mx='auto'>
        <Card padding='xl' radius='lg' withBorder>
          <div className='text-center'>
            <SegmentedControl
              fullWidth
              value={units}
              onChange={updateUnitPreference}
              data={[
                { label: 'Imperial (Lbs)', value: 'lbs' },
                { label: 'Metric (Kg)', value: 'kg' },
              ]}
            />
            <Space h={12} />
            <Title id='weightInputLabel' order={2} size='h4' pb={8}>
              Weight ({units})
            </Title>
            <Group gap={0}>
              <Button
                {...numberButtonProps}
                disabled={weightLifted <= 0}
                onClick={() => {
                  weightLiftedHandlersRef.current?.decrement();
                  logEvent('click_decrement_weight');
                }}
                aria-label='Decrement Weight'
              >
                <IconMinus size='1rem' />
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
                onChange={(val) => {
                  updateWeightLiftedAndCache(parseFloat(val.toString()));
                  logEvent('change_weight_lifted');
                }}
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
                onClick={() => {
                  weightLiftedHandlersRef.current?.increment();
                  logEvent('click_increment_weight');
                }}
                aria-label='Increment Weight'
              >
                <IconPlus size='1rem' />
              </Button>
            </Group>
          </div>

          <Space h={12} />
          <div className='text-center'>
            <Title id='repsInputLabel' order={2} size='h4' pb={8}>
              Reps
            </Title>
            <Group gap={0}>
              <Button
                {...numberButtonProps}
                disabled={repsPerformed <= 1}
                onClick={() => {
                  repsPerformedHandlersRef.current?.decrement();
                  logEvent('click_decrement_reps');
                }}
                aria-label='Decrement Reps'
              >
                <IconMinus size='1rem' />
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
                onChange={(val) => {
                  updateRepsPerformedAndCache(parseFloat(val.toString()));
                  logEvent('change_reps_performed');
                }}
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
                onClick={() => {
                  repsPerformedHandlersRef.current?.increment();
                  logEvent('click_increment_reps');
                }}
                aria-label='Increment Reps'
              >
                <IconPlus size='1rem' />
              </Button>
            </Group>
          </div>
        </Card>
      </Box>

      <div className='container mx-auto mt-8'>
        <div className='flex flex-col items-center justify-center xl:flex-row xl:items-start -mx-2 lg:-mx-0'>
          <div className='px-2 xl:px-4 w-full xl:w-1/2 max-w-[600px]'>
            <Title order={2} size='h4' className='pb-4 pt-4 text-center'>
              Rep Max
            </Title>
            <RepMaxTable repMaxValues={repMaxValues} />
          </div>
          <div className='px-2 xl:px-4 w-full xl:w-1/2 max-w-[600px]'>
            <Title order={2} size='h4' className='pb-4 pt-4 text-center'>
              Percentages of 1RM
            </Title>
            <PercentagesTable repMaxValues={repMaxValues} />
          </div>
        </div>
      </div>
      <div className='container mx-auto mt-8 max-w-[1200px] xl:px-4'>
        {helpMemoized}
      </div>
    </div>
  );
}
