import type { DuplicationList } from 'types/auth';
import { phone, user } from 'utils/api/auth';
import { baseFetcher } from 'utils/api/fetcher';

import createAsyncDispatcher from '.';

const requestPhoneAuth = createAsyncDispatcher<'REQUEST_PHONE_AUTH', [string]>(
  'REQUEST_PHONE_AUTH',
  phone.requestPhoneAuth
);

const confirmPhoneAuth = createAsyncDispatcher<
  'CONFIRM_PHONE_AUTH',
  [string, string]
>('CONFIRM_PHONE_AUTH', phone.confirmPhoneAuth);

const duplicateIdAuth = createAsyncDispatcher<
  'DUPLICATE_ID_AUTH',
  [DuplicationList, string]
>('DUPLICATE_ID_AUTH', user.duplicateAuth);

const duplicateEmailAuth = createAsyncDispatcher<
  'DUPLICATE_EMAIL_AUTH',
  [DuplicationList, string]
>('DUPLICATE_EMAIL_AUTH', (type: DuplicationList, target: string) =>
  baseFetcher('/api/user/duplicate', {
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
  baseFetcher('/api/user/duplicate', {
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
};
