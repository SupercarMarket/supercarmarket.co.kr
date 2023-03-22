import type { NextApiHandler } from 'next';
import type { Params, ServerResponse } from '@supercarmarket/types/base';
import { ErrorCode } from 'utils/error';
import { catchNoExist } from 'utils/misc';

import { getSession } from './auth/user';
import fetcher, { baseApi } from './fetcher';

type MessageResponse = ServerResponse<{ message: string }>;

const commentUpdateApi: NextApiHandler = async (req, res) => {
  const { postId, commentId, category } = req.query as Params;
  const { contents } = req.body;

  catchNoExist(postId, commentId, contents, category);

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
        category,
      },
      data: { contents },
    }
  );

  const { ok, status, data } = response;

  if (!ok) return res.status(status).json({ message: ErrorCode[status] });

  return res.status(200).json(data);
};

const commentLikeApi: NextApiHandler = async (req, res) => {
  const { postId, commentId, category } = req.query as Params;

  catchNoExist(postId, commentId, category);

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
        category,
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
  const { postId, commentId, category } = req.query as Params;

  catchNoExist(postId, commentId, category);

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
        category,
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

export { commentLikeApi, commentRemoveApi, commentUpdateApi };
