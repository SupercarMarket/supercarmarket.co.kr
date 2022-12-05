import type { NextApiHandler } from 'next';
import { ServerApiError } from 'utils/error';
import { getErrorMessage } from 'utils/misc';

const marketLikeApi: NextApiHandler = async (req, res) => {
  const id = req.body;

  if (!id) throw new Error('invalid id');
  if (typeof id !== 'string') throw new Error('invalid id');

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/supercar/v1/shop/${id}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Autorization: `Bearer ${user.accessToken}`,
          body: JSON.stringify({ id }),
        },
      }
    );

    if (!response.ok) throw new ServerApiError(response.url);

    const like = await response.json();
    return res.status(200).json(like);
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export { marketLikeApi };
