import type { NextApiHandler } from 'next';
import type { Session } from 'next-auth';
import type { GetSessionParams } from 'next-auth/react';
import { getSession as getSessionInner } from 'next-auth/react';
import type { Params, ServerResponse } from '@supercarmarket/types/base';
import { catchNoExist, getErrorMessage } from 'utils/misc';
import { post } from '@supercarmarket/lib';

type SignInResponse = ServerResponse<{
  access_token: string;
  refresh_token: string;
  exp: number;
}>;

const oauthApi: NextApiHandler = async (req, res) => {
  const { provider } = req.query as Params;
  const { sub, nickname, email, picture } = req.body;

  catchNoExist(provider, sub, nickname, email, picture);

  try {
    const oauth = await post(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/supercar/v1/user/login`,
      {
        method: 'POST',
        params: provider,
        body: { sub, name: nickname, email, picture },
      }
    );

    return res.status(200).json(oauth);
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

/**
 * @description
 */
const getSession = async (
  options: GetSessionParams
): Promise<Session | null> => {
  const session = await getSessionInner(options);

  // that these are equal are ensured in `[...nextauth]`'s callback
  return session as Session | null;
};

export { getSession, oauthApi };
export type { SignInResponse };
