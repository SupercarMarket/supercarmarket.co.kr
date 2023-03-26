type NotNullishValue = {};

export const checkDeeplyEqual = <T extends NotNullishValue>(x: T, y: T) => {
  return JSON.stringify(x) === JSON.stringify(y);
};
