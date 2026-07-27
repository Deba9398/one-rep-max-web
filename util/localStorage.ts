const LAST_WEIGHT_LIFTED_KEY = 'lastWeightLifted';
const LAST_REPS_PERFORMED_KEY = 'lastRepsPerformed';

export const DEFAULT_WEIGHT_LIFTED_IMPERIAL = 135;
export const DEFAULT_WEIGHT_LIFTED_METRIC = 80;
export const DEFAULT_REPS_PERFORMED = 8;

function getNumberFromLocalStorage(key: string) {
  const savedNumber = localStorage.getItem(key);

  if (savedNumber !== null && !isNaN(Number(savedNumber))) {
    return Number.parseFloat(savedNumber);
  }

  return null;
}

// These read localStorage directly, so they may only be called from effects or event
// handlers — never during render, which also runs at build time.
export function getLastWeightLifted(isMetric: boolean) {
  const fallback = isMetric
    ? DEFAULT_WEIGHT_LIFTED_METRIC
    : DEFAULT_WEIGHT_LIFTED_IMPERIAL;
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
