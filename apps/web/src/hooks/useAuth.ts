import { clientApi } from '@supercarmarket/lib';
import { Signup } from '@supercarmarket/types/auth';
import { User } from '@supercarmarket/types/base';
import { FormState } from 'constants/account';
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
      return await clientApi(`/server/supercar/v1/user/${field}chk`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          [`${field}`]: value,
        }),
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
    return await clientApi(`/server/supercar/v1/message/auth/send/${phone}`, {
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
    return await clientApi(`/server/supercar/v1/message/auth/code/${phone}`, {
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

      return await clientApi(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/supercar/v1/user/change-pw`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          data: { id, password, phone, code: authentication },
        }
      )
        .then((res) => {
          const { data } = res;

          setAuthState((prev) => ({
            ...prev,
            resetPasswordResult: successField(data),
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

      return await clientApi(`/server/supercar/v1/user/find-id`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        data: { phone, name, code: authentication },
      })
        .then((res) => {
          const { data } = res;

          setAuthState((prev) => ({
            ...prev,
            findIdResult: successField(data),
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
      data: Omit<FormState, 'gallery' | 'background' | 'newPassword'> & {
        code: string;
      },
      token: string
    ) => {
      return await clientApi(`/server/supercar/v1/mypage`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          ACCESS_TOKEN: token,
        },
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

    return await clientApi('/server/supercar/v1/user/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        id,
        password,
        passwordCheck: passwordConfirm,
        name,
        nickname,
        email,
        phone,
        code: authentication,
      },
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
