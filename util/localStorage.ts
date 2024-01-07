import { isMetricWeights } from './formatter';

const LAST_WEIGHT_LIFTED_KEY = 'lastWeightLifted';
const LAST_REPS_PERFORMED_KEY = 'lastRepsPerformed';

function getNumberFromLocalStorage(key: string) {
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
  return savedNumber ?? 8;
}

export function setLastRepsPerformed(weightLifted: number) {
  localStorage.setItem(LAST_REPS_PERFORMED_KEY, weightLifted.toString());
}
