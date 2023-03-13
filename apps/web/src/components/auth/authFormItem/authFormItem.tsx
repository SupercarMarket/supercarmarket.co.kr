import {
  applyMediaQuery,
  Divider,
  FormAgreement,
  FormInput,
  FormLabel,
  FormMessage,
  Wrapper,
} from '@supercarmarket/ui';
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
  state: AuthInitialState;
  dispatch: AuthDispatch;
}

interface AuthFormItemContainerProps extends Omit<AuthFormItemProps, 'state'> {
  register: UseFormRegister<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
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
  phone?: {
    data: {
      code: string;
      phone: string;
    };
  } | null;
  patternError?:
    | FieldError
    | Merge<FieldError, FieldErrorsImpl<any>>
    | Partial<{ type: string | number; message: string }>;
  target: string;
  isSubmitSuccessful: boolean;
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
    setValue,
    formState: { errors, isSubmitSuccessful },
  } = useFormContext();
  const patternError = errors[htmlFor];
  const target = useWatch({ name: htmlFor });
  return (
    <AuthFormItemContainer
      register={register}
      setValue={setValue}
      target={target}
      htmlFor={htmlFor}
      authState={authState}
      phone={state['phone'].data}
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
  label,
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
  setValue,
  dispatch,
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
    buttonText: htmlFor === 'phone' && phone ? '재시도' : button,
    buttonWidth: buttonWidth,
    buttonVariant: (htmlFor === 'authentication' ? !phone : !!phone)
      ? 'Line'
      : 'Primary-Line',
    buttonDisabled: false,
    count: htmlFor === 'authentication' && phone && !success ? 179 : undefined,
  };
  const count =
    htmlFor === 'authentication' && phone && !success ? 179 : undefined;

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

  const handlePhoneAuth = React.useCallback(() => {
    if (!target) return;
    if (validator[htmlFor](target) !== true) return;
    setError(false);
    setSuccess(false);
    if (htmlFor === 'phone') requestPhoneAuth(dispatch, target);
    else if (htmlFor === 'authentication' && !!phone)
      confirmPhoneAuth(dispatch, phone.data.phone, target);
  }, [dispatch, htmlFor, phone, target]);

  const buttonDisabled = () => {
    if (success) return true;
    if (htmlFor === 'authentication') return !phone;
    return undefined;
  };

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
    <>
      <FormLabel
        key={htmlFor}
        name={htmlFor}
        label={label}
        paddingTop={htmlFor}
      >
        <Wrapper
          css={css`
            width: 660px;
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
              ),
              email: (
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
              ),
              password: (
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
              ),
              tel: (
                <FormInput
                  {...attr}
                  {...phoneBtnAttr}
                  buttonCallback={handlePhoneAuth}
                  buttonDisabled={buttonDisabled()}
                  placeholder={placeholder}
                  readOnly={success}
                  count={count}
                  {...register(htmlFor, { ...options })}
                />
              ),
              agreement: (
                <FormAgreement
                  {...attr}
                  content={tooltip}
                  onChange={(e) => setValue(htmlFor, e.target.checked)}
                />
              ),
            }[type]
          }
          <FormMessage
            success={success ? successMessage : undefined}
            error={fieldErrorMessage}
            padding="0 0 0 14px"
          />
        </Wrapper>
      </FormLabel>
      {htmlFor === 'email' && (
        <Divider width="100%" height="1px" color="#EAEAEC" />
      )}
    </>
  );
});

export default AuthFormItem;
