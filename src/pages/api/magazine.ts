import type { NextApiRequest, NextApiResponse } from 'next/types';
import { getPlaiceholder } from 'plaiceholder';
import { MagazineDto, MagazineResponse } from 'types/magazine';
import { getErrorMessage } from 'utils/misc';

export default async function handler(_: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await fetch(
      'http://localhost:3000/server/api/v1/magazine',
      { method: 'GET' }
    );

    if (!response.ok) throw new Error('invalid api');

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
}
