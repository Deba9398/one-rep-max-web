import { getWeightUnits, setWeightUnits } from '@/util/formatter';
import {
  Card,
  MantineColorScheme,
  Radio,
  Space,
  Stack,
  Title,
  useMantineColorScheme,
} from '@mantine/core';
import { SetStateAction, useState } from 'react';

export default function Settings() {
  const { colorScheme, setColorScheme } = useMantineColorScheme();
  const [unitPreference, setUnitPreference] = useState<string>(
    getWeightUnits()
  );

  const updateUnitPreference = (val: SetStateAction<string>) => {
    setWeightUnits(val.toString());
    setUnitPreference(val);
  };

  const updateColorScheme = (val: SetStateAction<string>) => {
    setColorScheme(val.toString() as MantineColorScheme);
  };

  return (
    <div className='flex flex-col items-center'>
      <Title order={3} className='pb-4 pt-4 text-center'>
        Settings
      </Title>

      <Card
        className='w-full max-w-[600px]'
        shadow='sm'
        padding='lg'
        radius='md'
        withBorder
      >
        <Radio.Group
          name='unitPreference'
          label='Preferred Units'
          value={unitPreference}
          onChange={updateUnitPreference}
        >
          <Stack mt='xs'>
            <Radio value='lbs' label='Imperial (lbs)' />
            <Radio value='kg' label='Metric (kg)' />
          </Stack>
        </Radio.Group>

        <Space h='xl' />
        <Radio.Group
          name='theme'
          label='Theme'
          value={colorScheme}
          onChange={updateColorScheme}
        >
          <Stack mt='xs'>
            <Radio value='auto' label='Auto' />
            <Radio value='light' label='Light' />
            <Radio value='dark' label='Dark' />
          </Stack>
        </Radio.Group>
      </Card>
    </div>
  );
}
