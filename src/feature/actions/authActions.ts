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

const duplicateAuth = createAsyncDispatcher<
  'DUPLICATE_AUTH',
  [DuplicationList, string]
>('DUPLICATE_AUTH', (type: DuplicationList, target: string) =>
  baseFetcher('/api/user/duplicate', {
    method: 'GET',
    query: {
      type,
      target,
    },
  })
);

export { confirmPhoneAuth, duplicateAuth, requestPhoneAuth };
