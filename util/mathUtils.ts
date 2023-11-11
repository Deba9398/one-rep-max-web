export function calculateStandardDeviation(arr: number[]) {
  // Step 1: Calculate the mean (average)
  const mean = arr.reduce((acc, val) => acc + val, 0) / arr.length;

  // Step 2: Calculate each number's deviation from the mean, square it
  const squaredDifferences = arr.map((val) => {
    const difference = val - mean;
    return difference ** 2;
  });

  // Step 3: Calculate the mean of squared differences
  const meanOfSquaredDifferences =
    squaredDifferences.reduce((acc, val) => acc + val, 0) / arr.length;

  // Step 4: Take the square root of the mean of squared differences
  const standardDeviation = Math.sqrt(meanOfSquaredDifferences);

  return standardDeviation;
}

export const calculateMetrics = (values: number[]) => {
  const avg =
    values.reduce((acc, repMaxCalculation) => acc + repMaxCalculation, 0) /
    values.length;

  const stdDeviation = calculateStandardDeviation(values);

  const percentDeviation = (stdDeviation / avg) * 100;

  const color =
    percentDeviation <= 2
      ? 'text-green-400'
      : percentDeviation <= 4
      ? 'text-yellow-400'
      : 'text-red-400';

  return {
    avg,
    color,
    stdDeviation,
    percentDeviation,
  };
};
