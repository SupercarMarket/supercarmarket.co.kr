import type { NextApiHandler } from 'next/types';
import { getPlaiceholder } from 'plaiceholder';
import { MarketDetailDto, MarketDetailResponse, MarketDto } from 'types/market';
import { getErrorMessage } from 'utils/misc';

const marketDetailApi: NextApiHandler = async (req, res) => {
  const { id } = req.query;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/supercar/v1/shop/${id}`,
      { method: 'GET' }
    );

    if (!response.ok) throw new Error('invalid api');

    const { data, carList }: MarketDetailResponse<MarketDetailDto<string>> =
      await response.json();

    const bluredImage = await Promise.all(
      data.imgSrc.map(async (imgSrc) => {
        const { base64 } = await getPlaiceholder(imgSrc);
        return { imgSrc, base64 };
      })
    );

    const carDetailWithBluredImage: MarketDetailDto<{
      imgSrc: string;
      base64: string;
    }> = { ...data, imgSrc: bluredImage };

    console.log(carDetailWithBluredImage);

    const carListsWithBluredImage: MarketDto[] = await Promise.all(
      carList.map(async (m) => {
        const { base64 } = await getPlaiceholder(m.imgSrc);
        return {
          ...m,
          base64,
        };
      })
    ).then((v) => v);

    return res.status(200).json({
      data: carDetailWithBluredImage,
      carList: carListsWithBluredImage,
    });
  } catch (e) {
    throw new Error(getErrorMessage(e));
  }
};

export { marketDetailApi };
