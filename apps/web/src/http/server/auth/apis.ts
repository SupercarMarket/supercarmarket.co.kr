import { get, patch, post, remove } from '@supercarmarket/lib';
import { authRequest } from 'http/core';
import { type Signup } from '@supercarmarket/types/auth';
import { type ServerResponse } from '@supercarmarket/types/base';
import { type FormState } from 'constants/form/updateInfo';

export const createAccount = async (data: Signup) => {
  const {
    id,
    password,
    passwordConfirm,
    name,
    nickname,
    email,
    phone,
    authentication,
  } = data;

  return post('/server/supercar/v1/user/signup', {
    id,
    password,
    passwordCheck: passwordConfirm,
    name,
    nickname,
    email,
    phone,
    code: authentication,
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

export const updateAccount = async (
  data: FormState & {
    code: string;
  }
) => {
  return authRequest(`/mypage`, {
    method: 'PATCH',
    data,
  });
};

export const deleteAccount = async ({
  accessToken,
  refreshToken,
}: {
  accessToken: string;
  refreshToken: string;
}) => {
  return remove('/supercar/v1/user/delete', undefined, {
    headers: {
      ACCESS_TOKEN: accessToken,
      REFRESH_TOKEN: refreshToken,
    },
  });
};

export const duplicateField = async (value: string, field: string) => {
  return post(`/server/supercar/v1/user/${field}chk`, {
    [`${field}`]: value,
  }).then(() => {
    return value;
  });
};

export const sendPhone = async (phone: string) => {
  return get(`/server/supercar/v1/message/auth/send/${phone}`, {
    method: 'GET',
  }).then(() => {
    return phone;
  });
};

export const sendCode = async (phone: string, code: string) => {
  return get(`/server/supercar/v1/message/auth/code/${phone}`, {
    method: 'GET',
    query: {
      code,
    },
  }).then(() => {
    return code;
  });
};

export const findId = async (data: {
  phone: string;
  authentication: string;
  name: string;
}) => {
  const { phone, name, authentication } = data;

  return post(`/server/supercar/v1/user/find-id`, {
    phone,
    name,
    code: authentication,
  });
};

export const resetPassword = async (data: {
  phone: string;
  authentication: string;
  id: string;
  password: string;
}) => {
  const { phone, id, authentication, password } = data;

  return patch(`/server/supercar/v1/user/change-pw`, {
    id,
    password,
    phone,
    code: authentication,
  });
};

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
