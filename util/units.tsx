'use client';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { formatWeightWithUnits, roundToDecimalPlaces } from './formatter';

const UNIT_PREFERENCE_KEY = 'unitPreference';

// The static export renders this tree in Node at build time, and the browser's first
// render has to produce identical markup. So the provider starts on the build-time
// default and swaps in the stored preference from a mount effect.
const DEFAULT_UNITS = 'lbs';

function readStoredUnits() {
  const stored = localStorage.getItem(UNIT_PREFERENCE_KEY);
  if (stored) {
    return stored;
  }

  return navigator.language.startsWith('en-US') ? 'lbs' : 'kg';
}

type UnitPreference = {
  units: string;
  isMetric: boolean;
  setUnits: (units: string) => void;
  // False during the build render and the browser's first render, true once the stored
  // preference has been read. Consumers that load their own stored values wait on this,
  // since child effects run before this provider's.
  hydrated: boolean;
};

const UnitPreferenceContext = createContext<UnitPreference>({
  units: DEFAULT_UNITS,
  isMetric: false,
  setUnits: () => {},
  hydrated: false,
});

export function UnitPreferenceProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [units, setUnitsState] = useState(DEFAULT_UNITS);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setUnitsState(readStoredUnits());
    setHydrated(true);
  }, []);

  const setUnits = useCallback((next: string) => {
    localStorage.setItem(UNIT_PREFERENCE_KEY, next);
    setUnitsState(next);
  }, []);

  const value = useMemo(
    () => ({ units, isMetric: units === 'kg', setUnits, hydrated }),
    [units, setUnits, hydrated]
  );

  return (
    <UnitPreferenceContext.Provider value={value}>
      {children}
    </UnitPreferenceContext.Provider>
  );
}

export function useUnitPreference() {
  return useContext(UnitPreferenceContext);
}

export function useWeightUnits() {
  return useUnitPreference().units;
}

export function useIsMetric() {
  return useUnitPreference().isMetric;
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
