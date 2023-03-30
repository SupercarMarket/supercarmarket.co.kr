import {
  clientFetcher,
  partnershipFormatter,
  serverFetcher,
} from '@supercarmarket/lib';

export const getPartnership = async (query: {
  category: string;
  page: number;
  pageSize?: string;
  region?: string;
  keyword?: string;
}) => {
  const { category, page, ...rest } = query;

  let currentQuery =
    category === 'all'
      ? { page, ...rest }
      : { category: category.toUpperCase(), ...rest };

  return clientFetcher('/server/supercar/v1/partnership', {
    method: 'GET',
    query: {
      ...currentQuery,
      page: page + 1,
    },
  });
};

export const getPartnershipPost = async ({ id }: { id: string }) => {
  return clientFetcher(`/server/supercar/v1/partnership`, {
    method: 'GET',
    params: id,
  });
};

export const prefetchPartnership = async () => {
  return serverFetcher(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/supercar/v1/partnership`,
    {
      method: 'GET',
    }
  ).then((res) => {
    const { ok, status, ...rest } = res;
    return rest;
  });
};

export const prefetchPartnershipPost = async (id: string) => {
  return serverFetcher(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/supercar/v1/partnership`,
    {
      method: 'GET',
      params: id,
    }
  ).then((res) => {
    const { ok, status, ...rest } = res;
    return rest;
  });
};
