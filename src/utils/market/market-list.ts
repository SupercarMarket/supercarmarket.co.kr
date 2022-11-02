export const convertMileagePlusKilometers = (mileage: number) => {
  if (mileage > 10000)
    return `${Math.floor(mileage / 10000)}만${(mileage % 10000) / 1000}천km`;

  if (mileage === 10000) return `${Math.floor(mileage / 10000)}만km`;

  if (mileage >= 1000) return `${mileage / 1000}천km`;

  return '';
};
