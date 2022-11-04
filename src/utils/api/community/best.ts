import type { NextApiHandler } from 'next/types';
import { getPlaiceholder } from 'plaiceholder';
import type { CommunityBestResponse, CommunityDto } from 'types/community';
import { getErrorMessage } from 'utils/misc';

const communityBestApi: NextApiHandler = async (_, res) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/server/api/v1/community-best`,
      { method: 'GET' }
    );

    if (!response.ok) throw new Error('invalid api');

    const community: CommunityBestResponse<CommunityDto> =
      await response.json();

    const communityWithBluredImage = await Promise.all(
      community.data.map(async (m) => {
        const { base64 } = await getPlaiceholder(m.thumbnailImgSrc);
        return {
          ...m,
          base64,
        };
      })
    ).then((v) => v);

    return res.status(200).json({
      ...community,
      data: communityWithBluredImage,
    });
  } catch (e) {
    throw new Error(getErrorMessage(e));
  }
};

export { communityBestApi };
