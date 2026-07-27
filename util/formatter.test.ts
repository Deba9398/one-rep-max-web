import { describe, expect, it } from 'vitest';
import { formatWeightWithUnits, roundToDecimalPlaces } from './formatter';

describe('roundToDecimalPlaces', () => {
  it('rounds to the requested precision', () => {
    expect(roundToDecimalPlaces(123.456, 1)).toBe(123.5);
    expect(roundToDecimalPlaces(123.456, 2)).toBe(123.46);
    expect(roundToDecimalPlaces(123.456, 0)).toBe(123);
  });

  it('leaves values already at the requested precision alone', () => {
    expect(roundToDecimalPlaces(2.5, 1)).toBe(2.5);
    expect(roundToDecimalPlaces(45, 2)).toBe(45);
  });

  it('rounds negative values away from zero at the midpoint', () => {
    // Math.round(-2.5) is -2, so this documents the direction rather than assuming it.
    expect(roundToDecimalPlaces(-2.5, 0)).toBe(-2);
  });
});

describe('formatWeightWithUnits', () => {
  it('appends the units it is given', () => {
    expect(formatWeightWithUnits(100, 'kg')).toBe('100 kg');
    expect(formatWeightWithUnits(100, 'lbs')).toBe('100 lbs');
  });

  it('pads to a fixed precision by default', () => {
    expect(formatWeightWithUnits(102.5, 'kg', 2)).toBe('102.50 kg');
    expect(formatWeightWithUnits(45, 'lbs', 1)).toBe('45.0 lbs');
  });

  it('drops trailing zeros when decimals are not forced', () => {
    expect(formatWeightWithUnits(45, 'lbs', 2, false)).toBe('45 lbs');
    expect(formatWeightWithUnits(2.5, 'kg', 2, false)).toBe('2.5 kg');
  });

  it('rounds before formatting', () => {
    expect(formatWeightWithUnits(102.567, 'kg', 1)).toBe('102.6 kg');
  });
});
