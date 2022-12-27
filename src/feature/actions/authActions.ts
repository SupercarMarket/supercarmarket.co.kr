import type { DuplicationList, Signin, Signup } from 'types/auth';
import { baseFetcher } from 'utils/api/fetcher';

import createAsyncDispatcher from '.';

const signUp = createAsyncDispatcher<'SIGNUP_AUTH', [Signup]>(
  'SIGNUP_AUTH',
  (data) =>
    baseFetcher('/api/auth/user/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
);

const signIn = createAsyncDispatcher<'SIGNIN_AUTH', [Signin]>(
  'SIGNIN_AUTH',
  (data) =>
    baseFetcher('/api/auth/user/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
);

const requestPhoneAuth = createAsyncDispatcher<'REQUEST_PHONE_AUTH', [string]>(
  'REQUEST_PHONE_AUTH',
  (phone) =>
    baseFetcher('/api/auth/phone/request-auth', {
      method: 'GET',
      query: {
        phone,
      },
    })
);

const confirmPhoneAuth = createAsyncDispatcher<
  'CONFIRM_PHONE_AUTH',
  [string, string]
>('CONFIRM_PHONE_AUTH', (phone, authorization) =>
  baseFetcher('/api/auth/phone/confirm-auth', {
    method: 'GET',
    query: {
      phone,
      authorization,
    },
  })
);

const duplicateIdAuth = createAsyncDispatcher<
  'DUPLICATE_ID_AUTH',
  [DuplicationList, string]
>('DUPLICATE_ID_AUTH', (type: DuplicationList, target: string) =>
  baseFetcher('/api/auth/user/duplicate', {
    method: 'GET',
    query: {
      type,
      target,
    },
  })
);

const duplicateEmailAuth = createAsyncDispatcher<
  'DUPLICATE_EMAIL_AUTH',
  [DuplicationList, string]
>('DUPLICATE_EMAIL_AUTH', (type: DuplicationList, target: string) =>
  baseFetcher('/api/auth/user/duplicate', {
    method: 'GET',
    query: {
      type,
      target,
    },
  })
);

const duplicateNickanmeAuth = createAsyncDispatcher<
  'DUPLICATE_NICKNAME_AUTH',
  [DuplicationList, string]
>('DUPLICATE_NICKNAME_AUTH', (type: DuplicationList, target: string) =>
  baseFetcher('/api/auth/user/duplicate', {
    method: 'GET',
    query: {
      type,
      target,
    },
  })
);

export {
  confirmPhoneAuth,
  duplicateEmailAuth,
  duplicateIdAuth,
  duplicateNickanmeAuth,
  requestPhoneAuth,
  signIn,
  signUp,
};
