import { areClientPreferencesLoaded } from './clientPreferences';
import { isMetricWeights } from './formatter';

const LAST_WEIGHT_LIFTED_KEY = 'lastWeightLifted';
const LAST_REPS_PERFORMED_KEY = 'lastRepsPerformed';

export const DEFAULT_REPS_PERFORMED = 8;

function getNumberFromLocalStorage(key: string) {
  if (!areClientPreferencesLoaded()) {
    return null;
  }

  const savedNumber = localStorage.getItem(key);

  if (savedNumber !== null && !isNaN(Number(savedNumber))) {
    return Number.parseFloat(savedNumber);
  }

  return null;
}

export function getLastWeightLifted() {
  const fallback = isMetricWeights() ? 80 : 135;
  const savedNumber = getNumberFromLocalStorage(LAST_WEIGHT_LIFTED_KEY);
  return savedNumber ?? fallback;
}

export function setLastWeightLifted(weightLifted: number) {
  localStorage.setItem(LAST_WEIGHT_LIFTED_KEY, weightLifted.toString());
}

export function getLastRepsPerformed() {
  const savedNumber = getNumberFromLocalStorage(LAST_REPS_PERFORMED_KEY);
  return savedNumber ?? DEFAULT_REPS_PERFORMED;
}

export function setLastRepsPerformed(weightLifted: number) {
  localStorage.setItem(LAST_REPS_PERFORMED_KEY, weightLifted.toString());
}
