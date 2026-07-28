'use client';
import { logEvent } from '@/util/analytics';
import {
  getDefaultPlates,
  setStoredPlates,
  useAvailablePlates,
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
import { SetStateAction, useState } from 'react';

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
        <AvailableWeights key={units} />
      </Card>
    </div>
  );
}

// Keyed on units by the caller, so switching unit systems remounts this and drops any
// selection belonging to the old plate set.
function AvailableWeights() {
  const { units, isMetric } = useUnitPreference();
  const formatWeight = useFormatWeight();
  const plates = getDefaultPlates(isMetric);
  const storedPlates = useAvailablePlates();

  // Null until the user touches a switch; until then the stored set is the source of
  // truth, which also keeps the prerendered markup on the defaults.
  const [selected, setSelected] = useState<string[] | null>(null);
  const selectedPlates = selected ?? storedPlates.map((p) => p.toString());

  const updateAvailableWeight = (plates: string[]) => {
    setStoredPlates(units, plates);
    setSelected(plates);
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
