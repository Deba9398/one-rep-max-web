'use client';
import { useCallback, useSyncExternalStore } from 'react';
import { formatWeightWithUnits, roundToDecimalPlaces } from './formatter';

const UNIT_PREFERENCE_KEY = 'unitPreference';

// What the build render and the browser's first render both use. React swaps to the
// stored value after hydration, so the markup matches the static HTML either way.
const DEFAULT_UNITS = 'lbs';

const listeners = new Set<() => void>();
let cachedUnits: string | null = null;

function readStoredUnits() {
  const stored = localStorage.getItem(UNIT_PREFERENCE_KEY);
  if (stored) {
    return stored;
  }

  return navigator.language.startsWith('en-US') ? 'lbs' : 'kg';
}

function subscribe(onStoreChange: () => void) {
  listeners.add(onStoreChange);
  return () => {
    listeners.delete(onStoreChange);
  };
}

function getSnapshot() {
  cachedUnits ??= readStoredUnits();
  return cachedUnits;
}

function getServerSnapshot() {
  return DEFAULT_UNITS;
}

export function setWeightUnits(units: string) {
  localStorage.setItem(UNIT_PREFERENCE_KEY, units);
  cachedUnits = units;
  listeners.forEach((listener) => listener());
}

export function useWeightUnits() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function useIsMetric() {
  return useWeightUnits() === 'kg';
}

const subscribeToNothing = () => () => {};

// False on the server and during the hydration render, true afterwards. Lets consumers
// defer their own localStorage reads until the markup has settled.
export function useHydrated() {
  return useSyncExternalStore(
    subscribeToNothing,
    () => true,
    () => false
  );
}

export function useUnitPreference() {
  const units = useWeightUnits();
  const hydrated = useHydrated();

  return {
    units,
    isMetric: units === 'kg',
    setUnits: setWeightUnits,
    hydrated,
  };
}

export function useFormatWeight() {
  const units = useWeightUnits();

  return useCallback(
    (weight: number, decimalPlaces: number = 0, forceDecimals = true) =>
      formatWeightWithUnits(weight, units, decimalPlaces, forceDecimals),
    [units]
  );
}

export function FormatWeight({
  weight,
  decimalPlaces = 0,
  forceDecimals = true,
}: {
  weight: number;
  decimalPlaces?: number;
  forceDecimals?: boolean;
}) {
  const units = useWeightUnits();
  const roundedWeight = roundToDecimalPlaces(weight, decimalPlaces);
  const displayWeight = forceDecimals
    ? roundedWeight.toFixed(decimalPlaces)
    : roundedWeight;

  return (
    <span className='weight-string'>
      {displayWeight}
      <span
        style={{
          textTransform: 'uppercase',
          fontSize: '0.8em',
          marginLeft: '0.3em',
        }}
      >
        {units}
      </span>
    </span>
  );
}
