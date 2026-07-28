import { describe, expect, it } from 'vitest';
import { calculateRepMaxValues } from './repMaxFormulas';

const FORMULAS = [
  'Epley',
  'Brzycki',
  'Lombardi',
  'Mayhew et al.',
  'Wathan',
  'Lander',
  "O'Connor et al.",
];

describe('calculateRepMaxValues', () => {
  it('returns a row for each rep count from 1 to 12', () => {
    const values = calculateRepMaxValues(135, 8);

    expect(Object.keys(values)).toHaveLength(12);
    for (let reps = 1; reps <= 12; reps++) {
      expect(values[reps]).toBeDefined();
    }
  });

  it('evaluates every formula for every row', () => {
    const values = calculateRepMaxValues(135, 8);

    for (let reps = 1; reps <= 12; reps++) {
      expect(values[reps].map((v) => v.formula).sort()).toEqual(
        [...FORMULAS].sort()
      );
    }
  });

  it('sorts each row from highest estimate to lowest', () => {
    const values = calculateRepMaxValues(225, 5);

    for (let reps = 1; reps <= 12; reps++) {
      const rowValues = values[reps].map((v) => v.value);
      expect(rowValues).toEqual([...rowValues].sort((a, b) => b - a));
    }
  });

  // Every formula is defined to return the lifted weight unchanged at one rep, so a
  // single-rep set must not be "adjusted" into a different one-rep max.
  it('treats a single rep as the one rep max itself', () => {
    const values = calculateRepMaxValues(315, 1);

    for (const entry of values[1]) {
      expect(entry.value).toBe(315);
    }
  });

  it('estimates a higher one rep max than the weight actually lifted', () => {
    const values = calculateRepMaxValues(135, 8);

    for (const entry of values[1]) {
      expect(entry.value).toBeGreaterThan(135);
    }
  });

  it('decreases monotonically as the rep count rises', () => {
    const values = calculateRepMaxValues(135, 8);

    for (const formula of FORMULAS) {
      const series = [];
      for (let reps = 1; reps <= 12; reps++) {
        series.push(values[reps].find((v) => v.formula === formula)!.value);
      }

      for (let i = 1; i < series.length; i++) {
        expect(series[i]).toBeLessThan(series[i - 1]);
      }
    }
  });

  // Each formula multiplies the lifted weight by a rep-dependent factor, so the whole
  // table has to scale linearly. This catches an additive constant sneaking in.
  it('scales linearly with the weight lifted', () => {
    const single = calculateRepMaxValues(100, 6);
    const double = calculateRepMaxValues(200, 6);

    for (let reps = 1; reps <= 12; reps++) {
      for (let i = 0; i < single[reps].length; i++) {
        expect(double[reps][i].value).toBeCloseTo(single[reps][i].value * 2, 6);
      }
    }
  });

  it('matches the published Epley estimate', () => {
    // Epley: weight * (1 + reps / 30) => 100 * (1 + 10/30)
    const epley = calculateRepMaxValues(100, 10)[1].find(
      (v) => v.formula === 'Epley'
    );

    expect(epley!.value).toBeCloseTo(133.3333, 4);
  });

  it("matches the published O'Connor et al. estimate", () => {
    // O'Connor: weight * (1 + 0.025 * reps) => 200 * (1 + 0.025*8)
    const oConnor = calculateRepMaxValues(200, 8)[1].find(
      (v) => v.formula === "O'Connor et al."
    );

    expect(oConnor!.value).toBeCloseTo(240, 6);
  });

  it('collapses non-numeric input to zero rather than propagating NaN', () => {
    const values = calculateRepMaxValues(NaN, 5);

    for (let reps = 1; reps <= 12; reps++) {
      for (const entry of values[reps]) {
        expect(entry.value).toBe(0);
      }
    }
  });
});
