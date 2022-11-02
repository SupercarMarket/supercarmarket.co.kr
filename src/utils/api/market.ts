import type { NextApiHandler } from 'next/types';
import { getPlaiceholder } from 'plaiceholder';
import { MarketDto, MarketResponse } from 'types/market';
import { getErrorMessage } from 'utils/misc';

const marketApi: NextApiHandler = async (req, res) => {
  const query = req.query;

  try {
    const response = await fetch('http://localhost:3000/server/api/v1/market', {
      method: 'GET',
    });

    if (!response.ok) throw new Error('invalid api');

    const markets: MarketResponse<MarketDto> = await response.json();

    const marketsWithBluredImage = await Promise.all(
      markets.data.map(async (m) => {
        const { base64 } = await getPlaiceholder(m.imgSrc);
        return {
          ...m,
          base64,
        };
      })
    ).then((v) => v);

    return res.status(200).json({
      ...markets,
      data: marketsWithBluredImage,
    });
  } catch (e) {
    throw new Error(getErrorMessage(e));
  }
};

export { marketApi };
