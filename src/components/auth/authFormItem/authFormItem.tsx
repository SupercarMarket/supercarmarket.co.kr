<<<<<<< HEAD
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
          code: string;
          phone: string;
        } | null;
        loading: boolean;
      };
  patternError?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
  target: string;
}

interface AuthFormPhoneItemContainerProps extends AuthFormItemContainerProps {
  phone?: {
    code: string;
    phone: string;
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
    formState: { errors },
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
          {...rest}
        />
      ) : (
        <AuthFormItemContainer
          register={register}
          target={target}
          htmlFor={htmlFor}
          authState={authState}
          patternError={patternError}
          {...rest}
        />
      )}
    </>
  );
};

const AuthFormItemContainer = React.memo(function AuthFormItem({
  htmlFor,
=======
import Button from 'components/common/button';
import Input from 'components/common/input';
import Typography from 'components/common/typography';
import Wrapper from 'components/common/wrapper';
import type {
  HTMLInputTypeAttribute,
  PropsWithChildren,
  ReactNode,
} from 'react';
import { memo, useCallback, useState } from 'react';
import type {
  FieldValues,
  RegisterOptions,
  UseFormRegister,
} from 'react-hook-form';
import { useFormContext, useWatch } from 'react-hook-form';
import type { DuplicationList } from 'types/auth';
import { user } from 'utils/api/auth';

import * as style from './authFormItem.styled';

export interface Forms {
  variant?: 'Default' | 'Label';
  htmlFor: keyof FormState;
  label?: string;
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  tooltip?: string;
  options?: RegisterOptions;
  button?: string;
  buttonWidth?: string;
  successMessage?: string;
  errorMessage?: string;
}

interface AuthFormItemProps extends Forms {
  register: UseFormRegister<FieldValues>;
  target: string;
  children?: ReactNode;
}

interface AuthFormWrapperProps extends PropsWithChildren {
  tooltip?: string;
  error?: string;
  success?: string;
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

const AuthFormItem = (props: Forms) => {
  const { htmlFor } = props;
  const { register } = useFormContext();
  const target = useWatch({ name: htmlFor });
  return (
    <AuthFormItemContainer register={register} target={target} {...props} />
  );
};

const AuthFormItemContainer = memo(function AuthFormItem({
  variant = 'Label',
  htmlFor,
  label,
>>>>>>> 45c355dfdce16a4132d1d52bd9d7eabb4caf0864
  button,
  placeholder,
  tooltip,
  type = 'text',
  options,
  buttonWidth,
  errorMessage,
  successMessage,
  target,
<<<<<<< HEAD
  authState,
  patternError,
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
=======
  register,
  children,
}: AuthFormItemProps) {
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleCallback = useCallback(async () => {
    if (!target) return;
    setError(false);
    setSuccess(false);
    const result = await user.checkDuplication(
      htmlFor as DuplicationList,
      target
    );
    if (!result) setSuccess(true);
    else setError(true);
  }, [htmlFor, target]);
  return (
    <Wrapper css={style.label}>
      <Typography
        as="label"
        htmlFor={htmlFor}
        fontSize="body-16"
        fontWeight="regular"
        color="greyScale-6"
        lineHeight="150%"
        style={{
          display: variant === 'Default' ? 'none' : 'block',
          paddingTop: '12px',
        }}
      >
        {label}
      </Typography>
      <AuthFormItemWrapper
        tooltip={tooltip}
        success={success ? successMessage : undefined}
        error={error ? errorMessage : undefined}
      >
        {success ? (
          <Input defaultValue={target} disabled={success} />
        ) : (
          <Input
            id={htmlFor}
            type={type}
            placeholder={placeholder}
            {...register(htmlFor, { ...options })}
          />
        )}
        {button && (
          <Button
            type="button"
            variant="Primary-Line"
            width={buttonWidth}
            onClick={handleCallback}
          >
            {button}
          </Button>
        )}
        {children}
      </AuthFormItemWrapper>
>>>>>>> 45c355dfdce16a4132d1d52bd9d7eabb4caf0864
    </Wrapper>
  );
});

<<<<<<< HEAD
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
=======
const AuthFormItemWrapper = ({
  tooltip,
  success,
  error,
  children,
}: AuthFormWrapperProps) => {
  return (
    <Wrapper css={style.wrapper}>
      <Wrapper.Item css={style.item}>{children}</Wrapper.Item>
      {tooltip && (
        <Typography
          as="span"
          fontSize="body-12"
          fontWeight="regular"
          color="greyScale-5"
          lineHeight="150%"
          style={{
            paddingLeft: '14px',
          }}
        >
          {tooltip}
        </Typography>
      )}
      {error && (
        <Typography
          as="span"
          fontSize="body-12"
          fontWeight="regular"
          color="system-1"
          lineHeight="150%"
          style={{
            paddingLeft: '14px',
          }}
        >
          {error}
        </Typography>
      )}
      {success && (
        <Typography
          as="span"
          fontSize="body-12"
          fontWeight="regular"
          color="primary"
          lineHeight="150%"
          style={{
            paddingLeft: '14px',
          }}
        >
          {success}
        </Typography>
      )}
    </Wrapper>
  );
};

>>>>>>> 45c355dfdce16a4132d1d52bd9d7eabb4caf0864
export default AuthFormItem;
