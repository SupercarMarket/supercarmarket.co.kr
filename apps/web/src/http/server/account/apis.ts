import { type Profile } from '@supercarmarket/types/account';
import { type ServerResponse } from '@supercarmarket/types/base';
import { type AccountTab } from 'constants/account';
import { get } from '@supercarmarket/lib';
import { authRequest } from 'http/core';

export const getAccount = async ({
  id,
  token,
}: {
  id: string;
  token?: string;
}) => {
  const headers = token
    ? {
        ACCESS_TOKEN: token,
      }
    : undefined;

  return get('/server/supercar/v1/userpage', {
    headers,
    method: 'GET',
    query: {
      id,
    },
  });
};

export const getAccountCategory = async ({
  id,
  query,
  token,
}: {
  id: string;
  query: {
    category: AccountTab;
    page: number;
    size: number;
  };
  token?: string;
}) => {
  const headers = token
    ? {
        ACCESS_TOKEN: token,
      }
    : undefined;

  return get(`/server/supercar/v1/userpage/category/${query.category}/id`, {
    method: 'GET',
    headers,
    params: id,
    query: {
      ...query,
      page: query.page + 1,
    },
  });
};

export const getAccountUpdateInfo = async () => {
  return authRequest(`/user/info`, {
    method: 'GET',
  });
};

export const prefetchAccount = async ({
  id,
  token,
}: {
  id: string;
  token?: string;
}) => {
  const headers = token
    ? {
        ACCESS_TOKEN: token,
      }
    : undefined;

  return get<ServerResponse<Profile>>(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/supercar/v1/userpage`,
    {
      headers,
      method: 'GET',
      query: {
        id,
      },
    }
  );
};
