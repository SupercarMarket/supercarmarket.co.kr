import {
  ErrorCode,
  catchNoExist,
  fetcher,
  getErrorMessage,
} from '@supercarmarket/lib';
import { Params } from '@supercarmarket/types/base';
import {
  PartnershipDetailResponse,
  PartnershipDto,
  PartnershipResponse,
} from '@supercarmarket/types/partnership';
import type { NextApiHandler } from 'next/types';
import { getPlaiceholder } from 'plaiceholder';

const partnershipApi: NextApiHandler = async (req, res) => {
  const query = req.query as Params;

  try {
    const response = await fetcher(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/supercar/v1/partnership`,
      {
        method: 'GET',
        query: {
          ...query,
          page: query.page ? String(+query.page + 1) : '1',
          category: query.category.toUpperCase(),
        },
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

export { partnershipApi };
