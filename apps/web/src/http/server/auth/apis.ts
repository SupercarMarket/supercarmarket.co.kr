import { get, post } from '@supercarmarket/lib';
import { type ServerResponse } from '@supercarmarket/types/base';

export const refreshToken = async (refreshToken: string) => {
  return get<
    ServerResponse<{
      exp: number;
      access_token: string;
    }>
  >(`${process.env.NEXT_PUBLIC_SERVER_URL}/supercar/v1/user/get-token`, {
    headers: {
      REFRESH_TOKEN: refreshToken,
    },
  }).then((res) => {
    const { exp, access_token } = res.data;
    return {
      expire: exp,
      accessToken: access_token,
    };
  });
};

export const signInOAuth = async (
  data: {
    sub: string;
    nickname: string;
    email?: string;
    picture?: string;
  },
  provider: 'google' | 'kakao' | 'local'
) => {
  const { sub, nickname, email, picture } = data;
  return post(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/supercar/v1/user/login`,
    {
      sub,
      name: nickname,
      email,
      picture,
    },
    {
      params: provider,
    }
  );
};
