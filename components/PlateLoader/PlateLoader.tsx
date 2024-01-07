import { FormatWeight, formatWeight, isMetricWeights } from '@/util/formatter';
import { Title, Text, Button, Alert } from '@mantine/core';
import './PlateLoader.css';
import { getAvailableWeights } from '../Settings';
import { SVGProps, useCallback, useEffect, useState } from 'react';
import {
  IconAlertTriangleFilled,
  IconMinus,
  IconPlus,
} from '@tabler/icons-react';
import { logEvent } from '@/util/analytics';

function roundWeightToSmallestPlate(
  weight: number,
  smallestPlate: number,
  rounding: 'floor' | 'closest',
  weightAdjustment: number
) {
  const barWeight = getBarWeight();
  const smallestIncrement = smallestPlate * 2;

  weight += smallestIncrement * weightAdjustment;

  if (weight <= barWeight) {
    return barWeight;
  }

  const remainingWeight = weight - barWeight;
  const mathFunc = rounding === 'closest' ? Math.round : Math.floor;
  const plateWeights =
    mathFunc(remainingWeight / smallestIncrement) * smallestIncrement;

  return plateWeights + barWeight;
}

const getBarWeight = () => {
  const isMetric = isMetricWeights();
  return isMetric ? 20 : 45;
};

export default function PlateLoader({ weight }: { weight: number }) {
  const [weightAdjustment, setWeightAdjustment] = useState<number>(0);
  const plateWeights = getAvailableWeights();
  const roundedWeight = roundWeightToSmallestPlate(
    weight,
    plateWeights[plateWeights.length - 1],
    'floor',
    weightAdjustment
  );

  useEffect(() => {
    setWeightAdjustment(0);
  }, [weight]);

  const weightAdjustmentCallback = useCallback(
    (adjustment: number) => {
      setWeightAdjustment(weightAdjustment + adjustment);
    },
    [weightAdjustment]
  );

  const diff = roundedWeight - weight;

  return (
    <div className='flex-1 flex flex-col items-center'>
      <div className='flex w-full pt-4 px-6 text-center'>
        <div className='flex-1'>
          <Title order={4}>Barbell Load</Title>
          <Text size='lg'>{formatWeight(roundedWeight, 1)}</Text>
        </div>
        <div className='flex-1'>
          <Title order={4}>Difference</Title>
          <Text size='lg' c={diff > 0 ? 'red' : 'green'}>
            <span className='flex items-center justify-center'>
              {diff > 0 && <IconAlertTriangleFilled size='1em' />}
              {diff > 0 && '+'}
              {formatWeight(diff, 1)}
            </span>
          </Text>
        </div>
      </div>
      {diff > 0 && (
        <div className='flex w-full pt-4 px-6'>
          <Alert
            variant='light'
            color='red'
            title='Warning'
            w='100%'
            icon={<IconAlertTriangleFilled size='1em' />}
          >
            This barbell load is {formatWeight(diff, 1)} heavier than your
            predicted rep max.
          </Alert>
        </div>
      )}
      <div>
        <LoadedBarbellVisual
          weight={roundedWeight}
          weightAdjustmentCallback={weightAdjustmentCallback}
        />
      </div>
    </div>
  );
}

function LoadedBarbellVisual({
  weight,
  weightAdjustmentCallback,
}: {
  weight: number;
  weightAdjustmentCallback: (weight: number) => void;
}) {
  const isMetric = isMetricWeights();
  const barWeight = isMetric ? 20 : 45;
  const plateWeights = getAvailableWeights();

  let weightToLoad = (weight - barWeight) / 2;
  let platesNeeded: number[] = [];

  plateWeights.forEach((plateWeight) => {
    while (weightToLoad >= plateWeight) {
      platesNeeded.push(plateWeight);
      weightToLoad -= plateWeight;
    }
  });

  const getColorName = (plate: number) => {
    if (isMetric) {
      switch (plate) {
        case 25:
        case 2.5:
          return 'red';
        case 20:
        case 2:
          return 'blue';
        case 15:
        case 1.5:
        case 1.25:
          return 'yellow';
        case 10:
        case 1:
          return 'green';
        case 5:
        case 0.5:
          return 'white';
        default:
          return '';
      }
    }
    switch (plate) {
      case 55:
        return 'red';
      case 45:
      case 5:
        return 'blue';
      case 35:
        return 'yellow';
      case 25:
      case 2.5:
        return 'green';
      case 10:
      case 1.25:
        return 'white';
      default:
        return '';
    }
  };

  // Function to determine the size of the plate based on its weight
  const getPlateSizeStyles = (plate: number) => {
    if (isMetric) {
      const height = plate >= 10 ? ((plate - 10) * 2.2) / 2 + 40 : 30;
      const width = plate >= 10 ? '100%' : `${6.6 * plate + 25}%`;
      return { height: `${height}px`, width };
    }

    const height = plate >= 25 ? (plate - 25) / 2 + 40 : 30;
    const width = plate >= 25 ? '100%' : `${3 * plate + 25}%`;
    return { height: `${height}px`, width };
  };

  return (
    <div
      className='plate-loader'
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '20px',
        width: '300px',
      }}
    >
      <div
        className='plate-loader__bar'
        style={{
          height: '50px',
          width: '30px',
          borderTopLeftRadius: '4px',
          borderTopRightRadius: '4px',
        }}
      ></div>
      {/* Plates */}
      {platesNeeded.reverse().map((plate, index) => {
        const { height, width } = getPlateSizeStyles(plate);
        return (
          <div
            key={index}
            className={`plate-loader__plate ${getColorName(plate)}`}
            style={{
              height,
              width,
            }}
          >
            <FormatWeight
              weight={plate}
              decimalPlaces={2}
              forceDecimals={false}
            />
          </div>
        );
      })}
      <div
        className='plate-loader__bar'
        style={{
          height: '15px',
          width: '50px',
          borderRadius: '2px',
        }}
      ></div>
      <div className='flex items-center gap-4'>
        <Button
          variant='subtle'
          onClick={() => {
            weightAdjustmentCallback(-1);
            logEvent('plate_loader_decrement');
          }}
        >
          <IconMinus size='1rem' />
        </Button>
        <div
          className='plate-loader__bar'
          style={{
            height: '50px',
            width: '20px',
            borderBottom: 'none',
          }}
        ></div>
        <Button
          variant='subtle'
          onClick={() => {
            weightAdjustmentCallback(1);
            logEvent('plate_loader_increment');
          }}
        >
          <IconPlus size='1rem' />
        </Button>
      </div>
    </div>
  );
}

const BarbellClip = (props?: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={40}
    height={22}
    fill='none'
    {...props}
  >
    <g clipPath='url(#a)'>
      <path
        className='plate-loader__clip-accent'
        fill='#333'
        d='M0 3a3 3 0 0 1 3-3h34a3 3 0 0 1 3 3v16a3 3 0 0 1-3 3H3a3 3 0 0 1-3-3V3Z'
      />
      <rect width={14} height={16} x={18} y={3} fill='#fff' rx={1} />
      <path
        className='plate-loader__clip-accent'
        fill='#333'
        d='M28 5h1v12h-1zM25 5h1v12h-1zM22 5h1v12h-1z'
      />
      <rect width={9} height={4} x={11} y={4} fill='#fff' rx={1} />
      <rect width={11} height={4} x={5} y={9} fill='#fff' rx={1} />
      <rect width={9} height={4} x={11} y={14} fill='#fff' rx={1} />
    </g>
    <defs>
      <clipPath id='a'>
        <path fill='#fff' d='M0 0h40v22H0z' />
      </clipPath>
    </defs>
  </svg>
);
