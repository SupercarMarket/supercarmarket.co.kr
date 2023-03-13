'use client';

import { Alert, Button, Divider, Form, FormLabel } from '@supercarmarket/ui';
import { catchNoExist } from '@supercarmarket/lib';
import auth from 'constants/auth';
import { signUp } from 'feature/actions/authActions';
import {
  AuthProvider,
  useAuthDispatch,
  useAuthState,
} from 'feature/authProvider';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { FormProvider } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import AuthFormItem from '../authFormItem/authFormItem';
import * as style from './signupForm.styled';

interface FormState {
  id: string;
  password: string;
  passwordConfirm: string;
  name: string;
  nickname: string;
  phone: string;
  authentication: string;
  email: string;
}

const SignupForm = () => {
  const { replace } = useRouter();
  const methods = useForm<FormState>();
  const state = useAuthState();
  const dispatch = useAuthDispatch();
  const { signup: signupResult } = state;

  const handleRequire = async (data: FormState) => {
    Object.entries(data).forEach(([key, value]) => {
      if (value) {
        return;
      }

      if (key === 'service' || key === 'privacy') {
        if (!value) {
          methods.setError(key as keyof FormState, {
            message: `${key}을/를 체크해주세요.`,
          });
          throw 'field is require';
        }
      }

      if (!value) {
        methods.setError(key as keyof FormState, {
          message: `${key}을/를 입력해주세요.`,
        });
        throw 'field is require';
      }
    });
  };

  const onSubmit = React.useCallback(
    (data: FormState) => {
      catchNoExist(
        state.authentication.data,
        state.email.data,
        state.id.data,
        state.nickname.data,
        state.phone.data
      );
      signUp(dispatch, data);
    },
    [
      dispatch,
      state.authentication.data,
      state.email.data,
      state.id.data,
      state.nickname.data,
      state.phone.data,
    ]
  );

  React.useEffect(() => {
    if (state.signup.data) return replace('/');
  }, [replace, state.signup.data]);

  return (
    <AuthProvider>
      <FormProvider {...methods}>
        <Form
          css={style.form}
          onSubmit={methods.handleSubmit((data) =>
            handleRequire(data).then(() => {
              onSubmit(data);
            })
          )}
        >
          {auth.signup().map((props) => (
            <AuthFormItem
              key={props.htmlFor}
              state={state}
              dispatch={dispatch}
              {...props}
            />
          ))}
          <Button width="340px" type="submit" variant="Primary">
            가입하기
          </Button>
        </Form>
        {signupResult.error && (
          <Alert title={signupResult.error.message} severity="error" />
        )}
      </FormProvider>
    </AuthProvider>
  );
};

export default SignupForm;
