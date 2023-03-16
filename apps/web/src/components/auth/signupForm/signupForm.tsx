'use client';

import { Alert, Button, Divider, Form, FormLabel } from '@supercarmarket/ui';
import { catchNoExist } from '@supercarmarket/lib';
import auth, { FormState } from 'constants/auth';
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
import ModalContext from 'feature/modalContext';
import TermModal from 'components/common/modal/termModal';

const SignupForm = () => {
  const { replace } = useRouter();
  const { onOpen, onClose } = React.useContext(ModalContext);
  const methods = useForm<FormState>();
  const state = useAuthState();
  const dispatch = useAuthDispatch();
  const { signup: signupResult } = state;

  const handleModal = React.useCallback(
    (htmlFor: keyof FormState) => {
      if (htmlFor === 'service')
        return onOpen(
          <TermModal
            title="이용약관"
            htmlFor={htmlFor}
            onClose={() => onClose()}
          />
        );
      return onOpen(
        <TermModal
          title="이용약관"
          htmlFor={htmlFor}
          onClose={() => onClose()}
        />
      );
    },
    [onClose, onOpen]
  );

  const handleRequire = async (data: FormState) => {
    Object.entries(data).forEach(([key, value]) => {
      if (value) {
        return;
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
            <>
              <FormLabel
                key={props.htmlFor}
                name={props.htmlFor}
                label={props.label}
                paddingTop={props.htmlFor}
              >
                <AuthFormItem
                  key={props.htmlFor}
                  state={state}
                  dispatch={dispatch}
                  handleModal={handleModal}
                  {...props}
                />
              </FormLabel>
              {props.htmlFor === 'email' && (
                <Divider width="100%" height="1px" color="#EAEAEC" />
              )}
            </>
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
