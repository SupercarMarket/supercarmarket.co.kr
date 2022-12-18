import type { Action } from 'feature';
import type { AuthAction, AuthInitialState } from 'feature/authProvider';

import { createAsyncHandler } from '.';

const requestPhoneAuthHandler = createAsyncHandler<
  AuthAction,
  AuthInitialState
>('REQUEST_PHONE_AUTH', 'phone');

const confirmPhoneAuthHandler = createAsyncHandler<
  AuthAction,
  AuthInitialState
>('CONFIRM_PHONE_AUTH', 'authentication');

const duplicateIdAuthHandler = createAsyncHandler<AuthAction, AuthInitialState>(
  'DUPLICATE_ID_AUTH',
  'id'
);

const duplicateEmailAuthHandler = createAsyncHandler<
  AuthAction,
  AuthInitialState
>('DUPLICATE_EMAIL_AUTH', 'email');

const duplicateNicknameAuthHandler = createAsyncHandler<
  AuthAction,
  AuthInitialState
>('DUPLICATE_NICKNAME_AUTH', 'nickname');

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
    case 'DUPLICATE_ID_AUTH':
    case 'DUPLICATE_ID_AUTH_SUCCESS':
    case 'DUPLICATE_ID_AUTH_ERROR':
      return duplicateIdAuthHandler(state, action);
    case 'DUPLICATE_EMAIL_AUTH':
    case 'DUPLICATE_EMAIL_AUTH_SUCCESS':
    case 'DUPLICATE_EMAIL_AUTH_ERROR':
      return duplicateEmailAuthHandler(state, action);
    case 'DUPLICATE_NICKNAME_AUTH':
    case 'DUPLICATE_NICKNAME_AUTH_SUCCESS':
    case 'DUPLICATE_NICKNAME_AUTH_ERROR':
      return duplicateNicknameAuthHandler(state, action);
    default:
      throw new Error(`Unhanded action type`);
  }
}
