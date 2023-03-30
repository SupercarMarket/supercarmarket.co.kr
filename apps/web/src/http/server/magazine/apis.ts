import { get } from '@supercarmarket/lib';
import { authRequest } from 'http/core';

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
  return get('/server/supercar/v1/magazine', {
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

  return get('/server/supercar/v1/magazine', {
    method: 'GET',
    headers,
    params: id,
  });
};

export const scrapMagazinePost = async ({ id }: { id: string }) => {
  return authRequest(`/magazine/${id}/scrap`, {
    method: 'POST',
  });
};

export const inquiryMagazine = async ({ id }: { id: string }) => {
  return authRequest(`/magazine/${id}/inquiry`, {
    method: 'POST',
  });
};

export const prefetchMagazine = async ({ page }: { page: number }) => {
  return get(`${process.env.NEXT_PUBLIC_SERVER_URL}/supercar/v1/magazine`, {
    method: 'GET',
    query: {
      page: page + 1,
    },
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

  return get(`${process.env.NEXT_PUBLIC_SERVER_URL}/supercar/v1/magazine`, {
    method: 'GET',
    headers,
    params: id,
  });
};
