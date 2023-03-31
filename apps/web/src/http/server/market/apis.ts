import { get } from '@supercarmarket/lib';
import { CATEGORY_MAPPING } from 'constants/market';
import { authRequest } from 'http/core';

export const getMarket = async ({
  query,
}: {
  query: {
    [key: string]: string | number;
  };
}) => {
  const serverQuery = Object.fromEntries(
    Object.entries(query).filter(([, val]) => val !== undefined)
  );
  const { category, filter, orderBy, page, ...rest } = serverQuery;

  const targetCategory = CATEGORY_MAPPING[category];

  const currentQuery =
    targetCategory === '전체'
      ? { filter, orderBy, page, ...rest }
      : { category: targetCategory, filter, orderBy, page, ...rest };

  return get('/server/supercar/v1/shop', {
    method: 'GET',
    query: {
      ...currentQuery,
      page: +page + 1,
    },
  });
};

export const getMarketPost = async ({ id }: { id: string }) => {
  return get(`/server/supercar/v1/shop`, {
    method: 'GET',
    params: id,
  });
};

export const likeMarketPost = async ({ id }: { id: string }) => {
  return authRequest(`/shop/${id}/scrap`, {
    method: 'POST',
  });
};

export const updateMarketSellStatus = async ({
  data,
}: {
  data: { seq: number };
}) => {
  return authRequest(`/shop`, {
    method: 'PUT',
    data,
  });
};

export const deleteMarketPost = async ({
  data,
}: {
  data: { id: string }[];
}) => {
  return authRequest(`/shop`, {
    method: 'DELETE',
    data,
  });
};

export const prefetchMarket = async (query: {
  [key: string]: string | number;
}) => {
  return get(`${process.env.NEXT_PUBLIC_SERVER_URL}/supercar/v1/shop`, {
    method: 'GET',
    query,
  });
};

export const prefetchMarketPost = async ({
  boardView,
  token,
  id,
}: {
  id: string;
  boardView?: string;
  token?: string;
}) => {
  let headers = {};

  if (token) headers = { ...headers, ACCESS_token: token };
  if (boardView) headers = { ...headers, Cookie: `boardView=${boardView}` };

  return get(`${process.env.NEXT_PUBLIC_SERVER_URL}/supercar/v1/shop`, {
    method: 'GET',
    headers,
    params: id,
  });
};
