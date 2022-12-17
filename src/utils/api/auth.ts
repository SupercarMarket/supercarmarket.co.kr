import type { DuplicationList, Signup } from 'types/auth';
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
  checkDuplication: async (target: DuplicationList, data: string) => {
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
};

const phone = {
  requestAuthNumber: async (phone: string) => {
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
  requestAuthNumberWithName: async (phone: string, name: string) => {
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
};

export { phone, token, user };
