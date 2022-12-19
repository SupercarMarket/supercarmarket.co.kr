import type { NextApiHandler } from 'next';
import { getErrorMessage } from 'utils/misc';

const refreshToken: NextApiHandler = () => {
  try {
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

const isExpire: NextApiHandler = (req, res) => {
  try {
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export { isExpire, refreshToken };
