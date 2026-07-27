'use client';
import { useHydrated, useUnitPreference } from './units';

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
  storedPlateCache.delete(units);
}

// getStoredPlates returns a fresh array, so memoize per unit to keep the identity stable
// across renders. Invalidated by setStoredPlates.
const storedPlateCache = new Map<string, number[]>();

// PlateLoader renders on the prerendered path (Help renders one directly), so the build
// render and the hydration render both have to use the defaults.
export function useAvailablePlates() {
  const { units, isMetric } = useUnitPreference();
  const hydrated = useHydrated();

  if (!hydrated) {
    return getDefaultPlates(isMetric);
  }

  let plates = storedPlateCache.get(units);
  if (!plates) {
    plates = getStoredPlates(units, isMetric);
    storedPlateCache.set(units, plates);
  }

  return plates;
}
