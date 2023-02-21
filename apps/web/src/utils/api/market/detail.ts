import type { NextApiHandler } from 'next/types';
import { getPlaiceholder } from 'plaiceholder';
import { Params } from '@supercarmarket/types/base';
import {
  MarketDetailDto,
  MarketDetailResponse,
  MarketDto,
} from '@supercarmarket/types/market';
import { ErrorCode } from 'utils/error';

import fetcher from '../fetcher';

const marketDetailApi: NextApiHandler = async (req, res) => {
  const { id } = req.query as Params;

  const response = await fetcher(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/supercar/v1/shop`,
    { method: 'GET', params: id }
  );

  if (!response.ok)
    return res
      .status(response.status)
      .json({ message: ErrorCode[response.status] });

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
};

export { marketDetailApi };
