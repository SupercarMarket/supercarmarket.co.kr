import type { NextApiHandler } from 'next';
import { getPlaiceholder } from 'plaiceholder';

const base64Api: NextApiHandler = async (req, res) => {
  const { src } = req.body;

  if (!src) return res.status(450).json({ message: 'src is require' });

  const { base64 } = await getPlaiceholder(src);

  return res.status(200).json({
    data: {
      base64,
    },
  });
};

export { base64Api };
