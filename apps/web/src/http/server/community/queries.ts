import { useQuery } from '@tanstack/react-query';
import { getCommunity, getCommunityPost, getTemporaryStorage } from './apis';
import { QUERY_KEYS } from './keys';

export const useCommunity = (
  query: {
    category: string;
    page: number;
    filter?: string;
    searchType?: string;
    keyword?: string;
  },
  options = {}
) => {
  return useQuery(
    [...QUERY_KEYS.community(), query],
    () => getCommunity({ query }),
    { ...options, useErrorBoundary: true }
  );
};

export const useCommunityPost = (
  query: {
    subject: string;
    category: string;
    id: string;
  },
  token?: string,
  options = {}
) => {
  const { subject, category, id } = query;

  return useQuery(
    [
      ...QUERY_KEYS.id(id),
      {
        subject,
        category,
      },
    ],
    () => getCommunityPost({ category, id, token }),
    { ...options, useErrorBoundary: true }
  );
};

export const useTemporaryStorage = (id: string, options = {}) => {
  return useQuery<Common.Response<Community.CommunityTemporaryStorageDto>>(
    QUERY_KEYS.temporaryStorage(id),
    () => getTemporaryStorage(),
    { ...options, useErrorBoundary: true }
  );
};
