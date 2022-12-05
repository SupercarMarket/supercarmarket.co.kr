import type { NextApiHandler } from 'next';
import { Params } from 'types/base';
import type { CommentResponse } from 'types/comment';
import { catchNoExist, getErrorMessage } from 'utils/misc';

import { baseFetcher } from './fetcher';

const commentApi: NextApiHandler = async (req, res) => {
  const { id } = req.query as Params;

  catchNoExist(id);

  try {
    const comment: CommentResponse = await baseFetcher(
      `${process.env.NEXT_PUBLIC_URL}/server/api/v1/comment/${id}`,
      { method: 'GET' }
    );

    return res.status(200).json(comment);
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

const commentCreateApi: NextApiHandler = async (req, res) => {
  const { user, contents } = req.body;
  const { id, parentId } = req.query as Params;

  catchNoExist(user, contents, id);

  try {
    const create = await baseFetcher(
      `${process.env.NEXT_PUBLIC_URL}/server/api/v1/comment/${id}${
        parentId && `?parentId=${parentId}`
      }`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.accessToken}`,
        },
        body: JSON.stringify({ contents }),
      }
    );

    return res.status(200).json(create);
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

const commentUpdateApi: NextApiHandler = async (req, res) => {
  const { postId, commentId } = req.query as Params;
  const { contents } = req.body;

  catchNoExist(postId, commentId, contents);

  try {
    const update = await baseFetcher(
      `${process.env.NEXT_PUBLIC_URL}/server/api/v1/${postId}/comment/${commentId}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ contents }),
      }
    );

    return res.status(200).json(update);
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

const commentLikeApi: NextApiHandler = async (req, res) => {
  const { postId, commentId } = req.query as Params;

  catchNoExist(postId, commentId);

  try {
    const like = await baseFetcher(
      `${process.env.NEXT_PUBLIC_URL}/server/api/v1/${postId}/comment/${commentId}`,
      {
        method: 'PATCH',
      }
    );

    return res.status(200).json(like);
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

const commentRemoveApi: NextApiHandler = async (req, res) => {
  const { postId, commentId } = req.query as Params;

  catchNoExist(postId, commentId);

  try {
    const remove = await baseFetcher(
      `${process.env.NEXT_PUBLIC_URL}/server/api/v1/${postId}/comment/${commentId}`,
      {
        method: 'DELETE',
      }
    );

    return res.status(200).json(remove);
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export {
  commentApi,
  commentCreateApi,
  commentLikeApi,
  commentRemoveApi,
  commentUpdateApi,
};
