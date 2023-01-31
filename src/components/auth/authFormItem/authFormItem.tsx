import { FormInput, FormMessage } from 'components/common/form';
import Wrapper from 'components/common/wrapper';
import { Forms } from 'constants/auth';
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
  FieldError,
  FieldErrorsImpl,
  FieldValues,
  Merge,
  UseFormRegister,
} from 'react-hook-form';
import { useFormContext, useWatch } from 'react-hook-form';
import * as validator from 'utils/validator';

import * as style from './authFormItem.styled';

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
          data: {
            code: string;
            phone: string;
          };
        } | null;
        loading: boolean;
      };
  patternError?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
  target: string;
  isSubmitSuccessful: boolean;
}

interface AuthFormPhoneItemContainerProps extends AuthFormItemContainerProps {
  phone?: {
    data: {
      code: string;
      phone: string;
    };
  } | null;
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
  const {
    register,
    formState: { errors, isSubmitSuccessful },
  } = useFormContext();
  const patternError = errors[htmlFor];
  const target = useWatch({ name: htmlFor });
  return (
    <>
      {htmlFor === 'phone' || htmlFor === 'authentication' ? (
        <AuthFormPhoneItemContainer
          register={register}
          target={target}
          htmlFor={htmlFor}
          authState={authState}
          patternError={patternError}
          phone={state['phone'].data}
          isSubmitSuccessful={isSubmitSuccessful}
          {...rest}
        />
      ) : (
        <AuthFormItemContainer
          register={register}
          target={target}
          htmlFor={htmlFor}
          authState={authState}
          patternError={patternError}
          isSubmitSuccessful={isSubmitSuccessful}
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
  patternError,
  isSubmitSuccessful,
  register,
  dispatch,
}: AuthFormItemContainerProps) {
  const [error, setError] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const fieldErrorMessage = React.useMemo(() => {
    if (error) return errorMessage;
    else if (patternError) return patternError.message as string;
    else return undefined;
  }, [error, errorMessage, patternError]);

  const handleCallback = React.useCallback(() => {
    if (!target) return;
    if (validator[htmlFor](target) !== true) return;

    setError(false);
    setSuccess(false);

    if (htmlFor === 'id') duplicateIdAuth(dispatch, htmlFor, target);
    else if (htmlFor === 'email') duplicateEmailAuth(dispatch, htmlFor, target);
    else if (htmlFor === 'nickname')
      duplicateNickanmeAuth(dispatch, htmlFor, target);
  }, [dispatch, htmlFor, target]);

  React.useEffect(() => {
    if (isSubmitSuccessful) {
      setError(false);
      setSuccess(false);
    }
  }, [isSubmitSuccessful]);

  React.useEffect(() => {
    if (authState && authState.data) setSuccess(true);
    if (authState && authState.error) setError(true);
  }, [authState]);

  React.useEffect(() => {
    if (authState && !authState.data) setSuccess(false);
    if (authState && !authState.error) setError(false);
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
        buttonDisabled={success}
        placeholder={placeholder}
        readOnly={success}
        {...register(htmlFor, { ...options })}
      />
      <FormMessage
        tooltip={tooltip}
        success={success ? successMessage : undefined}
        error={fieldErrorMessage}
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
  patternError,
  phone,
  isSubmitSuccessful,
  register,
  dispatch,
}: AuthFormPhoneItemContainerProps) {
  const [error, setError] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const fieldErrorMessage = React.useMemo(() => {
    if (error) return errorMessage;
    else if (patternError) return patternError.message as string;
    else return undefined;
  }, [error, errorMessage, patternError]);

  const buttonDisabled = () => {
    if (success) return true;
    if (htmlFor === 'authentication') return !phone;
    return undefined;
  };
  const buttonVariant = htmlFor === 'authentication' ? !phone : !!phone;
  const count =
    htmlFor === 'authentication' && phone && !success ? 179 : undefined;
  const buttonText = htmlFor === 'phone' && phone ? '재시도' : button;

  const handleCallback = React.useCallback(() => {
    if (!target) return;
    if (validator[htmlFor](target) !== true) return;
    setError(false);
    setSuccess(false);
    if (htmlFor === 'phone') requestPhoneAuth(dispatch, target);
    else if (htmlFor === 'authentication' && !!phone)
      confirmPhoneAuth(dispatch, phone.data.phone, target);
  }, [dispatch, htmlFor, phone, target]);

  React.useEffect(() => {
    if (isSubmitSuccessful) {
      setError(false);
      setSuccess(false);
    }
  }, [isSubmitSuccessful]);

  React.useEffect(() => {
    if (authState && authState.data) setSuccess(true);
    if (authState && authState.error) setError(true);
  }, [authState]);

  React.useEffect(() => {
    if (authState && !authState.data) setSuccess(false);
    if (authState && !authState.error) setError(false);
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
        buttonDisabled={buttonDisabled()}
        placeholder={placeholder}
        readOnly={success}
        count={count}
        {...register(htmlFor, { ...options })}
      />
      <FormMessage
        tooltip={tooltip}
        success={success ? successMessage : undefined}
        error={fieldErrorMessage}
        padding="0 0 0 14px"
      />
    </Wrapper>
  );
});

export default AuthFormItem;
