import type { NextApiHandler } from 'next';
import type { Session } from 'next-auth';
import type { GetSessionParams } from 'next-auth/react';
import { getSession as getSessionInner } from 'next-auth/react';
import type { Signin } from '@supercarmarket/types/auth';
import type { Params, ServerResponse } from '@supercarmarket/types/base';
import { catchNoExist, getErrorMessage } from 'utils/misc';

import { baseApi, baseFetcher } from '../fetcher';

type SignInResponse = ServerResponse<{
  access_token: string;
  refresh_token: string;
  exp: number;
}>;

const signInApi: NextApiHandler = async (req, res) => {
  const { id, password }: Signin = req.body;
  catchNoExist(id, password);

  const { status, ok, data } = await baseApi<SignInResponse>(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/supercar/v1/user/login`,
    {
      method: 'POST',
      data: {
        id,
        password,
      },
    }
  );

  if (!ok) return res.status(status).end();

  return res.status(200).json(data);
};

const oauthApi: NextApiHandler = async (req, res) => {
  const { provider } = req.query as Params;
  const { sub, nickname, email, picture } = req.body;

  catchNoExist(provider, sub, nickname, email, picture);

  try {
    const oauth = await baseFetcher(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/supercar/v1/user/login`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        params: provider,
        body: JSON.stringify({ sub, name: nickname, email, picture }),
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

export { getSession, oauthApi, signInApi };
export type { SignInResponse };
