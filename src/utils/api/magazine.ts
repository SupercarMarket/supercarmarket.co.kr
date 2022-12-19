import type { NextApiHandler } from 'next/types';
import { getPlaiceholder } from 'plaiceholder';
import { Params } from 'types/base';
import type { MagazineDto, MagazineResponse } from 'types/magazine';
import { catchNoExist, getErrorMessage } from 'utils/misc';

import { baseFetcher } from './fetcher';

const token =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhY2Nlc3NfdG9rZW4iLCJpYXQiOjE2NzAyNDYzMDMsImV4cCI6MTY3MDI4OTUwMywidXNlcklkIjoibWluc3UifQ.oglYTtlkyKFOxgoRpix2CAd3mLRjZft7nXol0Qyj0z0';

const magazineApi: NextApiHandler = async (_, res) => {
  try {
    const magazine: MagazineResponse<MagazineDto> = await baseFetcher(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/supercar/v1/magazine`,
      { method: 'GET' }
    );

    const magazineWithBluredImage = await Promise.all(
      magazine.data.map(async (m) => {
        const { base64 } = await getPlaiceholder(m.imgSrc);
        return {
          ...m,
          base64,
        };
      })
    ).then((v) => v);

    return res.status(200).json({
      ...magazine,
      data: magazineWithBluredImage,
    });
  } catch (e) {
    throw new Error(getErrorMessage(e));
  }
};

const magazinePostApi: NextApiHandler = async (req, res) => {
  const { id } = req.query as Params;

  catchNoExist(id);

  try {
    const magazinePost = await baseFetcher(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/supercar/v1/magazine/${id}`,
      {
        headers: {
          ACCESS_TOKEN: `Bearer ${token}`,
        },
        method: 'GET',
      }
    );

    return res.status(200).json(magazinePost);
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

const magazinePostScrapeApi: NextApiHandler = async (req, res) => {
  const { postId } = req.query as Params;

  catchNoExist(postId);

  try {
    const scrape = await baseFetcher(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/supercar/v1/magazine/${postId}/scrap`,
      {
        headers: {
          ACCESS_TOKEN: `Bearer ${token}`,
        },
        method: 'POST',
      }
    );

    return res.status(200).json(scrape);
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

const magazinePostCounselingApi: NextApiHandler = async (req, res) => {
  const { postId } = req.query as Params;

  catchNoExist(postId);

  try {
    const counseling = await baseFetcher(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/supercar/v1/magazine/${postId}/inquiry`,
      {
        headers: {
          ACCESS_TOKEN: `Bearer ${token}`,
        },
        method: 'POST',
      }
    );

    return res.status(200).json(counseling);
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export {
  magazineApi,
  magazinePostApi,
  magazinePostCounselingApi,
  magazinePostScrapeApi,
};
