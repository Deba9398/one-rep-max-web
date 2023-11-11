import { Card, Text } from '@mantine/core';

export default function PercentagesTable({ oneRepMax }: { oneRepMax: number }) {
  const percentages = [100, 95, 90, 85, 80, 75, 70, 65, 60, 55, 50, 40];

  return (
    <div className='grid grid-cols-3 gap-4'>
      {percentages.map((p) => (
        <Card
          key={p}
          className='text-center'
          shadow='sm'
          padding='lg'
          radius='md'
          withBorder
        >
          <Text size='sm' c='dimmed'>
            {p}%
          </Text>
          <Text size='md' fw={500}>
            {((p / 100) * oneRepMax).toFixed(0)} lbs
          </Text>
        </Card>
      ))}
    </div>
  );
}
