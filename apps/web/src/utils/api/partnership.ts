import {
  ErrorCode,
  catchNoExist,
  fetcher,
  getErrorMessage,
} from '@supercarmarket/lib';
import { Params } from '@supercarmarket/types/base';
import { PARTNERSHIP_CATEGORY } from 'constants/partnership';
import type { NextApiHandler } from 'next/types';
import { getPlaiceholder } from 'plaiceholder';
import {
  PartnershipDetailResponse,
  PartnershipDto,
  PartnershipResponse,
} from 'types/partnership';

const partnershipApi: NextApiHandler = async (req, res) => {
  const query = req.query as Params;

  console.log(query);

  query.page = +query.page + 1 + '';

  try {
    const response = await fetcher(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/supercar/v1/partnership`,
      {
        method: 'get',
        // query,
      }
    );

    if (!response.ok)
      return res
        .status(response.status)
        .json({ message: ErrorCode[response.status] });

    const partnerships: PartnershipResponse<PartnershipDto> =
      await response.json();

    const partnershipsWithBluredImage = await Promise.all(
      partnerships.data.map(async (m) => {
        const { base64 } = await getPlaiceholder(m.imgSrc);
        return {
          ...m,
          base64,
        };
      })
    ).then((v) => v);
    res
      .status(200)
      .json({ ...partnerships, data: partnershipsWithBluredImage });
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

const partnershipDetailApi: NextApiHandler = async (req, res) => {
  const { pid } = req.query;

  catchNoExist(pid);

  try {
    const response = await fetcher(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/supercar/v1/partnership/${pid}`,
      {
        method: 'get',
      }
    );

    if (!response.ok)
      return res
        .status(response.status)
        .json({ message: ErrorCode[response.status] });

    const partnerships: PartnershipDetailResponse = await response.json();

    const partnershipDetailBluredImage = await Promise.all(
      partnerships.data.imgSrc.map(async (m) => {
        const { base64 } = await getPlaiceholder(m);
        return {
          base64,
          imgSrc: m,
        };
      })
    ).then((v) => v);

    const partnershipsData = {
      ...partnerships.data,
      imgSrc: partnershipDetailBluredImage,
    };

    res.status(200).json({
      data: partnershipsData,
    });
  } catch (err) {
    console.log(err);
    res.json({});
  }
};

export { partnershipApi, partnershipDetailApi };
