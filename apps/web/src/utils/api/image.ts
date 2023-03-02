import { catchNoExist, ErrorCode, fetcher } from '@supercarmarket/lib';
import type { Params } from '@supercarmarket/types/base';
import type { NextApiHandler } from 'next';
import { getPlaiceholder } from 'plaiceholder';

const base64: NextApiHandler = async (req, res) => {
  return res.status(200).json({});
};

const size: NextApiHandler = async (req, res) => {
  return res.status(200).json({});
};

export { base64, size };
