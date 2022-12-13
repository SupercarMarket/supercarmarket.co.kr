import { Action } from 'feature';
import { AuthInitialState } from 'feature/authProvider';

import { createAsyncHandler } from '.';

const authHandler = createAsyncHandler<AuthInitialState>(
  'REQUEST_AUTH',
  'authorization'
);

export default function authReducer(state: AuthInitialState, action: Action) {
  switch (action.type) {
    case 'REQUEST_AUTH':
    case 'REQUEST_AUTH_SUCCESS':
    case 'REQUEST_AUTH_ERROR':
      return authHandler(state, action);
    default:
      throw new Error(`Unhanded action type: ${action.type}`);
  }
}
