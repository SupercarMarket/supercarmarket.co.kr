import type { NextApiHandler } from 'next/types';
import { getPlaiceholder } from 'plaiceholder';
import type {
  MagazineDto,
  MagazinePostingResponse,
  MagazineResponse,
} from 'types/magazine';
import { ServerApiError } from 'utils/error';
import { getErrorMessage } from 'utils/misc';

const magazineApi: NextApiHandler = async (_, res) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/supercar/v1/magazine`,
      { method: 'GET' }
    );

    if (!response.ok) throw new ServerApiError(response.url);

    const magazine: MagazineResponse<MagazineDto> = await response.json();

    const magazineWithBluredImage = await Promise.all(
      magazine.data.map(async (m) => {
        const { base64 } = await getPlaiceholder(m.imgSrc);
        return {
          ...m,
          base64,
        };
      })
    ).then((v) => v);

    return res.status(200).json({
      ...magazine,
      data: magazineWithBluredImage,
    });
  } catch (e) {
    throw new Error(getErrorMessage(e));
  }
};

const magazinePostApi: NextApiHandler = async (req, res) => {
  const { id } = req.query;

  if (!id) throw new Error('invalid query');
  if (typeof id !== 'string') throw new Error('invalid query');

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/supercar/v1/magazine/${id}`,
      {
        method: 'GET',
      }
    );

    if (!response.ok) throw new ServerApiError(response.url);

    const magazinePost: MagazinePostingResponse = await response.json();

    return res.status(200).json(magazinePost);
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export { magazineApi, magazinePostApi };
