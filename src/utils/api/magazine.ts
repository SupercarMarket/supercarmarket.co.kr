import type { NextApiHandler } from 'next/types';
import { getPlaiceholder } from 'plaiceholder';
import { Params } from 'types/base';
import type { MagazineDto, MagazineResponse } from 'types/magazine';
import { ErrorCode } from 'utils/error';
import { catchNoExist, getErrorMessage } from 'utils/misc';

import { getSession } from './auth/user';
import fetcher, { baseFetcher } from './fetcher';

const magazineApi: NextApiHandler = async (_, res) => {
  const response = await fetcher(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/supercar/v1/magazine`,
    { method: 'GET' }
  );

  if (!response.ok)
    return res
      .status(response.status)
      .json({ message: ErrorCode[response.status] });

  const magazine: MagazineResponse<MagazineDto> = await response.json();

  if (!magazine.data.every((v) => v.imgSrc))
    return res
      .status(481)
      .json({ message: 'imgSrc 필드가 존재하지 않습니다.' });

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
};

const magazinePostApi: NextApiHandler = async (req, res) => {
  const { id } = req.query as Params;
  const session = await getSession({ req });

  catchNoExist(id);

  if (!session) return res.status(430).json({ message: ErrorCode[430] });

  try {
    const magazinePost = await baseFetcher(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/supercar/v1/magazine/${id}`,
      {
        headers: {
          ACCESS_TOKEN: session.accessToken,
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
  const session = await getSession({ req });

  catchNoExist(postId);

  if (!session) return res.status(430).json({ message: ErrorCode[430] });

  try {
    const scrape = await baseFetcher(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/supercar/v1/magazine/${postId}/scrap`,
      {
        headers: {
          ACCESS_TOKEN: session.accessToken,
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
  const session = await getSession({ req });

  catchNoExist(postId);

  if (!session) return res.status(430).json({ message: ErrorCode[430] });

  try {
    const counseling = await baseFetcher(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/supercar/v1/magazine/${postId}/inquiry`,
      {
        headers: {
          ACCESS_TOKEN: session.accessToken,
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
