import type { NextApiHandler } from 'next';
import { getPlaiceholder } from 'plaiceholder';

export const base64Api: NextApiHandler = async (req, res) => {
  const { src } = req.body;

  const { base64 } = await getPlaiceholder(
    src || `${process.env.NEXT_PUBLIC_URL}/images/base.png`
  );

  return res.status(200).json({
    data: {
      base64,
    },
  });
};
