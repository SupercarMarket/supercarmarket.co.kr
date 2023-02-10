import { getServerCategoryQuery } from 'hooks/queries/useHome';
import type { NextApiHandler } from 'next/types';
import { getPlaiceholder } from 'plaiceholder';
import type { CommunityDto } from 'types/community';
import type { MagazineDto, MagazineResponse } from 'types/magazine';
import type { MarketDto } from 'types/market';
import { ErrorCode } from 'utils/error';
import { catchNoExist } from 'utils/misc';

import fetcher from './fetcher';

const homeApi: NextApiHandler = async (req, res) => {
  const { query } = req;
  const { category } = query;

  catchNoExist(query, category);

  const response = await fetcher(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/supercar/v1/main`,
    {
      method: 'GET',
      query: {
        category: getServerCategoryQuery(category as any),
      },
    }
  );

  if (!response.ok)
    return res
      .status(response.status)
      .json({ message: ErrorCode[response.status] });

  const home: MagazineResponse<MagazineDto | MarketDto | CommunityDto> =
    await response.json();

  const homeWithBluredImage = await Promise.all(
    home.data.map(async (m) => {
      const src = m.imgSrc || `/images/base.png`;

      const { base64 } = await getPlaiceholder(src);
      return {
        ...m,
        imgSrc: src,
        base64,
      };
    })
  ).then((v) => v);

  return res.status(200).json({
    ...home,
    data: homeWithBluredImage,
  });
};

export { homeApi };
