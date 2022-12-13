import { createContext, useReducer } from 'react';

import authReducer from './reducers/authReducer';

type Action = { type: 'REQUEST_AUTH' };
type Dispatch = (action: Action) => void;
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
const AuthDispatchContext = createContext<Dispatch | null>(null);

const AuthenticationProvider = ({ children }: AuthProviderProps) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  return (
    <AuthStateContext.Provider value={state}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
};

export type { AuthInitialState };
export { AuthenticationProvider };
