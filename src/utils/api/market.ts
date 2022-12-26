import type { NextApiHandler } from 'next/types';
import { getPlaiceholder } from 'plaiceholder';
import { MarketDto, MarketResponse } from 'types/market';
import { baseFetcher } from 'utils/api/fetcher';
import { getErrorMessage } from 'utils/misc';

const marketApi: NextApiHandler = async (req, res) => {
  let query = decodeURI(req.url?.split('?')[1] || '');

  if (query.match('전체')) {
    query = query.replace('category=전체', '');
  }

  if (query.match('클래식카&올드카')) {
    query = query.replace('클래식카&올드카', '클래식카%26올드카');
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
