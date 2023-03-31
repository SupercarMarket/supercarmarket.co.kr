import { get } from '@supercarmarket/lib';
import { Params } from '@supercarmarket/types/base';
import {
  type CommentQuery,
  type CommentResponse,
} from '@supercarmarket/types/comment';
import { authRequest } from 'http/core';

export const getComments = async ({
  postId,
  query,
  token,
}: {
  postId: string;
  query: CommentQuery;
  token?: string;
}): Promise<CommentResponse> => {
  const { page, orderBy = 'DESC', category = 'magazine' } = query;

  const headers = token
    ? {
        ACCESS_TOKEN: token,
      }
    : undefined;
  return get(`/server/supercar/v1/post/${postId}/comment`, {
    method: 'GET',
    headers,
    query: {
      page: page + 1,
      orderby: orderBy === 'DESC' ? false : orderBy === 'ASC' ? true : false,
      category,
    },
  });
};

export const addComment = async ({
  data,
  query,
}: {
  data: { contents: string };
  query: Params;
}) => {
  const { category, postId, parentId } = query;

  const currentQuery = parentId
    ? {
        category,
        parentId,
      }
    : {
        category,
      };

  return authRequest(`/post/${postId}/comment`, {
    method: 'POST',
    params: currentQuery,
    data,
  });
};

export const likeComment = async ({ query }: { query: Params }) => {
  const { category, postId, commentId } = query;

  return authRequest(`/post/${postId}/comment/${commentId}/like`, {
    method: 'POST',
    params: {
      category,
    },
  });
};

export const deleteComment = async ({ query }: { query: Params }) => {
  const { category, postId, commentId } = query;

  return authRequest(`/post/${postId}/comment/${commentId}`, {
    method: 'DELETE',
    params: {
      category,
    },
  });
};

export const updateComment = async ({
  query,
  data,
}: {
  query: Params;
  data: { contents: string };
}) => {
  const { category, postId, commentId } = query;

  return authRequest(`/post/${postId}/comment/${commentId}`, {
    method: 'PATCH',
    params: {
      category,
    },
    data,
  });
};
