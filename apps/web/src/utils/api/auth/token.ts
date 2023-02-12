import { catchNoExist, getErrorMessage } from 'utils/misc';

import { baseFetcher } from '../fetcher';

const refreshToken = async (refreshToken: string) => {
  catchNoExist(refreshToken);

  try {
    const token = await baseFetcher(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/supercar/v1/user/get-token`,
      {
        headers: {
          REFRESH_TOKEN: refreshToken,
        },
        method: 'GET',
      }
    );

    return {
      expire: token.data.exp,
      accessToken: token.data.access_token,
    };
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

const isExpire = (exp: number) => {
  if (Date.now() < exp) return true;
  return false;
};

export { isExpire, refreshToken };
