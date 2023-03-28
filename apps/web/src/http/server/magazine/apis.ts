import { clientFetcher, serverFetcher } from '@supercarmarket/lib';

export const getMagazine = async ({
  page,
  keyword,
}: {
  page: number;
  keyword?: string;
}) => {
  const currentQuery = keyword
    ? { keyword, page: page + 1 }
    : { page: page + 1 };
  return clientFetcher('/server/supercar/v1/magazine', {
    method: 'GET',
    query: currentQuery,
  });
};

export const getMagazinePost = async ({
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

  return clientFetcher('/server/supercar/v1/magazine', {
    method: 'GET',
    headers,
    params: id,
  });
};

export const scrapMagazinePost = async ({
  id,
  token,
}: {
  id: string;
  token: string;
}) => {
  return clientFetcher(`/server/supercar/v1/magazine/${id}/scrap`, {
    method: 'POST',
    headers: {
      ACCESS_TOKEN: token,
    },
  });
};

export const inquiryMagazine = async ({
  id,
  token,
}: {
  id: string;
  token: string;
}) => {
  return clientFetcher(`/server/supercar/v1/magazine/${id}/inquiry`, {
    method: 'POST',
    headers: {
      ACCESS_TOKEN: token,
      'Content-Type': 'application/json',
    },
  });
};

export const prefetchMagazine = async ({ page }: { page: number }) => {
  return serverFetcher(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/supercar/v1/magazine`,
    {
      method: 'GET',
      query: {
        page: page + 1,
      },
    }
  ).then((res) => {
    const { ok, status, ...rest } = res;
    return rest;
  });
};

export const prefetchMagazinePost = async ({
  id,
  token,
  boardView,
}: {
  id: string;
  token?: string;
  boardView?: string;
}) => {
  let headers = {};
  if (token) headers = { ...headers, ACCESS_TOKEN: token };
  if (boardView) headers = { ...headers, Cookie: `boardView=${boardView}` };

  return serverFetcher(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/supercar/v1/magazine`,
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
