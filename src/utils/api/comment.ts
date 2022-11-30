import { NextApiHandler } from 'next';
import { CommentResponse } from 'types/comment';
import { ServerApiError } from 'utils/error';
import { getErrorMessage } from 'utils/misc';

import fetcher, { FetcherRequestInit } from './fetcher';

const commentApi: NextApiHandler = async (req, res) => {
  const { id } = req.query;

  if (!id) throw new Error('invalid query');
  if (typeof id !== 'string') throw new Error('invalid query');

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/server/api/v1/comment/${id}`
    );

    if (!response.ok) throw new ServerApiError(response.url);

    const comment: CommentResponse = await response.json();

    return res.status(200).json(comment);
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

const commentApiFetcher = async (url: string, options: FetcherRequestInit) => {
  try {
    const response = await fetcher(url, options);

    if (!response.ok) throw new ServerApiError(response.url);

    return await response.json();
  } catch (error) {
    getErrorMessage(error);
  }
};

export { commentApi, commentApiFetcher };
