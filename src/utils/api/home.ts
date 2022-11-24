import { getServerCategoryQuery } from 'hooks/queries/home/useHome';
import type { NextApiHandler } from 'next/types';
import { getPlaiceholder } from 'plaiceholder';
import { CommunityDto } from 'types/community';
import { MagazineDto, MagazineResponse } from 'types/magazine';
import { MarketDto } from 'types/market';
import { ServerApiError } from 'utils/error';
import { getErrorMessage } from 'utils/misc';

import fetcher, { FetcherRequestInit } from './fetcher';

const homeApi: NextApiHandler = async (req, res) => {
  const { query } = req;
  const { category } = query;

  if (!category) throw new Error('invalid query');
  if (typeof category !== 'string') throw new Error('invalid query');

  try {
    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_SERVER_URL
      }/supercar/v1/main?category=${getServerCategoryQuery(category as any)}`,
      {
        method: 'GET',
      }
    );

    if (!response.ok) throw new ServerApiError(response.url);

    const home: MagazineResponse<MagazineDto | MarketDto | CommunityDto> =
      await response.json();

    const homeWithBluredImage = await Promise.all(
      home.data.map(async (m) => {
        const imgSrc = category === 'community' ? m.thumbnailImgSrc : m.imgSrc;
        const { base64 } = await getPlaiceholder(imgSrc);
        return {
          ...m,
          base64,
        };
      })
    ).then((v) => v);

    return res.status(200).json({
      ...home,
      data: homeWithBluredImage,
    });
  } catch (e) {
    throw new Error(getErrorMessage(e));
  }
};

const homeApiFetcher = async (url: string, options: FetcherRequestInit) => {
  try {
    const response = await fetcher(url, options);

    if (!response.ok) throw new ServerApiError(response.url);

    return await response.json();
  } catch (error) {
    getErrorMessage(error);
  }
};

export { homeApi, homeApiFetcher };
