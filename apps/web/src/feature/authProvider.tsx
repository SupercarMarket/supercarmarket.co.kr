import { Dispatch } from 'feature';
import { createContext, useContext, useReducer } from 'react';
import { User } from 'types/base';
import { BaseApiHandlerResponse } from 'utils/api/fetcher';

import authReducer from './reducers/authReducer';

type AuthAction =
  | 'SIGNUP_AUTH'
  | 'SIGNIN_AUTH'
  | 'UPDATE_AUTH'
  | 'REQUEST_PHONE_AUTH'
  | 'CONFIRM_PHONE_AUTH'
  | 'DUPLICATE_ID_AUTH'
  | 'DUPLICATE_EMAIL_AUTH'
  | 'DUPLICATE_NICKNAME_AUTH'
  | 'FIND_ID_AUTH'
  | 'FIND_PASSWORD_AUTH'
  | 'RESET_PASSWORD_AUTH'
  | 'RESET_FIELD_AUTH';
type AuthDispatch = Dispatch<AuthAction>;
interface AuthProviderProps {
  children: React.ReactNode;
}

interface AuthInitialState {
  authentication: {
    error: null | Error;
    data: null | boolean;
    loading: boolean;
  };
  phone: {
    error: null | Error;
    data: {
      data: {
        phone: string;
        code: string;
      };
    } | null;
    loading: boolean;
  };
  id: {
    error: null | Error;
    data: null | boolean;
    loading: boolean;
  };
  email: {
    error: null | Error;
    data: null | boolean;
    loading: boolean;
  };
  nickname: {
    error: null | Error;
    data: null | boolean;
    loading: boolean;
  };
  signup: {
    error: null | Error;
    data: null | boolean;
    loading: boolean;
  };
  signin: {
    error: null | Error;
    data: null | boolean;
    loading: boolean;
  };
  update: {
    error: null | Error;
    data: null | boolean;
    loading: boolean;
  };
  findId: {
    error: null | Error;
    data: null | BaseApiHandlerResponse<{ data: User }>;
    loading: boolean;
  };
  findPassword: {
    error: null | Error;
    data: null | BaseApiHandlerResponse<{
      phone: string;
      authentication: string;
      id: string;
    }>;
    loading: boolean;
  };
  resetPassword: {
    error: null | Error;
    data: null | BaseApiHandlerResponse<{ data: boolean }>;
    loading: boolean;
  };
}

const initialState: AuthInitialState = {
  authentication: {
    error: null,
    data: null,
    loading: false,
  },
  phone: {
    error: null,
    data: null,
    loading: false,
  },
  id: {
    error: null,
    data: null,
    loading: false,
  },
  email: {
    error: null,
    data: null,
    loading: false,
  },
  nickname: {
    error: null,
    data: null,
    loading: false,
  },
  signup: {
    error: null,
    data: null,
    loading: false,
  },
  signin: {
    error: null,
    data: null,
    loading: false,
  },
  update: {
    error: null,
    data: null,
    loading: false,
  },
  findId: {
    error: null,
    data: null,
    loading: false,
  },
  findPassword: {
    error: null,
    data: null,
    loading: false,
  },
  resetPassword: {
    error: null,
    data: null,
    loading: false,
  },
};

const AuthStateContext = createContext<AuthInitialState | null>(null);
const AuthDispatchContext = createContext<AuthDispatch | null>(null);

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  return (
    <AuthStateContext.Provider value={state}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
};

export function useAuthState() {
  const state = useContext(AuthStateContext);
  if (!state) {
    throw new Error('Cannot find Provider');
  }
  return state;
}

export function useAuthDispatch() {
  const dispatch = useContext(AuthDispatchContext);
  if (!dispatch) {
    throw new Error('Cannot find Provider');
  }
  return dispatch;
}

export type { AuthAction, AuthDispatch, AuthInitialState };
export { AuthProvider, initialState };
