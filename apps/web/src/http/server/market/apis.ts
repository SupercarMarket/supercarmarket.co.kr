import { clientApi, clientFetcher, serverFetcher } from '@supercarmarket/lib';
import { CATEGORY_MAPPING } from 'constants/market';

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

  return clientFetcher('/server/supercar/v1/shop', {
    method: 'GET',
    query: {
      ...currentQuery,
      page: +page + 1,
    },
  });
};

export const getMarketPost = async ({ id }: { id: string }) => {
  return clientFetcher(`/server/supercar/v1/shop`, {
    method: 'GET',
    params: id,
  });
};

export const likeMarketPost = async ({
  id,
  token,
}: {
  id: string;
  token: string;
}) => {
  return fetch(`/server/supercar/v1/shop/${id}/scrap`, {
    method: 'POST',
    headers: {
      ACCESS_TOKEN: token,
    },
  });
};

export const updateMarketSellStatus = async ({
  data,
  token,
}: {
  data: { brdSeq: number };
  token: string;
}) => {
  return clientApi(`/server/supercar/v1/shop`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ACCESS_TOKEN: token,
    },
    data,
  });
};

export const deleteMarketPost = async ({
  data,
  token,
}: {
  data: { id: string }[];
  token: string;
}) => {
  return clientApi(`/server/supercar/v1/shop`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      ACCESS_TOKEN: token,
    },
    data,
  });
};

export const prefetchMarket = async (query: {
  [key: string]: string | number;
}) => {
  return serverFetcher(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/supercar/v1/shop`,
    { method: 'GET', query }
  );
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

  return serverFetcher(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/supercar/v1/shop`,
    {
      method: 'GET',
      headers,
      params: id,
    }
  ).then((res) => {
    const { ok, status, ...rest } = res;
    return rest;
  });
};
