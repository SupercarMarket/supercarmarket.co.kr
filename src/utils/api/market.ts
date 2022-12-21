import type { NextApiHandler } from 'next/types';
import { getPlaiceholder } from 'plaiceholder';
import { MarketDto, MarketResponse } from 'types/market';
import { baseFetcher } from 'utils/api/fetcher';
import { getErrorMessage } from 'utils/misc';

const marketApi: NextApiHandler = async (req, res) => {
  let query = decodeURI(req.url?.split('?')[1] || '');

  if (query.match('모두')) {
    query = query.replace('category=모두', '');
  }

  try {
    const markets: MarketResponse<MarketDto> = await baseFetcher(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/supercar/v1/shop?${query}`,
      {
        method: 'get',
      }
    );

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
    console.log(e);
    throw new Error(getErrorMessage(e));
  }
};

export { marketApi };
