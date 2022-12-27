import type { NextApiHandler } from 'next';
import { Params } from 'types/base';
import type { CommentResponse } from 'types/comment';
import { catchNoExist, getErrorMessage } from 'utils/misc';

import { baseFetcher } from './fetcher';

const token =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhY2Nlc3NfdG9rZW4iLCJpYXQiOjE2NzAyNDYzMDMsImV4cCI6MTY3MDI4OTUwMywidXNlcklkIjoibWluc3UifQ.oglYTtlkyKFOxgoRpix2CAd3mLRjZft7nXol0Qyj0z0';

const commentApi: NextApiHandler = async (req, res) => {
  const { id } = req.query as Params;

  catchNoExist(id);

  try {
    const comment: CommentResponse = await baseFetcher(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/supercar/v1/post/${id}/comment`,
      {
        headers: {
          ACCESS_TOKEN: `Bearer ${token}`,
        },
        method: 'GET',
        query: {
          category: 'magazine',
        },
      }
    );

    return res.status(200).json(comment);
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

const commentCreateApi: NextApiHandler = async (req, res) => {
  const { user, contents } = req.body;
  const { postId, parentId } = req.query as Params;

  catchNoExist(user, contents, postId);

  try {
    const create = await baseFetcher(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/supercar/v1/post/${postId}/comment`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ACCESS_TOKEN: `Bearer ${token}`,
        },
        query: {
          parentId: parentId ? parentId : null,
          category: 'magazine',
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
      `${process.env.NEXT_PUBLIC_SERVER_URL}/supercar/v1/post/${postId}/comment/${commentId}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        query: {
          category: 'magazine',
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
      `${process.env.NEXT_PUBLIC_SERVER_URL}/supercar/v1/post/${postId}/comment/${commentId}/like`,
      {
        headers: {
          ACCESS_TOKEN: `Bearer ${token}`,
        },
        query: {
          category: 'magazine',
        },
        method: 'POST',
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
      `${process.env.NEXT_PUBLIC_SERVER_URL}/supercar/v1/post/${postId}/comment/${commentId}`,
      {
        headers: {
          ACCESS_TOKEN: `Bearer ${token}`,
        },
        query: {
          category: 'magazine',
        },
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
