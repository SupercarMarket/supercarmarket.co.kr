import { get } from '@supercarmarket/lib';
import { PaginationResponse, ServerResponse } from '@supercarmarket/types/base';
import {
  CommunityDto,
  CommunityPostDto,
} from '@supercarmarket/types/community';
import { authRequest } from 'http/core';

export const getCommunity = async ({
  query,
}: {
  query: {
    category: string;
    page: number;
    filter?: string;
    searchType?: string;
    keyword?: string;
  };
}) => {
  const { category = 'report', page = 0, filter, searchType, keyword } = query;

  const currentQuery = keyword && {
    searchType,
    keyword,
  };

  return get<PaginationResponse<CommunityDto[]>>(
    '/server/supercar/v1/community',
    {
      method: 'GET',
      query: {
        filter,
        page: page + 1,
        category: category === 'all' ? 'report' : category,
        ...currentQuery,
      },
    }
  );
};

export const getCommunityPost = async ({
  category,
  id,
  token,
}: {
  category: string;
  id: string;
  token?: string;
}) => {
  const headers = token ? { ACCESS_TOKEN: token } : undefined;

  return get<ServerResponse<CommunityPostDto>>(
    `/server/supercar/v1/community/${category}/post-id/${id}`,
    {
      method: 'GET',
      headers,
      credentials: 'include',
    }
  );
};

export const likeCommunityPost = async ({
  id,
  category,
}: {
  id: string;
  category: string;
}) => {
  return authRequest<{ category: string }, ServerResponse<boolean>>(
    `/community/${id}`,
    {
      method: 'POST',
      data: { category },
    }
  );
};

export const deleteCommunityPost = async ({
  data,
}: {
  data: {
    id: string;
    category?: string;
  }[];
}) => {
  return authRequest(`/community`, {
    method: 'DELETE',
    data,
  });
};

export const uploadCommunityPost = async (data: FormData) => {
  return authRequest('/community', {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data,
  });
};

export const updateCommunityPost = async (data: FormData, id: string) => {
  return authRequest(`/community/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data,
  });
};

export const uploadTemporaryStorage = async (data: FormData) => {
  return authRequest('/community-temp', {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data,
  });
};

export const getTemporaryStorage = async () => {
  return authRequest(`/server/supercar/v1/community-temp`, {
    method: 'GET',
  });
};

export const prefetchCommunityPost = async ({
  id,
  category,
  token,
  boardView,
}: {
  id: string;
  category: string;
  token?: string;
  boardView?: string;
}) => {
  let headers = {};
  if (token) headers = { ...headers, ACCESS_TOKEN: token };
  if (boardView) headers = { ...headers, Cookie: `boardView=${boardView}` };

  return get(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/supercar/v1/community/${category}/post-id/${id}`,
    {
      method: 'GET',
      headers,
    }
  );
};

export const prefetchTemporaryStorage = async (token: string) => {
  return get(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/supercar/v1/community-temp`,
    {
      method: 'GET',
      headers: {
        ACCESS_TOKEN: token,
      },
    }
  );
};
