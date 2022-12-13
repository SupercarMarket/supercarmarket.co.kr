import type { Action } from 'feature';
import type { AuthAction, AuthInitialState } from 'feature/authProvider';

import { createAsyncHandler } from '.';

const authHandler = createAsyncHandler<AuthAction, AuthInitialState>(
  'REQUEST_AUTH',
  'authorization'
);

export default function authReducer(
  state: AuthInitialState,
  action: Action<AuthAction>
) {
  switch (action.type) {
    case 'REQUEST_AUTH':
    case 'REQUEST_AUTH_SUCCESS':
    case 'REQUEST_AUTH_ERROR':
      return authHandler(state, action);
    case 'CONFIRM_AUTH':
    case 'CONFIRM_AUTH_SUCCESS':
    case 'CONFIRM_AUTH_ERROR':
      return authHandler(state, action);
    default:
      throw new Error(`Unhanded action type`);
  }
}
