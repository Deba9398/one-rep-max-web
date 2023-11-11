export type RepMaxValues = { [key: string]: number };
export type RepMaxValueType = { formula: string; value: number };
export type MultiFormulaRepMaxValues = { [key: string]: RepMaxValueType[] };

const Rows = 12;

export function calculateRepMaxValues(
  weight: number,
  reps: number
): MultiFormulaRepMaxValues {
  const values: MultiFormulaRepMaxValues = {};

  function addValues(formula: string, repMaxValues: RepMaxValues) {
    Object.keys(repMaxValues).forEach((key) => {
      if (values[key] === undefined) {
        values[key] = [];
      }

      values[key].push({ formula, value: repMaxValues[key] });
    });
  }

  addValues('Epley', epleyRange(weight, reps));
  addValues('Brzycki', brzyckiRange(weight, reps));
  addValues('Lombardi', lombardiRange(weight, reps));

  Object.keys(values).forEach((key) => {
    values[key].sort((a, b) => b.value - a.value);
  });

  return values;
}

export function calculateOneRepMax(weight: number, reps: number) {
  return epley(weight, reps);
}

// ======================================
// ============== FORMULAS ==============
// ======================================

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

function brzycki(weight: number, reps: number) {
  return reps === 1 ? weight : (weight * 36) / (37 - reps);
}

function brzyckiRange(weight: number, reps: number) {
  const max = brzycki(weight, reps);

  const map: RepMaxValues = {
    1: max,
  };
  for (let i = 2; i <= Rows; i++) {
    map[i] = (-1 / 36) * (i - 37) * max;
  }

  return map;
}

function lombardi(weight: number, reps: number) {
  return reps === 1 ? weight : weight * Math.pow(reps, 0.1);
}

function lombardiRange(weight: number, reps: number) {
  const max = lombardi(weight, reps);

  const map: RepMaxValues = {
    1: max,
  };
  for (let i = 2; i <= Rows; i++) {
    map[i] = max / Math.pow(i, 0.1);
  }

  return map;
}
