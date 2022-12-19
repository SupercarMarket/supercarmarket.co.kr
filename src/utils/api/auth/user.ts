import type { NextApiHandler } from 'next';
import type { Signin, Signup } from 'types/auth';
import type { Params } from 'types/base';
import { catchNoExist, getErrorMessage } from 'utils/misc';

import { baseFetcher } from '../fetcher';

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

  try {
    const signUp = await baseFetcher(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/supercar/v1/user/signup`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          id,
          password,
          passwordCheck: passwordConfirm,
          name,
          nickname,
          email,
          phone,
          code: authentication,
        }),
      }
    );

    return res.status(200).json(signUp);
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

const signInApi: NextApiHandler = async (req, res) => {
  const { id, password }: Signin = req.body;
  catchNoExist(id, password);

  try {
    const signIn = await baseFetcher(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/supercar/v1/user/signup`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          id,
          password,
        }),
      }
    );

    return res.status(200).json(signIn);
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

const duplicateApi: NextApiHandler = async (req, res) => {
  const { type, target } = req.query as Params;

  catchNoExist(type, target);

  try {
    const duplicate = await baseFetcher(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/supercar/v1/user/${type}chk`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({ [type]: target }),
      }
    );
    return res.status(200).json(duplicate);
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
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

const profile: NextApiHandler = async (req) => {
  const { provider, sub } = req.query as Params;

  catchNoExist(provider, sub);

  try {
    const profile = await baseFetcher(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/supercar/v1/user/${sub}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'GET',
      }
    );

    // if(!profile) setCookie();

    return profile;
  } catch (error) {
    return true;
  }
};

export { checkAlreadyMember, duplicateApi, profile, signInApi, signUpApi };
