import type { NextApiHandler } from 'next/types';
import { getPlaiceholder } from 'plaiceholder';
import { MarketDto, MarketResponse } from 'types/market';
import { getErrorMessage } from 'utils/misc';

const marketApi: NextApiHandler = async (_, res) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/server/api/v1/market`,
      {
        method: 'GET',
      }
    );

    if (!response.ok) throw new Error('invalid api');

    const market: MarketResponse<MarketDto> = await response.json();

    const marketWithBluredImage = await Promise.all(
      market.data.map(async (m) => {
        const { base64 } = await getPlaiceholder(m.imgSrc);
        return {
          ...m,
          base64,
        };
      })
    ).then((v) => v);

    return res.status(200).json({
      ...market,
      data: marketWithBluredImage,
    });
  } catch (e) {
    throw new Error(getErrorMessage(e));
  }
};

export { marketApi };
