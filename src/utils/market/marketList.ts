export const convertMileageToKilometers = (mileage: number) => {
  if (mileage > 10000) return `${(mileage / 10000).toFixed(1)}만km`;

  if (mileage === 10000) return `${Math.floor(mileage / 10000)}만km`;

  if (mileage >= 1000) return `${Math.floor(mileage / 1000)}천km`;

  return '';
};

export const convertPriceToWon = (price: number) => {
  if (price > 10000) return `${(price / 10000).toFixed(1)}억원`;

  if (price === 10000) return `${Math.floor(price / 10000)}억원`;

  if (price >= 1000) return `${price / 1000}천만원`;

  return '';
};
