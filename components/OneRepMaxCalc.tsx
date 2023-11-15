'use client';
import PercentagesTable from '@/components/PercentagesTable';
import RepMaxTable from '@/components/RepMaxTable';
import { getWeightUnits } from '@/util/formatter';
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
  const [weightLifted, setWeightLifted] = useState<number>(135);
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
            <Title order={4} pb={8}>
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
            <Title order={4} pb={8}>
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

      <BarbellPlate weight={repMaxValues[1][0].value} />

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

const BarbellPlate = ({ weight }: { weight: number }) => {
  const barWeight = 45;
  const plateWeights = [45, 25, 10, 5, 2.5]; // In pounds
  let weightToLoad = (weight - barWeight) / 2;
  let platesNeeded = [];

  plateWeights.forEach((plateWeight) => {
    while (weightToLoad >= plateWeight) {
      platesNeeded.push(plateWeight);
      weightToLoad -= plateWeight;
    }
  });

  // Function to determine the color of the plate based on Olympic standards
  const getPlateColor = (plate) => {
    switch (plate) {
      case 55:
        return '#EF5350'; // 55 lb is typically red
      case 45:
        return '#42A5F5'; // 45lb is typically red
      case 35:
        return '#FFEE58'; // 35lb is typically blue
      case 25:
        return '#66BB6A'; // 25lb is typically green
      case 10:
        return 'white'; // 10lb is typically not standardized, gray for simplicity
      case 5:
        return '#42A5F5'; // 5lb is typically white
      case 2.5:
        return '#66BB6A'; // 2.5lb is typically black
      default:
        return 'black';
    }
  };

  // Function to determine the size of the plate based on its weight
  const getPlateSizeStyles = (plate) => {
    const baseWidth = 1.5; // Base width for the smallest plate
    const height = plate >= 25 ? '100%' : `${3 * plate + 25}%`;
    const width = plate >= 25 ? baseWidth * plate : 30;
    return { height, width: `${width}px` };
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        marginTop: '20px',
        height: '300px',
      }}
    >
      {/* Bar */}
      <div
        style={{
          height: '20px',
          width: '200px',
          backgroundColor: '#adb5bd',
          position: 'relative',
        }}
      ></div>
      <div
        style={{
          height: '50px',
          width: '15px',
          backgroundColor: '#adb5bd',
          position: 'relative',
        }}
      ></div>
      {/* Plates */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          height: '100%',
        }}
      >
        {platesNeeded.map((plate, index) => {
          const { height, width } = getPlateSizeStyles(plate);
          return (
            <div
              key={index}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height,
                width,
                backgroundColor: getPlateColor(plate),
                border: '1px solid black',
                borderRadius: '8px',
                writingMode: 'vertical-rl',
                textOrientation: 'mixed',
                fontSize: '20px',
                fontWeight: '500',
                //position: 'absolute',
                //left: `${300 + index * (parseInt(width) + 2)}px`, // Position plates along the bar
              }}
            >
              {plate}
            </div>
          );
        })}
      </div>
      <div
        style={{
          height: '30px',
          width: '100px',
          backgroundColor: '#adb5bd',
          position: 'relative',
        }}
      ></div>
    </div>
  );
};
