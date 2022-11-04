/**
 * Fetcher 함수는 이후 다른 폴더로 뺼 예정
 */

import { useQuery } from '@tanstack/react-query';
import queries from 'constants/queries';
import { MagazineResponse, WithBlurredImage } from 'types/magazine';

export const getServerCategoryQuery = (query: keyof typeof queries.home) => {
  if (query === 'best') return 'interestProduct';
  if (query === 'new') return 'latestProduct';
  return query;
};

const fetcher = async (category: keyof typeof queries.home) =>
  await fetch(`/api/home?category=${getServerCategoryQuery(category)}`, {
    method: 'GET',
  }).then((res) => res.json());

export default function useHome<T>(
  query: 'market' | 'magazine' | 'best' | 'new' | 'community' | 'partnership',
  options = {}
) {
  return useQuery<MagazineResponse<WithBlurredImage<T>>>(
    queries.home[query](),
    () => fetcher(query),
    options
  );
}
