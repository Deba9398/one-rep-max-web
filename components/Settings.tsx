import { logEvent } from '@/util/analytics';
import {
  getDefaultPlates,
  getStoredPlates,
  setStoredPlates,
} from '@/util/plates';
import { useFormatWeight, useUnitPreference } from '@/util/units';
import {
  Card,
  MantineColorScheme,
  Radio,
  Space,
  Stack,
  Switch,
  Title,
  useMantineColorScheme,
} from '@mantine/core';
import { SetStateAction, useEffect, useState } from 'react';

export default function Settings() {
  const { colorScheme, setColorScheme } = useMantineColorScheme();
  const { units, setUnits } = useUnitPreference();

  const updateUnitPreference = (val: SetStateAction<string>) => {
    setUnits(val.toString());
    logEvent('change_units_pref_settings');
  };

  const updateColorScheme = (val: SetStateAction<string>) => {
    setColorScheme(val.toString() as MantineColorScheme);
    logEvent(`change_color_scheme_settings_${val}`);
  };

  return (
    <div className='flex flex-col items-center'>
      <Title order={2} size='h4' className='pb-4 pt-4 text-center'>
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
          value={units}
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

function AvailableWeights() {
  const { units, isMetric, hydrated } = useUnitPreference();
  const formatWeight = useFormatWeight();
  const plates = getDefaultPlates(isMetric);
  const [selectedPlates, setSelectedPlates] = useState<string[]>([]);

  useEffect(() => {
    if (!hydrated) {
      return;
    }

    setSelectedPlates(getStoredPlates(units, isMetric).map((p) => p.toString()));
  }, [units, isMetric, hydrated]);

  const updateAvailableWeight = (plates: string[]) => {
    setStoredPlates(units, plates);
    setSelectedPlates(plates);
    logEvent('change_available_weights_settings');
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
