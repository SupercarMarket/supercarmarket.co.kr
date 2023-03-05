import {
  ErrorCode,
  catchNoExist,
  fetcher,
  getErrorMessage,
} from '@supercarmarket/lib';
import { Params } from '@supercarmarket/types/base';
import { PARTNERSHIP_API_CATEGORY_MAPPER } from 'constants/partnership';
import type { NextApiHandler } from 'next/types';
import { getPlaiceholder } from 'plaiceholder';
import {
  PartnershipDetailResponse,
  PartnershipDto,
  PartnershipResponse,
} from 'types/partnership';

const partnershipApi: NextApiHandler = async (req, res) => {
  const query = req.query as Params;

  query.page = query.page ? String(+query.page + 1) : '1';
  query.category = PARTNERSHIP_API_CATEGORY_MAPPER[query.category];

  try {
    const response = await fetcher(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/supercar/v1/partnership`,
      {
        method: 'get',
        query,
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
  const { id } = req.query;

  catchNoExist(id);

  try {
    const response = await fetcher(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/supercar/v1/partnership/${id}`,
      {
        method: 'get',
      }
    );

    if (!response.ok)
      return res
        .status(response.status)
        .json({ message: ErrorCode[response.status] });

    const partnerships: PartnershipDetailResponse<string> =
      await response.json();

    res.status(200).json(partnerships);
  } catch (err) {
    console.log(err);
    res.json({});
  }
};

export { partnershipApi, partnershipDetailApi };
