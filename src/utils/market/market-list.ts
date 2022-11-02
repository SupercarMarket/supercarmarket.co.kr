export const convertMileagePlusKilometers = (mileage: string) => {
  const value = +mileage;

  if (value > 10000)
    return `${Math.floor(value / 10000)}만${(value % 10000) / 1000}천km`;

  if (value === 10000) return `${Math.floor(value / 10000)}만km`;

  if (value >= 1000) return `${value / 1000}천km`;

  return '';
};
