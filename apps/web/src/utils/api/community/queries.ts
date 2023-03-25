import {
  type ServerResponse,
  type PaginationResponse,
} from '@supercarmarket/types/base';
import {
  type CommunityPostDto,
  type CommunityDto,
} from '@supercarmarket/types/community';
import { useQuery } from '@tanstack/react-query';
import { getCommunity, getCommunityPost } from './apis';
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
  return useQuery<PaginationResponse<CommunityDto[]>>(
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

  return useQuery<ServerResponse<CommunityPostDto>>(
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
