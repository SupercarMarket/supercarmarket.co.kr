import { setCookie } from 'cookies-next';
import { NextApiRequest, NextApiResponse } from 'next';
import type { DuplicationList, Signup } from 'types/auth';
import { Params } from 'types/base';
import { catchNoExist, getErrorMessage } from 'utils/misc';

import { baseFetcher } from './fetcher';

const token = {
  refreshToken: () => {
    return '';
  },
  isExpire: () => {
    return '';
  },
};

const user = {
  signUp: async (props: Signup) => {
    catchNoExist(props);
    try {
      const signUp = await baseFetcher(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/supercar/v1/user/signup`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify(props),
        }
      );
      return signUp;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },
  signIn: () => {
    return '';
  },
  withdrawal: () => {
    return '';
  },
  findId: () => {
    return '';
  },
  findPassword: () => {
    return '';
  },
  duplicateAuth: async (type: DuplicationList, target: string) => {
    catchNoExist(type, target);
    try {
      const signUp = await baseFetcher(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/supercar/v1/user/${type}chk`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify({ [type]: target }),
        }
      );
      return signUp;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },
  checkAlreadyMember: async (req: NextApiRequest, res: NextApiResponse) => {
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

      if (!profile)
        setCookie('newMember', data, {
          req,
          res,
          httpOnly: true,
          maxAge: 60 * 60,
        });

      return res.status(200).json(profile);
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },
  profile: async (req: NextApiRequest) => {
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
  },
};

const phone = {
  requestPhoneAuth: async (phone: string) => {
    try {
      const authNumber = await baseFetcher(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/supercar/v1/message/auth/send/${phone}`,
        {
          method: 'GET',
        }
      );
      return authNumber;
    } catch (error) {
      return true;
    }
  },
  requestPhoneAuthWithName: async (phone: string, name: string) => {
    try {
      const authNumber = await baseFetcher(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/supercar/v1/message/auth/sendName/${phone}/${name}`,
        {
          method: 'GET',
        }
      );
      return authNumber;
    } catch (error) {
      return true;
    }
  },
  confirmPhoneAuth: async (phone: string, authorization: string) => {
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
      return authNumber;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },
};

export { phone, token, user };
