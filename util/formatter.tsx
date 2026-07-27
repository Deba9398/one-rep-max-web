export function roundToDecimalPlaces(num: number, decimalPlaces: number) {
  const multiplier = Math.pow(10, decimalPlaces);
  return Math.round(num * multiplier) / multiplier;
}

// Pure on purpose: units are passed in rather than read from module state, so React can
// track them as a dependency. See util/units.tsx.
export function formatWeightWithUnits(
  weight: number,
  units: string,
  decimalPlaces: number = 0,
  forceDecimals = true
) {
  const roundedWeight = roundToDecimalPlaces(weight, decimalPlaces);

  if (forceDecimals) {
    return `${roundedWeight.toFixed(decimalPlaces)} ${units}`;
  }
  return `${roundedWeight} ${units}`;
}
