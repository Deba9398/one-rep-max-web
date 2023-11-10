import { RepMaxValues } from '@/util/repMaxFormulas';
import { Text } from '@mantine/core';

export default function RepMaxTable({
  repMaxValues,
}: {
  repMaxValues: RepMaxValues;
}) {
  return (
    <div className='grid grid-cols-3 gap-4'>
      {Object.keys(repMaxValues).map((key) => (
        <div
          key={key}
          className='p-4 text-center rounded bg-white bg-opacity-5'
        >
          <Text size='sm' c='dimmed'>
            {key}RM
          </Text>
          <Text size='md' fw={500}>
            {repMaxValues[key].toFixed(0)} lbs
          </Text>
        </div>
      ))}
    </div>
  );
}
