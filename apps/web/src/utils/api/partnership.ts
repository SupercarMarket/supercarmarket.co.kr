import type { NextApiHandler } from 'next/types';
import { getPlaiceholder } from 'plaiceholder';
import {
  PartnershipDetailResponse,
  PartnershipDto,
  PartnershipResponse,
} from 'types/partnership';
import { baseFetcher } from 'utils/api/fetcher';

const partnershipApi: NextApiHandler = async (req, res) => {
  const { query } = req;

  console.log(query);
  try {
    const partnerships: PartnershipResponse<PartnershipDto> = await baseFetcher(
      `${process.env.NEXT_PUBLIC_URL}/server/api/v1/partner`,
      {
        method: 'get',
      }
    );

    console.log(partnerships);

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
  } catch (err) {
    console.log(err);
    res.json({});
  }
};

const partnershipDetailApi: NextApiHandler = async (req, res) => {
  const { pid } = req.query;

  console.log(pid);

  try {
    const partnerships: PartnershipDetailResponse<string> = await baseFetcher(
      `${process.env.NEXT_PUBLIC_URL}/server/api/v1/partner/${pid}`,
      {
        method: 'get',
      }
    );

    const partnershipDetailBluredImage = await Promise.all(
      partnerships.data.partnerDetail.imgSrc.map(async (m) => {
        const { base64 } = await getPlaiceholder(m);
        return {
          imgSrc: m,
          base64,
        };
      })
    ).then((v) => v);

    const partnershipDetailWithBluredImage = {
      ...partnerships.data.partnerDetail,
      imgSrc: partnershipDetailBluredImage,
    };

    const partnershipsWithBluredImage = await Promise.all(
      partnerships.data.partnerList.map(async (m) => {
        const { base64 } = await getPlaiceholder(m.imgSrc);
        return {
          ...m,
          base64,
        };
      })
    ).then((v) => v);

    res.status(200).json({
      ...partnerships,
      data: {
        partnerDetail: partnershipDetailWithBluredImage,
        partnerList: partnershipsWithBluredImage,
      },
    });
  } catch (err) {
    console.log(err);
    res.json({});
  }
};

export { partnershipApi, partnershipDetailApi };
