let cachedUnitPreference: string = readUnitPreference();

function readUnitPreference() {
  const userPref = localStorage.getItem('unitPreference');
  if (userPref) {
    return userPref;
  }

  return navigator.language.startsWith('en-US') ? 'lbs' : 'kg';
}

export function setWeightUnits(units: string) {
  cachedUnitPreference = units;
  localStorage.setItem('unitPreference', units);
}

export function getWeightUnits() {
  return cachedUnitPreference;
}

export const isMetricWeights = () => getWeightUnits() === 'kg';

export function roundToDecimalPlaces(num: number, decimalPlaces: number) {
  const multiplier = Math.pow(10, decimalPlaces);
  return Math.round(num * multiplier) / multiplier;
}

export function formatWeight(
  weight: number,
  decimalPlaces: number = 0,
  forceDecimals = true
) {
  if (!cachedUnitPreference) {
    cachedUnitPreference = readUnitPreference();
  }

  const roundedWeight = roundToDecimalPlaces(weight, decimalPlaces);

  if (forceDecimals) {
    return `${roundedWeight.toFixed(decimalPlaces)} ${cachedUnitPreference}`;
  }
  return `${roundedWeight} ${cachedUnitPreference}`;
}

export function FormatWeight({
  weight,
  decimalPlaces = 0,
  forceDecimals = true,
  littleDecimal = false,
}: {
  weight: number;
  decimalPlaces?: number;
  forceDecimals?: boolean;
  littleDecimal?: boolean;
}) {
  if (!cachedUnitPreference) {
    cachedUnitPreference = readUnitPreference();
  }

  const roundedWeight = roundToDecimalPlaces(weight, decimalPlaces);
  const displayWeight = forceDecimals
    ? roundedWeight.toFixed(decimalPlaces)
    : roundedWeight;

  return (
    <span className='weight-string'>
      {displayWeight}
      <span
        style={{
          textTransform: 'uppercase',
          fontSize: '0.8em',
          marginLeft: '0.3em',
        }}
      >
        {cachedUnitPreference}
      </span>
    </span>
  );
}
