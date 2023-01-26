import type { DuplicationList, Signin, Signup } from 'types/auth';
import { baseApi, baseFetcher, clientApi } from 'utils/api/fetcher';

import createAsyncDispatcher from '.';

interface FindAuth {
  phone: string;
  authentication: string;
}

type FindId = FindAuth & { name: string };

type FindPassword = FindAuth & { id: string };

type ResetPassword = FindAuth & { password: string; id: string };

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

const findId = createAsyncDispatcher<'FIND_ID_AUTH', [FindId]>(
  'FIND_ID_AUTH',
  (data: FindId) => baseApi('/api/auth/user/find-id', { method: 'POST', data })
);

const findPassword = createAsyncDispatcher<
  'FIND_PASSWORD_AUTH',
  [FindPassword]
>('FIND_PASSWORD_AUTH', (data: FindPassword) =>
  baseApi('/api/auth/user/find-password', { method: 'POST', data })
);

const resetPassword = createAsyncDispatcher<
  'RESET_PASSWORD_AUTH',
  [ResetPassword]
>('RESET_PASSWORD_AUTH', (data: ResetPassword) =>
  baseApi('/api/auth/user/reset-password', { method: 'PATCH', data })
);

const update = createAsyncDispatcher<'UPDATE_AUTH', [Signup]>(
  'UPDATE_AUTH',
  (data: Signup) =>
    clientApi('/api/account/update', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data,
    })
);

export {
  confirmPhoneAuth,
  duplicateEmailAuth,
  duplicateIdAuth,
  duplicateNickanmeAuth,
  findId,
  findPassword,
  requestPhoneAuth,
  resetPassword,
  signIn,
  signUp,
  update,
};
