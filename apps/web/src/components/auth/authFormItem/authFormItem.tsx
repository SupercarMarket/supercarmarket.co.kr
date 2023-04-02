import {
  applyMediaQuery,
  FormAgreement,
  FormInput,
  FormMessage,
  Wrapper,
} from '@supercarmarket/ui';
import { useQueryClient } from '@tanstack/react-query';
import { type Form, type FormType } from 'constants/form';
import { type FormState } from 'constants/form/signup';
import {
  QUERY_KEYS,
  useDuplicateField,
  useSendCode,
  useSendPhone,
} from 'http/server/auth';
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

interface AuthFormItemProps
  extends Form<
    keyof FormState,
    Extract<FormType, 'text' | 'password' | 'tel' | 'email' | 'agreement'>
  > {
  defaultValue?: string | string[];
  handleModal?: (htmlFor: keyof FormState) => void;
}

interface AuthFormItemContainerProps extends Omit<AuthFormItemProps, 'state'> {
  register: UseFormRegister<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
  setError: UseFormSetError<FieldValues>;
  getValues: UseFormGetValues<FieldValues>;
  phone?: string;
  patternError?:
    | FieldError
    | Merge<FieldError, FieldErrorsImpl<any>>
    | Partial<{ type: string | number; message: string }>;
  target: string;
  isSubmitSuccessful: boolean;
}

const AuthFormItem = (props: AuthFormItemProps) => {
  const { htmlFor, handleModal, ...rest } = props;
  const {
    register,
    setValue,
    getValues,
    setError,
    formState: { errors, isSubmitSuccessful },
  } = useFormContext();
  const queryClient = useQueryClient();
  const patternError = errors[htmlFor];
  const target = useWatch({ name: htmlFor });
  const phone = queryClient.getQueryData<string>(QUERY_KEYS.phone());

  return (
    <AuthFormItemContainer
      register={register}
      setValue={setValue}
      setError={setError}
      getValues={getValues}
      handleModal={handleModal}
      target={target}
      htmlFor={htmlFor}
      phone={phone}
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
  type = 'text',
  options,
  buttonWidth,
  errorMessage,
  successMessage,
  target,
  patternError,
  isSubmitSuccessful,
  defaultValue,
  phone,
  readOnly,
  register,
  setValue,
  setError: setFieldError,
  getValues,
  handleModal,
}: AuthFormItemContainerProps) {
  const [error, setError] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const fieldErrorMessage = React.useMemo(() => {
    if (error) return errorMessage;
    else if (patternError) return patternError.message as string;
    else return undefined;
  }, [error, errorMessage, patternError]);
  const duplicateFieldMutation = useDuplicateField(htmlFor);
  const sendPhoneMutation = useSendPhone();
  const sendCodeMutation = useSendCode();

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

  const handleCallback = React.useCallback(async () => {
    setFieldError(htmlFor, { message: '' });
    setError(false);
    setSuccess(false);

    if (!target) return;
    if (validator[htmlFor](target) !== true) {
      setFieldError(htmlFor, { message: String(validator[htmlFor](target)) });
      return;
    }

    duplicateFieldMutation.mutate(target, {
      onSuccess: () => {
        setSuccess(true);
      },
      onError: () => {
        setError(true);
      },
    });
  }, [duplicateFieldMutation, htmlFor, setFieldError, target]);

  const handlePhoneAuth = React.useCallback(() => {
    setFieldError(htmlFor, { message: '' });
    setError(false);
    setSuccess(false);

    if (!target) return;
    if (validator[htmlFor](target) !== true) {
      setFieldError(htmlFor, { message: String(validator[htmlFor](target)) });
      return;
    }

    const _phone = getValues('phone');

    if (htmlFor === 'phone')
      sendPhoneMutation.mutate(_phone, {
        onSuccess: () => {
          setSuccess(true);
        },
        onError: () => {
          setError(true);
        },
      });
    else if (htmlFor === 'authentication' && !!phone)
      sendCodeMutation.mutate(
        { phone, code: target },
        {
          onSuccess: () => {
            setSuccess(true);
          },
          onError: () => {
            setError(true);
          },
        }
      );
  }, [
    target,
    htmlFor,
    phone,
    sendPhoneMutation,
    sendCodeMutation,
    getValues,
    setFieldError,
  ]);

  const buttonDisabled = () => {
    if (htmlFor === 'authentication') return !phone;
    return undefined;
  };

  React.useEffect(() => {
    if (isSubmitSuccessful) {
      setError(false);
      setSuccess(false);
    }
  }, [isSubmitSuccessful]);

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
              readOnly={readOnly}
              buttonVariant="Primary-Line"
              buttonCallback={handleCallback}
              disabled={readOnly ? true : undefined}
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
