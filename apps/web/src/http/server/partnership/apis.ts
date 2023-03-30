import { clientFetcher, get, serverFetcher } from '@supercarmarket/lib';

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

  return get('/server/supercar/v1/partnership', {
    method: 'GET',
    query: {
      ...currentQuery,
      page: page + 1,
    },
  });
};

export const getPartnershipPost = async ({ id }: { id: string }) => {
  return get(`/server/supercar/v1/partnership`, {
    method: 'GET',
    params: id,
  });
};

export const prefetchPartnership = async () => {
  return get(`${process.env.NEXT_PUBLIC_SERVER_URL}/supercar/v1/partnership`, {
    method: 'GET',
  });
};

export const prefetchPartnershipPost = async (id: string) => {
  return get(`${process.env.NEXT_PUBLIC_SERVER_URL}/supercar/v1/partnership`, {
    method: 'GET',
    params: id,
  });
};
