import { get } from '@supercarmarket/lib';
import { type Query } from '@supercarmarket/types/base';

export const getSearch = async ({
  query,
}: {
  query: Pick<Query, 'category' | 'keyword' | 'page' | 'filter'>;
}) => {
  const { category, keyword, page, filter } = query;

  let currentQuery = {};
  currentQuery = {
    ...currentQuery,
    category: category === 'all' ? 'null' : category,
    page: page + 1,
    keyword,
  };

  if (filter !== 'created_date') currentQuery = { ...currentQuery, filter };

  return get('/server/supercar/v1/search', {
    method: 'GET',
    query: currentQuery,
  });
};

export const prefetchSearch = async (
  query: Pick<Query, 'category' | 'keyword' | 'page' | 'filter'>
) => {
  const { category, keyword, page, filter } = query;

  let currentQuery = {};

  currentQuery = {
    ...currentQuery,
    category: category === 'all' ? 'null' : category,
    page: page + 1,
    keyword,
  };

  if (filter !== 'created_date') currentQuery = { ...currentQuery, filter };

  return get(`${process.env.NEXT_PUBLIC_SERVER_URL}/supercar/v1/search`, {
    method: 'GET',
    query: currentQuery,
  });
};
