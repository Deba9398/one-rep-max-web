export type RepMaxValues = { [key: number]: number };

const Rows = 12;

export function calculateRepMaxValues(
  weight: number,
  reps: number
): RepMaxValues {
  return epley(weight, reps);
}

function epley(weight: number, reps: number) {
  const max = weight * (1 + reps / 30);

  const map: RepMaxValues = {};
  for (let i = 1; i <= Rows; i++) {
    map[i] = (30 * max) / (i + 30);
  }

  return map;
}
