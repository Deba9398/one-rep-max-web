import { FormatWeight, formatWeight, isMetricWeights } from '@/util/formatter';
import { Title, Text } from '@mantine/core';
import './PlateLoader.css';
import { getAvailableWeights } from '../Settings';

function roundWeightToSmallestPlate(weight: number, smallestPlate: number) {
  return Math.round(weight / smallestPlate) * smallestPlate;
}

export default function PlateLoader({ weight }: { weight: number }) {
  const isMetric = isMetricWeights();
  const barWeight = isMetric ? 20 : 45;
  const plateWeights = getAvailableWeights();
  const roundedWeight = roundWeightToSmallestPlate(
    weight,
    plateWeights[plateWeights.length - 1]
  );
  let weightToLoad = (roundedWeight - barWeight) / 2;
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

  const totalWeight =
    platesNeeded.reduce((val, current) => val + current, 0) * 2 + barWeight;
  const diff = totalWeight - weight;

  return (
    <div className='flex-1 flex flex-col items-center'>
      <div className='flex w-full pt-4 px-6 text-center'>
        <div className='flex-1'>
          <Title order={4}>Closest Barbell Load</Title>
          <Text size='lg'>
            {formatWeight(
              platesNeeded.reduce((val, current) => val + current, 0) * 2 +
                barWeight
            )}
          </Text>
        </div>
        <div className='flex-1'>
          <Title order={4}>Difference</Title>
          <Text size='lg' c={diff > 0 ? 'red' : 'green'}>
            {diff > 0 && '+'}
            {formatWeight(diff, 1)}
          </Text>
        </div>
      </div>
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
        <div
          className='plate-loader__bar'
          style={{
            height: '50px',
            width: '20px',
            borderBottom: 'none',
          }}
        ></div>
      </div>
    </div>
  );
}
