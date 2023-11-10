import { RepMaxValues } from '@/util/repMaxFormulas';
import { Card, Text } from '@mantine/core';

export default function RepMaxTable({
  repMaxValues,
}: {
  repMaxValues: RepMaxValues;
}) {
  return (
    <div className='grid grid-cols-3 gap-4'>
      {Object.keys(repMaxValues).map((key) => (
        <Card
          key={key}
          className='text-center'
          shadow='sm'
          padding='lg'
          radius='md'
          withBorder
        >
          <Text size='sm' c='dimmed'>
            {key}RM
          </Text>
          <Text size='md' fw={500}>
            {repMaxValues[key].toFixed(0)} lbs
          </Text>
        </Card>
      ))}
    </div>
  );
}
