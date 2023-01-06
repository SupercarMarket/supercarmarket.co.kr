import { CATEGORY_MAPPING } from 'constants/market';
import type { NextApiHandler } from 'next/types';
import { getPlaiceholder } from 'plaiceholder';
import { MarketDto, MarketResponse } from 'types/market';
import { baseFetcher } from 'utils/api/fetcher';
import { getErrorMessage } from 'utils/misc';

const marketApi: NextApiHandler = async (req, res) => {
  const query = req.url?.split('?')[1] || '';
  const category = query.substring(
    query.indexOf('category=') + 9,
    query.indexOf('&')
  ) as string;

  let replacedQuery;
  if (category === 'all') {
    replacedQuery = query.replace('category=all', '');
  } else {
    replacedQuery = query.replace(category, CATEGORY_MAPPING[category]);
  }

  try {
    const markets: MarketResponse<MarketDto> = await baseFetcher(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/supercar/v1/shop?${replacedQuery}`,
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
