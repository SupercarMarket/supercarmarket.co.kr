import { ErrorCode, fetcher, getErrorMessage } from '@supercarmarket/lib';
import { Params } from '@supercarmarket/types/base';
import {
  PartnershipDto,
  PartnershipResponse,
} from '@supercarmarket/types/partnership';
import type { NextApiHandler } from 'next/types';
import { getPlaiceholder } from 'plaiceholder';

const partnershipApi: NextApiHandler = async (req, res) => {
  const { category, page, ...rest } = req.query as Params;
  const query =
    category === 'all'
      ? { page, ...rest }
      : { category: category.toUpperCase(), ...rest };

  try {
    const response = await fetcher(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/supercar/v1/partnership`,
      {
        method: 'GET',
        query: {
          ...query,
          page: page ? String(+page + 1) : '1',
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
        console.log('partnership thumbnail image', m.imgSrc);
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
