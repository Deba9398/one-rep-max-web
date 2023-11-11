let cachedUnitPreference: string | null = readUnitPreference();

function readUnitPreference() {
  const userPref = localStorage.getItem('unitPreference');
  if (userPref) {
    return userPref;
  }

  return navigator.language.startsWith('en-US') ? 'lbs' : 'kg';
}

// Event listener to update cache when local storage changes
window.addEventListener('storage', (event) => {
  if (event.key === 'unitPreference') {
    cachedUnitPreference = event.newValue;
  }
});

export function getWeightUnits() {
  return cachedUnitPreference;
}

export function roundToDecimalPlaces(num: number, decimalPlaces: number) {
  const multiplier = Math.pow(10, decimalPlaces);
  return Math.round(num * multiplier) / multiplier;
}

export function formatWeight(weight: number, decimalPlaces: number = 0) {
  if (!cachedUnitPreference) {
    cachedUnitPreference = readUnitPreference();
  }

  const roundedWeight = roundToDecimalPlaces(weight, decimalPlaces);

  return `${roundedWeight} ${cachedUnitPreference}`;
}
