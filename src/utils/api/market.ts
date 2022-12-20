import type { NextApiHandler } from 'next/types';
import { getPlaiceholder } from 'plaiceholder';
import { MarketDto, MarketResponse } from 'types/market';
import { getErrorMessage } from 'utils/misc';

const marketApi: NextApiHandler = async (req, res) => {
  const query = req.url?.split('?')[1];

  console.log(query);

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/supercar/v1/shop?${query}`,
      {
        method: 'GET',
      }
    );

    console.log(response);

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

    return res.status(200).json({});
  } catch (e) {
    throw new Error(getErrorMessage(e));
  }
};

export { marketApi };
