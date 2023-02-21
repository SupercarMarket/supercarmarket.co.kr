import type { NextApiHandler } from 'next';
import type { Session } from 'next-auth';
import type { GetSessionParams } from 'next-auth/react';
import { getSession as getSessionInner } from 'next-auth/react';
import type { Signin, Signup } from '@supercarmarket/types/auth';
import type { Params, ServerResponse, User } from '@supercarmarket/types/base';
import { ErrorCode } from 'utils/error';
import { catchNoExist, getErrorMessage } from 'utils/misc';

import { baseApi, baseFetcher } from '../fetcher';

type SignInResponse = ServerResponse<{
  access_token: string;
  refresh_token: string;
  exp: number;
}>;

type BooleanResponse = ServerResponse<boolean>;

const signUpApi: NextApiHandler = async (req, res) => {
  const {
    id,
    password,
    passwordConfirm,
    name,
    nickname,
    email,
    phone,
    authentication,
  }: Signup = req.body;
  catchNoExist(
    id,
    password,
    passwordConfirm,
    name,
    nickname,
    email,
    phone,
    authentication
  );

  const { status, ok, data } = await baseApi<BooleanResponse>(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/supercar/v1/user/signup`,
    {
      method: 'POST',
      data: {
        id,
        password,
        passwordCheck: passwordConfirm,
        name,
        nickname,
        email,
        phone,
        code: authentication,
      },
    }
  );

  if (!ok) return res.status(status).json({ message: ErrorCode[status] });

  return res.status(200).json(data);
};

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

const duplicateApi: NextApiHandler = async (req, res) => {
  const { type, target } = req.query as Params;

  catchNoExist(type, target);

  const { status, ok, data } = await baseApi<BooleanResponse>(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/supercar/v1/user/${type}chk`,
    {
      method: 'POST',
      data: { [type]: target },
    }
  );

  if (!ok) return res.status(status).json({ message: ErrorCode[status] });

  return res.status(200).json(data);
};

const checkAlreadyMember: NextApiHandler = async (req, res) => {
  const { provider, sub } = req.query as Params;
  const { data } = req.body;
  catchNoExist(provider, sub);

  try {
    const profile = await baseFetcher(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/supercar/v1/user/${sub}`,
      {
        query: {
          provider,
        },
        method: 'GET',
      }
    );

    return res.status(200).json(profile);
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

const findIdApi: NextApiHandler = async (req, res) => {
  const { phone, name, authentication } = req.body;

  catchNoExist(phone, name, authentication);

  const { status, ok, data } = await baseApi<{ data: { user: User } }>(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/supercar/v1/user/find-id`,
    {
      method: 'POST',
      data: { phone, name, code: authentication },
    }
  );

  if (!ok) return res.status(status).json({ message: ErrorCode[`${status}`] });

  return res.status(200).json({ data });
};

const findPasswordApi: NextApiHandler = async (req, res) => {
  const { phone, id, authentication } = req.body;

  catchNoExist(phone, id, authentication);

  return res.status(200).json({ phone, id, authentication });
};

const resetPasswordApi: NextApiHandler = async (req, res) => {
  const { id, password, phone, authentication } = req.body;

  catchNoExist(id, password, phone, authentication);

  const { status, ok, data } = await baseApi<{ data: { success: boolean } }>(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/supercar/v1/user/change-pw`,
    {
      method: 'PATCH',
      data: { id, password, phone, code: authentication },
    }
  );

  if (!ok) return res.status(status).json({ message: ErrorCode[`${status}`] });

  return res.status(200).json({ data });
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

export {
  checkAlreadyMember,
  duplicateApi,
  findIdApi,
  findPasswordApi,
  getSession,
  oauthApi,
  resetPasswordApi,
  signInApi,
  signUpApi,
};
export type { SignInResponse };
