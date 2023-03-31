import { get } from '@supercarmarket/lib';
import { ServerResponse } from '@supercarmarket/types/base';
import { catchNoExist, getErrorMessage } from 'utils/misc';

const refreshToken = async (refreshToken: string) => {
  catchNoExist(refreshToken);

  try {
    const token = await get<
      ServerResponse<{
        exp: number;
        access_token: string;
      }>
    >(`${process.env.NEXT_PUBLIC_SERVER_URL}/supercar/v1/user/get-token`, {
      headers: {
        REFRESH_TOKEN: refreshToken,
      },
      method: 'GET',
    });

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
