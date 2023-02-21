import type { NextApiHandler } from 'next';
import type { Params, ServerResponse } from '@supercarmarket/types/base';
import type { CommentResponse } from '@supercarmarket/types/comment';
import { ErrorCode } from 'utils/error';
import { catchNoExist } from 'utils/misc';

import { getSession } from './auth/user';
import fetcher, { baseApi } from './fetcher';

type MessageResponse = ServerResponse<{ message: string }>;

const commentApi: NextApiHandler = async (req, res) => {
  const { id, page, category, orderby } = req.query as Params;
  const session = await getSession({ req });

  const headers = session
    ? {
        ACCESS_TOKEN: session.accessToken,
      }
    : undefined;

  catchNoExist(id, page, category, orderby);

  const response = await fetcher(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/supercar/v1/post/${id}/comment`,
    {
      headers,
      method: 'GET',
      query: {
        page: parseInt(page) + 1,
        orderby,
        category,
      },
    }
  );

  if (!response.ok)
    return res
      .status(response.status)
      .json({ message: ErrorCode[response.status] });

  const comment: CommentResponse = await response.json();

  return res.status(200).json(comment);
};

const commentCreateApi: NextApiHandler = async (req, res) => {
  const { contents } = req.body;
  const { postId, parentId } = req.query as Params;

  catchNoExist(contents, postId);

  const session = await getSession({ req });

  const headers = session
    ? {
        ACCESS_TOKEN: session.accessToken,
      }
    : undefined;

  const query =
    parentId === 'null'
      ? {
          category: 'magazine',
        }
      : {
          parentId,
          category: 'magazine',
        };

  const response = await baseApi<MessageResponse>(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/supercar/v1/post/${postId}/comment`,
    {
      method: 'POST',
      headers,
      query,
      data: { contents },
    }
  );

  const { ok, status, data } = response;

  if (!ok) return res.status(status).json({ message: ErrorCode[status] });

  return res.status(200).json(data);
};

const commentUpdateApi: NextApiHandler = async (req, res) => {
  const { postId, commentId } = req.query as Params;
  const { contents } = req.body;

  catchNoExist(postId, commentId, contents);

  const session = await getSession({ req });

  const headers = session
    ? {
        ACCESS_TOKEN: session.accessToken,
      }
    : undefined;

  const response = await baseApi<MessageResponse>(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/supercar/v1/post/${postId}/comment/${commentId}`,
    {
      method: 'PATCH',
      headers,
      query: {
        category: 'magazine',
      },
      data: { contents },
    }
  );

  const { ok, status, data } = response;

  if (!ok) return res.status(status).json({ message: ErrorCode[status] });

  return res.status(200).json(data);
};

const commentLikeApi: NextApiHandler = async (req, res) => {
  const { postId, commentId } = req.query as Params;

  catchNoExist(postId, commentId);

  const session = await getSession({ req });

  const headers = session
    ? {
        ACCESS_TOKEN: session.accessToken,
      }
    : undefined;

  const response = await fetcher(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/supercar/v1/post/${postId}/comment/${commentId}/like`,
    {
      headers: headers,
      query: {
        category: 'magazine',
      },
      method: 'POST',
    }
  );

  if (!response.ok)
    return res
      .status(response.status)
      .json({ message: ErrorCode[response.status] });

  const like = await response.json();

  return res.status(200).json(like);
};

const commentRemoveApi: NextApiHandler = async (req, res) => {
  const { postId, commentId } = req.query as Params;

  catchNoExist(postId, commentId);

  const session = await getSession({ req });

  const headers = session
    ? {
        ACCESS_TOKEN: session.accessToken,
      }
    : undefined;

  const response = await fetcher(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/supercar/v1/post/${postId}/comment/${commentId}`,
    {
      headers,
      query: {
        category: 'magazine',
      },
      method: 'DELETE',
    }
  );

  if (!response.ok)
    return res
      .status(response.status)
      .json({ message: ErrorCode[response.status] });

  const remove = await response.json();

  return res.status(200).json(remove);
};

export {
  commentApi,
  commentCreateApi,
  commentLikeApi,
  commentRemoveApi,
  commentUpdateApi,
};
