import { formatWeight } from '@/util/formatter';
import { Title, Text } from '@mantine/core';
import './PlateLoader.css';

export default function PlateLoader({ weight }: { weight: number }) {
  const barColor = '#666';
  const barWeight = 45;
  const plateWeights = [45, 35, 25, 10, 5, 2.5]; // In pounds
  let weightToLoad = (weight - barWeight) / 2;
  let platesNeeded: number[] = [];

  plateWeights.forEach((plateWeight) => {
    while (weightToLoad >= plateWeight) {
      platesNeeded.push(plateWeight);
      weightToLoad -= plateWeight;
    }
  });

  const getColorName = (plate: number) => {
    switch (plate) {
      case 55:
        return 'red';
      case 45:
        return 'blue';
      case 35:
        return 'yellow'; // 35lb is typically blue
      case 25:
        return 'green'; // 25lb is typically green
      default:
        return '';
    }
  };

  // Function to determine the size of the plate based on its weight
  const getPlateSizeStyles = (plate: number) => {
    const baseWidth = 1.5; // Base width for the smallest plate
    const height = plate >= 25 ? (plate - 25) / 2 + 40 : 30;
    const width = plate >= 25 ? '100%' : `${3 * plate + 25}%`;
    return { height: `${height}px`, width };
  };

  const totalWeight =
    platesNeeded.reduce((val, current) => val + current, 0) * 2 + 45;
  const diff = weight - totalWeight;

  return (
    <div className='flex-1 flex flex-col items-center'>
      <div className='flex w-full pt-4 px-6 text-center'>
        <div className='flex-1'>
          <Title order={4}>Closest Barbell Load</Title>
          <Text size='lg'>
            {formatWeight(
              platesNeeded.reduce((val, current) => val + current, 0) * 2 + 45
            )}
          </Text>
        </div>
        <div className='flex-1'>
          <Title order={4}>Difference</Title>
          <Text size='lg'>{formatWeight(diff, 1)}</Text>
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
              {plate} lbs
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
