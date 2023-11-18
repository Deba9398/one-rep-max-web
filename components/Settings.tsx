import {
  formatWeight,
  getWeightUnits,
  isMetricWeights,
  setWeightUnits,
} from '@/util/formatter';
import {
  Card,
  Checkbox,
  CheckboxGroup,
  Group,
  MantineColorScheme,
  Radio,
  Space,
  Stack,
  Switch,
  Title,
  useMantineColorScheme,
} from '@mantine/core';
import { SetStateAction, useEffect, useState } from 'react';

const ALL_METRIC_PLATES = [25, 20, 15, 10, 5, 2.5, 2, 1.5, 1.25, 1, 0.5];
const ALL_IMPERIAL_PLATES = [45, 35, 25, 10, 5, 2.5];

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
      <Title order={4} className='pb-4 pt-4 text-center'>
        Settings
      </Title>

      <Card
        className='w-full max-w-[600px]'
        padding='lg'
        radius='md'
        withBorder
      >
        <Radio.Group
          name='theme'
          label='Theme'
          value={colorScheme}
          onChange={updateColorScheme}
        >
          <Stack mt='xs'>
            <Radio size='md' value='auto' label='Auto' />
            <Radio size='md' value='light' label='Light' />
            <Radio size='md' value='dark' label='Dark' />
          </Stack>
        </Radio.Group>
        <Space h='xl' />
        <Radio.Group
          name='unitPreference'
          label='Preferred Units'
          value={unitPreference}
          onChange={updateUnitPreference}
        >
          <Stack mt='xs'>
            <Radio size='md' value='lbs' label='Imperial (lbs)' />
            <Radio size='md' value='kg' label='Metric (kg)' />
          </Stack>
        </Radio.Group>
        <Space h='xl' />
        <AvailableWeights />
      </Card>
    </div>
  );
}

export function getAvailableWeights(): number[] {
  const userDefined = localStorage
    .getItem(`availableWeights${getWeightUnits()}`)
    ?.split(',')
    ?.map(parseFloat);

  if (userDefined) {
    return userDefined;
  }

  return isMetricWeights() ? ALL_METRIC_PLATES : ALL_IMPERIAL_PLATES;
}

function AvailableWeights() {
  const isMetric = isMetricWeights();
  const plates = isMetricWeights() ? ALL_METRIC_PLATES : ALL_IMPERIAL_PLATES;
  const [selectedPlates, setSelectedPlates] = useState<string[]>([]);

  useEffect(() => {
    setSelectedPlates(getAvailableWeights().map((p) => p.toString()));
  }, [isMetric]);

  const updateAvailableWeight = (plates: string[]) => {
    localStorage.setItem(
      `availableWeights${getWeightUnits()}`,
      plates.sort((a, b) => parseFloat(b) - parseFloat(a)).toString()
    );
    setSelectedPlates(plates);
  };

  return (
    <Switch.Group
      label='Available Weights'
      onChange={updateAvailableWeight}
      value={selectedPlates}
    >
      <Stack mt='xs'>
        {plates.map((p) => (
          <Switch
            key={p}
            size='md'
            value={p.toString()}
            label={formatWeight(p, 2, false)}
          />
        ))}
      </Stack>
    </Switch.Group>
  );
}
