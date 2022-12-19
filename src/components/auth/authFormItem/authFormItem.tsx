import { FormInput, FormMessage } from 'components/common/form';
import Wrapper from 'components/common/wrapper';
import {
  confirmPhoneAuth,
  duplicateEmailAuth,
  duplicateIdAuth,
  duplicateNickanmeAuth,
  requestPhoneAuth,
} from 'feature/actions/authActions';
import { AuthDispatch, AuthInitialState } from 'feature/authProvider';
import * as React from 'react';
import type {
  FieldValues,
  RegisterOptions,
  UseFormRegister,
} from 'react-hook-form';
import { useFormContext, useWatch } from 'react-hook-form';

import * as style from './authFormItem.styled';

export interface Forms {
  htmlFor: keyof FormState;
  label?: string;
  type?: React.HTMLInputTypeAttribute;
  placeholder?: string;
  tooltip?: string;
  options?: RegisterOptions;
  button?: string;
  buttonWidth?: string;
  successMessage?: string;
  errorMessage?: string;
}

interface AuthFormItemProps extends Forms {
  state: AuthInitialState;
  dispatch: AuthDispatch;
}

interface AuthFormItemContainerProps extends Omit<AuthFormItemProps, 'state'> {
  register: UseFormRegister<FieldValues>;
  authState?:
    | {
        error: null | Error;
        data: boolean | null;
        loading: boolean;
      }
    | {
        error: null | Error;
        data: {
          code: string;
          phone: string;
        } | null;
        loading: boolean;
      };
  target: string;
}

interface AuthFormPhoneItemContainerProps extends AuthFormItemContainerProps {
  phone?: {
    code: string;
    phone: string;
  } | null;
}

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

const AuthFormItem = (props: AuthFormItemProps) => {
  const { htmlFor, state, ...rest } = props;
  const authState = React.useMemo(() => {
    if (
      htmlFor !== 'password' &&
      htmlFor !== 'passwordConfirm' &&
      htmlFor !== 'name'
    )
      return state[htmlFor];
  }, [state, htmlFor]);
  const { register } = useFormContext();
  const target = useWatch({ name: htmlFor });
  return (
    <>
      {htmlFor === 'phone' || htmlFor === 'authentication' ? (
        <AuthFormPhoneItemContainer
          register={register}
          target={target}
          htmlFor={htmlFor}
          authState={authState}
          phone={state['phone'].data}
          {...rest}
        />
      ) : (
        <AuthFormItemContainer
          register={register}
          target={target}
          htmlFor={htmlFor}
          authState={authState}
          {...rest}
        />
      )}
    </>
  );
};

const AuthFormItemContainer = React.memo(function AuthFormItem({
  htmlFor,
  button,
  placeholder,
  tooltip,
  type = 'text',
  options,
  buttonWidth,
  errorMessage,
  successMessage,
  target,
  authState,
  register,
  dispatch,
}: AuthFormItemContainerProps) {
  const [error, setError] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  const handleCallback = React.useCallback(() => {
    if (!target) return;

    setError(false);
    setSuccess(false);

    if (htmlFor === 'id') duplicateIdAuth(dispatch, htmlFor, target);
    else if (htmlFor === 'email') duplicateEmailAuth(dispatch, htmlFor, target);
    else if (htmlFor === 'nickname')
      duplicateNickanmeAuth(dispatch, htmlFor, target);
  }, [dispatch, htmlFor, target]);

  React.useEffect(() => {
    if (authState && authState.data) setSuccess(true);
    if (authState && authState.error) setError(true);
  }, [authState]);
  return (
    <Wrapper css={style.label}>
      <FormInput
        id={htmlFor}
        type={type}
        button={!!button}
        buttonText={button}
        buttonWidth={buttonWidth}
        buttonVariant="Primary-Line"
        buttonCallback={handleCallback}
        placeholder={placeholder}
        readOnly={success}
        {...register(htmlFor, { ...options })}
      />
      <FormMessage
        tooltip={tooltip}
        success={success ? successMessage : undefined}
        error={error ? errorMessage : undefined}
        padding="0 0 0 14px"
      />
    </Wrapper>
  );
});

const AuthFormPhoneItemContainer = React.memo(function AuthFormItem({
  htmlFor,
  button,
  placeholder,
  tooltip,
  type = 'text',
  options,
  buttonWidth,
  errorMessage,
  successMessage,
  target,
  authState,
  phone,
  register,
  dispatch,
}: AuthFormPhoneItemContainerProps) {
  const [error, setError] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  const buttonDisabled = htmlFor === 'authentication' ? !phone : undefined;
  const buttonVariant = htmlFor === 'authentication' ? !phone : !!phone;
  const count =
    htmlFor === 'authentication' && phone && !success ? 179 : undefined;
  const buttonText = htmlFor === 'phone' && phone ? '재시도' : button;

  const handleCallback = React.useCallback(() => {
    if (!target) return;
    setError(false);
    setSuccess(false);
    if (htmlFor === 'phone') requestPhoneAuth(dispatch, target);
    else if (htmlFor === 'authentication' && !!phone)
      confirmPhoneAuth(dispatch, '01062579881', target);
  }, [dispatch, htmlFor, phone, target]);

  React.useEffect(() => {
    if (authState && authState.data) setSuccess(true);
    if (authState && authState.error) setError(true);
  }, [authState]);
  return (
    <Wrapper css={style.label}>
      <FormInput
        id={htmlFor}
        type={type}
        button={!!button}
        buttonText={buttonText}
        buttonWidth={buttonWidth}
        buttonVariant={buttonVariant ? 'Line' : 'Primary-Line'}
        buttonCallback={handleCallback}
        buttonDisabled={buttonDisabled}
        placeholder={placeholder}
        readOnly={success}
        count={count}
        {...register(htmlFor, { ...options })}
      />
      <FormMessage
        tooltip={tooltip}
        success={success ? successMessage : undefined}
        error={error ? errorMessage : undefined}
        padding="0 0 0 14px"
      />
    </Wrapper>
  );
});
export default AuthFormItem;
