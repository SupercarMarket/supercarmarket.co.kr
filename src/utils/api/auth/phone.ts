import type { NextApiHandler } from 'next';
import type { Params } from 'types/base';
import { catchNoExist, getErrorMessage } from 'utils/misc';

import { baseFetcher } from '../fetcher';

const requestPhoneAuthApi: NextApiHandler = async (req, res) => {
  const { phone } = req.query as Params;

  catchNoExist(phone);

  try {
    const authNumber = await baseFetcher(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/supercar/v1/message/auth/send/${phone}`,
      {
        method: 'GET',
      }
    );

    return res.status(200).json(authNumber);
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

const requestPhoneAuthWithNameApi: NextApiHandler = async (req, res) => {
  const { phone, name } = req.query as Params;

  catchNoExist();

  try {
    const authNumber = await baseFetcher(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/supercar/v1/message/auth/sendName/${phone}/${name}`,
      {
        method: 'GET',
      }
    );
    return res.status(200).json(authNumber);
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

const confirmPhoneAuthApi: NextApiHandler = async (req, res) => {
  const { phone, authorization } = req.query as Params;

  catchNoExist(phone, authorization);

  try {
    const authNumber = await baseFetcher(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/supercar/v1/message/auth/code/${phone}`,
      {
        method: 'GET',
        query: {
          code: authorization,
        },
      }
    );

    return res.status(200).json(authNumber);
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

const registerPhoneApi: NextApiHandler = async (req, res) => {
  const { phone, authentication, uuid } = req.body;

  catchNoExist(phone, authentication, uuid);

  try {
    const register = await baseFetcher(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/supercar/v1/user/register-phone`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone, code: authentication, token: uuid }),
      }
    );

    return res.status(200).json(register);
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export {
  confirmPhoneAuthApi,
  registerPhoneApi,
  requestPhoneAuthApi,
  requestPhoneAuthWithNameApi,
};
