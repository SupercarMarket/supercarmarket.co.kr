import { get, homeCategoryFormatter } from '@supercarmarket/lib';
import { type Params, ServerResponse } from '@supercarmarket/types/base';

export const getHome = async (
  category:
    | 'market'
    | 'magazine'
    | 'best'
    | 'new'
    | 'community'
    | 'partnership',
  query?: Params
) => {
  return get('/server/supercar/v1/main', {
    query: {
      ...query,
      category: homeCategoryFormatter(category),
    },
  });
};

export const getBanner = async (type: 'D' | 'M' = 'D') => {
  return get<
    ServerResponse<
      {
        imageUrl: string;
        url: string;
      }[]
    >
  >('/server/supercar/v1/main/banner', {
    query: {
      type,
    },
  });
};

export const prefetchHome = async (
  category: 'market' | 'magazine' | 'best' | 'new' | 'community' | 'partnership'
) => {
  return get(`${process.env.NEXT_PUBLIC_SERVER_URL}/supercar/v1/main`, {
    query: {
      category: homeCategoryFormatter(category),
    },
  });
};

export const prefetchBanner = async (type: 'D' | 'M' = 'D') => {
  return get(`${process.env.NEXT_PUBLIC_SERVER_URL}/supercar/v1/main/banner`, {
    query: {
      type,
    },
  });
};
