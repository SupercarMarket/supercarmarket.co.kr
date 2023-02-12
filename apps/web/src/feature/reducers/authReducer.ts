import type { Action } from 'feature';
import {
  AuthAction,
  AuthInitialState,
  initialState,
} from 'feature/authProvider';

import { createAsyncHandler } from '.';

const signUpHandler = createAsyncHandler<AuthAction, AuthInitialState>(
  'SIGNUP_AUTH',
  'signup'
);

const signInHandler = createAsyncHandler<AuthAction, AuthInitialState>(
  'SIGNIN_AUTH',
  'signin'
);

const updateHandler = createAsyncHandler<AuthAction, AuthInitialState>(
  'UPDATE_AUTH',
  'update'
);

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

const findIdHandler = createAsyncHandler<AuthAction, AuthInitialState>(
  'FIND_ID_AUTH',
  'findId'
);

const findPasswordHandler = createAsyncHandler<AuthAction, AuthInitialState>(
  'FIND_PASSWORD_AUTH',
  'findPassword'
);

const resetPasswordHandler = createAsyncHandler<AuthAction, AuthInitialState>(
  'RESET_PASSWORD_AUTH',
  'resetPassword'
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
    case 'SIGNUP_AUTH':
    case 'SIGNUP_AUTH_SUCCESS':
    case 'SIGNUP_AUTH_ERROR':
      return signUpHandler(state, action);
    case 'SIGNIN_AUTH':
    case 'SIGNIN_AUTH_SUCCESS':
    case 'SIGNIN_AUTH_ERROR':
      return signInHandler(state, action);
    case 'UPDATE_AUTH':
    case 'UPDATE_AUTH_SUCCESS':
    case 'UPDATE_AUTH_ERROR':
      return updateHandler(state, action);
    case 'FIND_ID_AUTH':
    case 'FIND_ID_AUTH_SUCCESS':
    case 'FIND_ID_AUTH_ERROR':
      return findIdHandler(state, action);
    case 'FIND_PASSWORD_AUTH':
    case 'FIND_PASSWORD_AUTH_SUCCESS':
    case 'FIND_PASSWORD_AUTH_ERROR':
      return findPasswordHandler(state, action);
    case 'RESET_PASSWORD_AUTH':
    case 'RESET_PASSWORD_AUTH_SUCCESS':
    case 'RESET_PASSWORD_AUTH_ERROR':
      return resetPasswordHandler(state, action);
    case 'RESET_FIELD_AUTH':
      return initialState;
    default:
      throw new Error(`Unhanded action type`);
  }
}
