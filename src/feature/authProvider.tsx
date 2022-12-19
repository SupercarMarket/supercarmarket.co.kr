import { Dispatch } from 'feature';
import { createContext, useContext, useReducer } from 'react';

import authReducer from './reducers/authReducer';

type AuthAction = 'REQUEST_AUTH' | 'CONFIRM_AUTH';
type AuthDispatch = Dispatch<AuthAction>;
interface AuthProviderProps {
  children: React.ReactNode;
}

interface AuthInitialState {
  authorization: {
    error: boolean;
    data: null | number;
    loading: boolean;
  };
}

const initialState: AuthInitialState = {
  authorization: {
    error: false,
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

export type { AuthAction, AuthInitialState };
export { AuthProvider };
