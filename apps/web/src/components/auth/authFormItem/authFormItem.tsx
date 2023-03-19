import {
  applyMediaQuery,
  FormAgreement,
  FormInput,
  FormMessage,
  Wrapper,
} from '@supercarmarket/ui';
import { Forms, FormState } from 'constants/auth';
import type { AuthState, AuthStateField, UseAuth } from 'hooks/useAuth';
import * as React from 'react';
import type {
  FieldError,
  FieldErrorsImpl,
  FieldValues,
  Merge,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetError,
  UseFormSetValue,
} from 'react-hook-form';
import { useFormContext, useWatch } from 'react-hook-form';
import { css } from 'styled-components';
import * as validator from 'utils/validator';

type InputBtnAttr = {
  button?: boolean;
  buttonWidth?: React.CSSProperties['width'];
  count?: number;
  buttonText?: string;
  buttonVariant?: 'Primary-Line' | 'Line';
  buttonDisabled?: boolean;
  buttonCallback?: () => void;
};

interface AuthFormItemProps extends Forms {
  state: AuthState;
  defaultValue?: string | string[];
  duplicate?: UseAuth['duplicate'];
  sendPhone?: UseAuth['sendPhone'];
  sendCode?: UseAuth['sendCode'];
  handleModal?: (htmlFor: keyof FormState) => void;
}

interface AuthFormItemContainerProps extends Omit<AuthFormItemProps, 'state'> {
  register: UseFormRegister<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
  setError: UseFormSetError<FieldValues>;
  getValues: UseFormGetValues<FieldValues>;
  authState?: AuthStateField;
  sended: boolean;
  patternError?:
    | FieldError
    | Merge<FieldError, FieldErrorsImpl<any>>
    | Partial<{ type: string | number; message: string }>;
  target: string;
  isSubmitSuccessful: boolean;
}

const AuthFormItem = (props: AuthFormItemProps) => {
  const { htmlFor, state, handleModal, ...rest } = props;
  const authState = React.useMemo(() => {
    if (
      htmlFor !== 'password' &&
      htmlFor !== 'passwordConfirm' &&
      htmlFor !== 'name' &&
      htmlFor !== 'description' &&
      htmlFor !== 'service' &&
      htmlFor !== 'privacy'
    )
      return state[htmlFor];
  }, [state, htmlFor]);
  const {
    register,
    setValue,
    getValues,
    setError,
    formState: { errors, isSubmitSuccessful },
  } = useFormContext();
  const patternError = errors[htmlFor];
  const target = useWatch({ name: htmlFor });

  return (
    <AuthFormItemContainer
      register={register}
      setValue={setValue}
      setError={setError}
      getValues={getValues}
      handleModal={handleModal}
      target={target}
      htmlFor={htmlFor}
      authState={authState}
      sended={!!state['phone'].success}
      patternError={patternError}
      isSubmitSuccessful={isSubmitSuccessful}
      {...rest}
    />
  );
};

const AuthFormItemContainer = React.memo(function AuthFormItem({
  htmlFor,
  button,
  placeholder,
  tooltip,
  sended,
  type = 'text',
  options,
  buttonWidth,
  errorMessage,
  successMessage,
  target,
  authState,
  patternError,
  isSubmitSuccessful,
  defaultValue,
  register,
  setValue,
  setError: setFieldError,
  getValues,
  handleModal,
  sendPhone,
  duplicate,
  sendCode,
}: AuthFormItemContainerProps) {
  const [error, setError] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const fieldErrorMessage = React.useMemo(() => {
    if (error) return errorMessage;
    else if (patternError) return patternError.message as string;
    else return undefined;
  }, [error, errorMessage, patternError]);

  const attr = { id: htmlFor, type, placeholder };
  const phoneBtnAttr: InputBtnAttr = {
    button: !!button,
    buttonText: htmlFor === 'phone' && sended ? '재시도' : button,
    buttonWidth: buttonWidth,
    buttonVariant: (htmlFor === 'authentication' ? !sended : !!sended)
      ? 'Line'
      : 'Primary-Line',
    buttonDisabled: false,
    count: htmlFor === 'authentication' && sended && !success ? 179 : undefined,
  };
  const count =
    htmlFor === 'authentication' && sended && !success ? 179 : undefined;

  const handleCallback = React.useCallback(async () => {
    if (!target) return;
    if (validator[htmlFor](target) !== true) {
      setFieldError(htmlFor, { message: String(validator[htmlFor](target)) });
      return;
    }

    setError(false);
    setSuccess(false);

    if (duplicate)
      duplicate(htmlFor, target).then(() => {
        setFieldError(htmlFor, { message: '' });
        setSuccess(true);
      });
  }, [duplicate, htmlFor, setFieldError, target]);

  const handlePhoneAuth = React.useCallback(() => {
    if (!target) return;
    if (validator[htmlFor](target) !== true) {
      setFieldError(htmlFor, { message: String(validator[htmlFor](target)) });
      return;
    }

    setError(false);
    setSuccess(false);

    const phone = getValues('phone');

    if (htmlFor === 'phone' && sendPhone)
      sendPhone(phone).then(() => {
        setFieldError(htmlFor, { message: '' });
        setSuccess(true);
      });
    else if (htmlFor === 'authentication' && sendCode && !!phone)
      sendCode(phone, target).then(() => {
        setFieldError(htmlFor, { message: '' });
        setSuccess(true);
      });
  }, [target, htmlFor, sendPhone, getValues, sendCode, setFieldError]);

  const buttonDisabled = () => {
    if (htmlFor === 'authentication') return !sended;
    return undefined;
  };

  React.useEffect(() => {
    if (isSubmitSuccessful) {
      setError(false);
      setSuccess(false);
    }
  }, [isSubmitSuccessful]);

  React.useEffect(() => {
    if (authState && authState.success) setSuccess(true);
    if (authState && authState.error) setError(true);
  }, [authState]);

  React.useEffect(() => {
    if (authState && !authState.success) setSuccess(false);
    if (authState && !authState.error) setError(false);
  }, [authState]);

  return (
    <Wrapper
      css={css`
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: space-between;
        gap: 6px;
        ${applyMediaQuery('mobile')} {
          width: 100%;
        }
      `}
    >
      {
        {
          text: (
            <FormInput
              {...attr}
              defaultValue={defaultValue}
              button={!!button}
              buttonText={button}
              buttonWidth={buttonWidth}
              buttonVariant="Primary-Line"
              buttonCallback={handleCallback}
              {...register(htmlFor, { ...options })}
            />
          ),
          email: (
            <FormInput
              {...attr}
              defaultValue={defaultValue}
              button={!!button}
              buttonText={button}
              buttonWidth={buttonWidth}
              buttonVariant="Primary-Line"
              buttonCallback={handleCallback}
              {...register(htmlFor, { ...options })}
            />
          ),
          password: (
            <FormInput
              {...attr}
              button={!!button}
              buttonText={button}
              buttonWidth={buttonWidth}
              buttonVariant="Primary-Line"
              buttonCallback={handleCallback}
              buttonDisabled={success}
              readOnly={success}
              {...register(htmlFor, { ...options })}
            />
          ),
          tel: (
            <FormInput
              {...attr}
              {...phoneBtnAttr}
              defaultValue={defaultValue}
              buttonCallback={handlePhoneAuth}
              buttonDisabled={buttonDisabled()}
              count={count}
              {...register(htmlFor, { ...options })}
            />
          ),
          agreement: (
            <FormAgreement
              content={placeholder}
              name={htmlFor}
              onChange={(e) => setValue(htmlFor, e.target.checked)}
              handleCick={() => {
                if (handleModal) handleModal(htmlFor);
              }}
            />
          ),
        }[type]
      }
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
