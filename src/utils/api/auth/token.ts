import type { NextApiHandler } from 'next';
import { getErrorMessage } from 'utils/misc';

const refreshToken: NextApiHandler = () => {
  try {
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

const isExpire = (exp: number) => {
  if (Date.now() < exp) return true;
  return false;
};

export { isExpire, refreshToken };
