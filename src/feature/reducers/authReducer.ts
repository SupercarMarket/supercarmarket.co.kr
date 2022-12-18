import type { Action } from 'feature';
import type { AuthAction, AuthInitialState } from 'feature/authProvider';

import { createAsyncHandler } from '.';

const requestPhoneAuthHandler = createAsyncHandler<
  AuthAction,
  AuthInitialState
>('REQUEST_PHONE_AUTH', 'authorization');

const confirmPhoneAuthHandler = createAsyncHandler<
  AuthAction,
  AuthInitialState
>('CONFIRM_PHONE_AUTH', 'authorization');

const duplicateAuthHandler = createAsyncHandler<AuthAction, AuthInitialState>(
  'DUPLICATE_AUTH',
  'authorization'
);

export default function authReducer(
  state: AuthInitialState,
  action: Action<AuthAction>
) {
  switch (action.type) {
    case 'REQUEST_PHONE_AUTH':
    case 'REQUEST_PHONE_AUTH_SUCCESS':
    case 'REQUEST_PHONE_AUTH_ERROR':
      return requestPhoneAuthHandler(state, action);
    case 'CONFIRM_PHONE_AUTH':
    case 'CONFIRM_PHONE_AUTH_SUCCESS':
    case 'CONFIRM_PHONE_AUTH_ERROR':
      return confirmPhoneAuthHandler(state, action);
    case 'DUPLICATE_AUTH':
    case 'DUPLICATE_AUTH_SUCCESS':
    case 'DUPLICATE_AUTH_ERROR':
      return duplicateAuthHandler(state, action);
    default:
      throw new Error(`Unhanded action type`);
  }
}
