import { clientApi, clientFetcher } from '@supercarmarket/lib';
import { Params } from '@supercarmarket/types/base';
import {
  type CommentQuery,
  type CommentResponse,
} from '@supercarmarket/types/comment';

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
  return clientFetcher(`/server/supercar/v1/post/${postId}/comment`, {
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
  token,
}: {
  data: { contents: string };
  query: Params;
  token: string;
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

  return clientApi(`/server/supercar/v1/post/${postId}/comment`, {
    method: 'POST',
    headers: {
      ACCESS_TOKEN: token,
      'Content-Type': 'application/json',
    },
    query: currentQuery,
    data,
  });
};

export const likeComment = async ({
  query,
  token,
}: {
  query: Params;
  token: string;
}) => {
  const { category, postId, commentId } = query;

  return clientFetcher(
    `/server/supercar/v1/post/${postId}/comment/${commentId}/like`,
    {
      method: 'POST',
      headers: {
        ACCESS_TOKEN: token,
      },
      query: {
        category,
      },
    }
  );
};

export const deleteComment = async ({
  query,
  token,
}: {
  query: Params;
  token: string;
}) => {
  const { category, postId, commentId } = query;

  return clientFetcher(
    `/server/supercar/v1/post/${postId}/comment/${commentId}`,
    {
      method: 'DELETE',
      headers: {
        ACCESS_TOKEN: token,
      },
      query: {
        category,
      },
    }
  );
};

export const updateComment = async ({
  query,
  data,
  token,
}: {
  query: Params;
  data: { contents: string };
  token: string;
}) => {
  const { category, postId, commentId } = query;

  return clientApi(`/server/supercar/v1/post/${postId}/comment/${commentId}`, {
    method: 'PATCH',
    headers: {
      ACCESS_TOKEN: token,
      'Content-Type': 'application/json',
    },
    query: {
      category,
    },
    data,
  });
};
