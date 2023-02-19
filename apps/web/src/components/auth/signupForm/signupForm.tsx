'use client';

import { Alert, Button, Form, FormLabel } from '@supercarmarket/ui';
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
        <Form css={style.form} onSubmit={methods.handleSubmit(onSubmit)}>
          {auth.signup().map((props) => (
            <FormLabel
              key={props.htmlFor}
              name={props.htmlFor}
              label={props.label}
            >
              <AuthFormItem state={state} dispatch={dispatch} {...props} />
            </FormLabel>
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
