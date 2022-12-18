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
  duplicateAuth: async (target: DuplicationList, data: string) => {
    catchNoExist(target, data);
    try {
      const signUp = await baseFetcher(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/supercar/v1/user/${target}chk`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify({ [target]: data }),
        }
      );
      return signUp;
    } catch (error) {
      return true;
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
  profile: async (req: NextApiRequest, res: NextApiResponse) => {
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
        `${process.env.NEXT_PUBLIC_SERVER_URL}/supercar/message/auth/sendName/${phone}`,
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
        `${process.env.NEXT_PUBLIC_SERVER_URL}/supercar/message/auth/sendName/${phone}/${name}`,
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
        `${process.env.NEXT_PUBLIC_SERVER_URL}/supercar/message/auth/sendName/${phone}`,
        {
          method: 'GET',
          query: {
            code: authorization,
          },
        }
      );
      return authNumber;
    } catch (error) {
      return true;
    }
  },
};

export { phone, token, user };
