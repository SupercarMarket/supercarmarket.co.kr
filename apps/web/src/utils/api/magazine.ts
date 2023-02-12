import type { NextApiHandler } from 'next/types';
import { getPlaiceholder } from 'plaiceholder';
import { Params } from 'types/base';
import type { MagazineDto, MagazineResponse } from 'types/magazine';
import { ErrorCode } from 'utils/error';
import { catchNoExist, getErrorMessage } from 'utils/misc';

import { getSession } from './auth/user';
import fetcher, { baseFetcher } from './fetcher';

const magazineApi: NextApiHandler = async (req, res) => {
  const { page } = req.query as Params;

  catchNoExist(page);

  const response = await fetcher(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/supercar/v1/magazine`,
    {
      method: 'GET',
      query: {
        page: page + 1,
      },
    }
  );

  if (!response.ok)
    return res
      .status(response.status)
      .json({ message: ErrorCode[response.status] });

  const magazine: MagazineResponse<MagazineDto> = await response.json();

  const magazineWithBluredImage = await Promise.all(
    magazine.data.map(async (m) => {
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
    ...magazine,
    data: magazineWithBluredImage,
  });
};

const magazinePostApi: NextApiHandler = async (req, res) => {
  const { id } = req.query as Params;
  const session = await getSession({ req });

  const headers = session
    ? {
        ACCESS_TOKEN: session.accessToken,
      }
    : undefined;

  catchNoExist(id);

  const response = await fetcher(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/supercar/v1/magazine/${id}`,
    {
      headers,
      method: 'GET',
    }
  );

  if (!response.ok)
    return res
      .status(response.status)
      .json({ message: ErrorCode[response.status] });

  const magazinePost = await response.json();

  return res.status(200).json(magazinePost);
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
