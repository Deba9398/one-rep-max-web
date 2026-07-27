'use client';
import { useEffect, useState } from 'react';
import { useUnitPreference } from './units';

export const ALL_METRIC_PLATES = [25, 20, 15, 10, 5, 2.5, 2, 1.5, 1.25, 1, 0.5];
export const ALL_IMPERIAL_PLATES = [45, 35, 25, 10, 5, 2.5];

export function getDefaultPlates(isMetric: boolean) {
  return isMetric ? ALL_METRIC_PLATES : ALL_IMPERIAL_PLATES;
}

export function getBarWeight(isMetric: boolean) {
  return isMetric ? 20 : 45;
}

function storageKey(units: string) {
  return `availableWeights${units}`;
}

// Only safe to call on the client — see useAvailablePlates for the render-time path.
export function getStoredPlates(units: string, isMetric: boolean): number[] {
  const userDefined = localStorage
    .getItem(storageKey(units))
    ?.split(',')
    ?.map(parseFloat);

  return userDefined ?? getDefaultPlates(isMetric);
}

export function setStoredPlates(units: string, plates: string[]) {
  localStorage.setItem(
    storageKey(units),
    plates.sort((a, b) => parseFloat(b) - parseFloat(a)).toString()
  );
}

// PlateLoader renders on the prerendered path (Help renders one directly), so the first
// render has to use the defaults and pick up stored plates afterwards.
export function useAvailablePlates() {
  const { units, isMetric } = useUnitPreference();
  const [plates, setPlates] = useState<number[]>(() =>
    getDefaultPlates(isMetric)
  );

  useEffect(() => {
    setPlates(getStoredPlates(units, isMetric));
  }, [units, isMetric]);

  return plates;
}
