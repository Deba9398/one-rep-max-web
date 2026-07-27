import { describe, expect, it } from 'vitest';
import { calculateMetrics, calculateStandardDeviation } from './mathUtils';

describe('calculateStandardDeviation', () => {
  it('computes the population standard deviation', () => {
    // Textbook set: mean 5, squared deviations sum to 32, 32/8 = 4, sqrt = 2.
    expect(calculateStandardDeviation([2, 4, 4, 4, 5, 5, 7, 9])).toBe(2);
  });

  it('is zero when every value is identical', () => {
    expect(calculateStandardDeviation([7, 7, 7])).toBe(0);
  });

  it('is zero for a single value', () => {
    expect(calculateStandardDeviation([42])).toBe(0);
  });

  it('divides by n, not n-1', () => {
    // Sample SD of [1, 3] would be ~1.414; population SD is exactly 1.
    expect(calculateStandardDeviation([1, 3])).toBe(1);
  });
});

describe('calculateMetrics', () => {
  it('returns the mean and population standard deviation', () => {
    const { avg, stdDeviation } = calculateMetrics([98, 102]);

    expect(avg).toBe(100);
    expect(stdDeviation).toBe(2);
  });

  it('expresses deviation as a percentage of the mean', () => {
    expect(calculateMetrics([98, 102]).percentDeviation).toBe(2);
    expect(calculateMetrics([95, 105]).percentDeviation).toBe(5);
  });

  // The colour drives how much the UI tells users to trust the estimate, so the
  // thresholds are pinned at their boundaries.
  it('colours agreement green at or below 2 percent deviation', () => {
    expect(calculateMetrics([100, 100]).color).toBe('green');
    expect(calculateMetrics([98, 102]).color).toBe('green');
  });

  it('colours agreement yellow above 2 and at or below 4 percent', () => {
    expect(calculateMetrics([97, 103]).color).toBe('yellow');
    expect(calculateMetrics([96, 104]).color).toBe('yellow');
  });

  it('colours agreement red above 4 percent', () => {
    expect(calculateMetrics([95, 105]).color).toBe('red');
  });
});
