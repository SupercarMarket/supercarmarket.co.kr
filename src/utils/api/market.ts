import type { NextApiHandler } from 'next/types';
import { getPlaiceholder } from 'plaiceholder';
import type { Params } from 'types/base';
import { MarketDto, MarketResponse } from 'types/market';
import fetcher from 'utils/api/fetcher';
import { ErrorCode } from 'utils/error';
import { catchNoExist } from 'utils/misc';

const marketApi: NextApiHandler = async (req, res) => {
  const { category, filter, orderBy, page } = req.query as Params;

  catchNoExist(category, filter, orderBy, page);

  console.log(req.query);

  const query =
    category === 'all'
      ? { filter, orderBy, page }
      : { category, filter, orderBy, page };

  const response = await fetcher(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/supercar/v1/shop`,
    {
      method: 'GET',
      query: {
        ...query,
        page: parseInt(query.page) + 1,
      },
    }
  );

  if (!response.ok)
    return res
      .status(response.status)
      .json({ message: ErrorCode[response.status] });

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
};

export { marketApi };
