import type { NextApiHandler } from 'next/types';
import { getPlaiceholder } from 'plaiceholder';
import type { Params } from '@supercarmarket/types/base';
import {
  MarketDetailDto,
  MarketDetailResponse,
  MarketDto,
  MarketResponse,
} from '@supercarmarket/types/market';
import fetcher from 'utils/api/fetcher';
import { ErrorCode } from 'utils/error';
import { catchNoExist, getErrorMessage } from 'utils/misc';

const marketApi: NextApiHandler = async (req, res) => {
  const { category, filter, orderBy, page, ...rest } = req.query as Params;

  catchNoExist(category, filter, orderBy, page);

  const query =
    category === 'all'
      ? { filter, orderBy, page, ...rest }
      : { category, filter, orderBy, page, ...rest };

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

const marketDetailApi: NextApiHandler = async (req, res) => {
  const { id } = req.query;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/supercar/v1/shop/${id}`,
      { method: 'GET' }
    );

    if (!response.ok) throw new Error('invalid api');

    const { data, carList }: MarketDetailResponse<MarketDetailDto<string>> =
      await response.json();

    const bluredImage = await Promise.all(
      data.imgSrc.map(async (imgSrc) => {
        const { base64 } = await getPlaiceholder(imgSrc);
        return { imgSrc, base64 };
      })
    );

    const carDetailWithBluredImage: MarketDetailDto<{
      imgSrc: string;
      base64: string;
    }> = { ...data, imgSrc: bluredImage };

    const carListsWithBluredImage: MarketDto[] = await Promise.all(
      carList.map(async (m) => {
        const { base64 } = await getPlaiceholder(m.imgSrc);
        return {
          ...m,
          base64,
        };
      })
    ).then((v) => v);

    return res.status(200).json({
      data: carDetailWithBluredImage,
      carList: carListsWithBluredImage,
    });
  } catch (e) {
    throw new Error(getErrorMessage(e));
  }
};

export { marketApi, marketDetailApi };
