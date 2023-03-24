import {
  clientFetcher,
  homeCategoryFormatter,
  serverFetcher,
} from '@supercarmarket/lib';

export const getHome = async (
  category: 'market' | 'magazine' | 'best' | 'new' | 'community' | 'partnership'
) => {
  return clientFetcher('/server/supercar/v1/main', {
    method: 'GET',
    query: {
      category: homeCategoryFormatter(category),
    },
  });
};

export const prefetchHome = async (
  category: 'market' | 'magazine' | 'best' | 'new' | 'community' | 'partnership'
) => {
  return serverFetcher(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/supercar/v1/main`,
    {
      method: 'GET',
      query: {
        category: homeCategoryFormatter(category),
      },
    }
  ).then((res) => {
    const { ok, status, ...rest } = res;
    return rest;
  });
};
