import { get, patch, post } from '@supercarmarket/lib';
import { ServerResponse } from '@supercarmarket/types/base';
import { authRequest } from 'http/core';
import { type Signup } from '@supercarmarket/types/auth';
import { type User } from '@supercarmarket/types/base';
import { FormState } from 'constants/form/updateInfo';
import * as React from 'react';

interface AuthStateField<T extends any = any> {
  success: T | null;
  error: string | null;
}

interface AuthState {
  id: AuthStateField<string>;
  email: AuthStateField<string>;
  nickname: AuthStateField<string>;
  phone: AuthStateField<string>;
  authentication: AuthStateField<string>;
  findIdResult: AuthStateField<User>;
  resetPasswordResult: AuthStateField<boolean>;
  update: AuthStateField<boolean>;
}

const initialField = {
  success: null,
  error: null,
};

export const initialState: AuthState = {
  id: {
    success: null,
    error: null,
  },
  email: {
    success: null,
    error: null,
  },
  nickname: {
    success: null,
    error: null,
  },
  phone: {
    success: null,
    error: null,
  },
  authentication: {
    success: null,
    error: null,
  },
  findIdResult: {
    success: null,
    error: null,
  },
  resetPasswordResult: {
    success: null,
    error: null,
  },
  update: {
    success: null,
    error: null,
  },
};

const successField = (value: string): AuthStateField => ({
  ...initialField,
  success: value,
});

const errorField = (message: string): AuthStateField => ({
  ...initialField,
  error: message,
});

export default function useAuth() {
  const [authState, setAuthState] = React.useState(initialState);

  const duplicate = React.useCallback(
    async (
      field: Omit<keyof AuthState, 'phone' | 'authentication'>,
      value: string
    ) => {
      return await post(`/server/supercar/v1/user/${field}chk`, {
        [`${field}`]: value,
      })
        .then(() => {
          setAuthState((prev) => ({
            ...prev,
            [`${field}`]: successField(value),
          }));
        })
        .catch((error) => {
          setAuthState((prev) => ({
            ...prev,
            [`${field}`]: errorField(error.message),
          }));
        });
    },
    []
  );

  const sendPhone = React.useCallback(async (phone: string) => {
    return await get(`/server/supercar/v1/message/auth/send/${phone}`, {
      method: 'GET',
    })
      .then(() => {
        setAuthState((prev) => ({
          ...prev,
          phone: successField(phone),
        }));
      })
      .catch((error) => {
        setAuthState((prev) => ({
          ...prev,
          phone: errorField(error.message),
        }));
      });
  }, []);

  const sendCode = React.useCallback(async (phone: string, code: string) => {
    return await get(`/server/supercar/v1/message/auth/code/${phone}`, {
      method: 'GET',
      query: {
        code,
      },
    })
      .then(() => {
        setAuthState((prev) => ({
          ...prev,
          authentication: successField(code),
        }));
      })
      .catch((error) => {
        setAuthState((prev) => ({
          ...prev,
          authentication: errorField(error.message),
        }));
      });
  }, []);

  const resetPassword = React.useCallback(
    async (data: {
      phone: string;
      authentication: string;
      id: string;
      password: string;
    }) => {
      const { phone, id, authentication, password } = data;

      return await patch<
        {
          phone: string;
          code: string;
          id: string;
          password: string;
        },
        ServerResponse<boolean>
      >(`/server/supercar/v1/user/change-pw`, {
        id,
        password,
        phone,
        code: authentication,
      })
        .then((res) => {
          const { data } = res;

          setAuthState((prev) => ({
            ...prev,
            resetPasswordResult: successField(data as unknown as string),
          }));
        })
        .catch((error) => {
          setAuthState((prev) => ({
            ...prev,
            resetPasswordResult: errorField(error.message),
          }));
        });
    },
    []
  );

  const findId = React.useCallback(
    async (data: { phone: string; authentication: string; name: string }) => {
      const { phone, name, authentication } = data;

      return await post<
        { phone: string; code: string; name: string },
        ServerResponse<boolean>
      >(`/server/supercar/v1/user/find-id`, {
        phone,
        name,
        code: authentication,
      })
        .then((res) => {
          const { data } = res;

          setAuthState((prev) => ({
            ...prev,
            findIdResult: successField(data as unknown as string),
          }));
        })
        .catch((error) => {
          setAuthState((prev) => ({
            ...prev,
            findIdResult: errorField(error.message),
          }));
        });
    },
    []
  );

  const findPassword = React.useCallback(async (id: string) => {
    setAuthState((prev) => ({
      ...prev,
      id: successField(id),
    }));
  }, []);

  const update = React.useCallback(
    async (
      data: FormState & {
        code: string;
      }
    ) => {
      return await authRequest(`/mypage`, {
        data,
      });
    },
    []
  );

  const signUp = React.useCallback(async (data: Signup) => {
    const {
      id,
      password,
      passwordConfirm,
      name,
      nickname,
      email,
      phone,
      authentication,
    } = data;

    return await post('/server/supercar/v1/user/signup', {
      id,
      password,
      passwordCheck: passwordConfirm,
      name,
      nickname,
      email,
      phone,
      code: authentication,
    });
  }, []);

  const resetField = React.useCallback(() => {
    setAuthState(initialState);
  }, []);

  return React.useMemo(
    () => ({
      authState,
      duplicate,
      sendPhone,
      sendCode,
      findId,
      findPassword,
      resetPassword,
      update,
      signUp,
      resetField,
    }),
    [
      authState,
      duplicate,
      sendPhone,
      sendCode,
      findId,
      findPassword,
      resetPassword,
      update,
      signUp,
      resetField,
    ]
  );
}

type UseAuth = ReturnType<typeof useAuth>;

export type { AuthState, AuthStateField, UseAuth };
