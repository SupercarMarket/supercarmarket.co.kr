import { get, homeCategoryFormatter } from '@supercarmarket/lib';

export const getHome = async (
  category: 'market' | 'magazine' | 'best' | 'new' | 'community' | 'partnership'
) => {
  return get('/server/supercar/v1/main', {
    method: 'GET',
    query: {
      category: homeCategoryFormatter(category),
    },
  });
};

export const prefetchHome = async (
  category: 'market' | 'magazine' | 'best' | 'new' | 'community' | 'partnership'
) => {
  return get(`${process.env.NEXT_PUBLIC_SERVER_URL}/supercar/v1/main`, {
    method: 'GET',
    query: {
      category: homeCategoryFormatter(category),
    },
  });
};
