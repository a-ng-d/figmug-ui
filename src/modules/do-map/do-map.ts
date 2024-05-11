export const doMap = (
  value: number,
  oldMin: number,
  oldMax: number,
  newMin: number,
  newMax: number
): number => {
  const oldRange = oldMax - oldMin;
  const newRange = newMax - newMin;

  return ((value - oldMin) * newRange) / oldRange + newMin;
};
