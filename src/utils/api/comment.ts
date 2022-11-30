import type { NextApiHandler } from 'next';
import type { CommentResponse } from 'types/comment';
import { ServerApiError } from 'utils/error';
import { getErrorMessage } from 'utils/misc';

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

const commentCreateApi: NextApiHandler = async (req, res) => {
  try {
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export { commentApi };
