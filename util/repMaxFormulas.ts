export type RepMaxValues = { [key: string]: number };

const Rows = 12;

export function calculateRepMaxValues(
  weight: number,
  reps: number
): RepMaxValues {
  return epleyRange(weight, reps);
}

export function calculateOneRepMax(weight: number, reps: number) {
  return epley(weight, reps);
}

function epley(weight: number, reps: number) {
  return reps === 1 ? weight : weight * (1 + reps / 30);
}

function epleyRange(weight: number, reps: number) {
  const max = epley(weight, reps);

  const map: RepMaxValues = {
    1: max,
  };
  for (let i = 2; i <= Rows; i++) {
    map[i] = (30 * max) / (i + 30);
  }

  return map;
}
