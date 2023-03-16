import { Wrapper, FormInput, FormLabel, FormMessage } from '@supercarmarket/ui';
import { clientApi, clientFetcher } from '@supercarmarket/lib';
import type { Forms } from 'constants/account';
import {
  confirmPhoneAuth,
  duplicateEmailAuth,
  duplicateNickanmeAuth,
  requestPhoneAuth,
} from 'feature/actions/authActions';
import { AuthDispatch, AuthInitialState } from 'feature/authProvider';
import type { Session } from 'next-auth';
import * as React from 'react';
import {
  FieldError,
  FieldErrorsImpl,
  FieldValues,
  Merge,
  UseFormRegister,
} from 'react-hook-form';
import { useFormContext, useWatch } from 'react-hook-form';
import { css } from 'styled-components';

type InputBtnAttr = {
  button?: boolean;
  buttonWidth?: React.CSSProperties['width'];
  count?: number;
  buttonText?: string;
  buttonVariant?: 'Primary-Line' | 'Line';
  buttonDisabled?: boolean;
  buttonCallback?: () => void;
};

interface AccountFormItemProps extends Forms {
  defaultValue?: string | string[];
  state: AuthInitialState;
  session: Session | null;
  dispatch: AuthDispatch;
}

interface AccountFormItemContainerProps extends AccountFormItemProps {
  regsiter: UseFormRegister<FieldValues>;
  patternError?:
    | FieldError
    | Merge<FieldError, FieldErrorsImpl<any>>
    | Partial<{ type: string | number; message: string }>;
  target: string;
  isSubmitSuccessful: boolean;
  infoState?:
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
}

const AccountFormItem = (props: AccountFormItemProps) => {
  const { htmlFor, state } = props;
  const infoState = React.useMemo(() => {
    if (htmlFor !== 'name' && htmlFor !== 'description') return state[htmlFor];
  }, [state, htmlFor]);
  const {
    register,
    setValue,
    formState: { errors, isSubmitSuccessful },
  } = useFormContext();
  const target = useWatch({ name: props.htmlFor });
  const patternError = errors[props.htmlFor];

  React.useEffect(() => {
    if (props.defaultValue) {
      setValue(htmlFor, props.defaultValue);
    }
  }, []);

  return (
    <AccountFormItemContainer
      patternError={patternError}
      target={target}
      isSubmitSuccessful={isSubmitSuccessful}
      infoState={infoState}
      phone={state['phone'].data}
      regsiter={register}
      {...props}
    />
  );
};

const AccountFormItemContainer = React.memo(function AccountFormItemContainer({
  htmlFor,
  label,
  type,
  placeholder,
  button,
  buttonWidth,
  tooltip,
  errorMessage,
  successMessage,
  options,
  patternError,
  target,
  isSubmitSuccessful,
  infoState,
  phone,
  session,
  dispatch,
  regsiter,
}: AccountFormItemContainerProps) {
  const [error, setError] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  const attr = { id: htmlFor, type, placeholder };
  const inputBtnAttr: InputBtnAttr = {
    button: !!button,
    buttonText: button,
    buttonWidth: buttonWidth,
    buttonVariant: 'Primary-Line',
    buttonDisabled: success,
  };
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

  const fieldErrorMessage = React.useMemo(() => {
    if (error) return errorMessage;
    else if (patternError) return patternError.message as string;
    else return undefined;
  }, [error, errorMessage, patternError]);

  const phoneButtonDisabled = () => {
    if (success) return true;
    if (htmlFor === 'authentication') return !phone;
    return undefined;
  };

  const handleGalleryUpload = async (files: FileList) => {
    if (!session) return;

    const formData = new FormData();

    Array.from(files).forEach((file) => {
      formData.append('gallery', file);
    });

    const response = await clientFetcher('/server/supercar/v1/user/gallery', {
      method: 'POST',
      headers: {
        ACCESS_TOKEN: session.accessToken,
      },
      body: formData,
    });

    return response;
  };

  const handleBackgroundUpload = async (files: FileList) => {
    if (!session) return;

    const formData = new FormData();

    Array.from(files).forEach((file) => {
      formData.append('background', file);
    });

    const response = await clientFetcher(
      '/server/supercar/v1/user/background',
      {
        method: 'POST',
        headers: {
          ACCESS_TOKEN: session.accessToken,
        },
        body: formData,
      }
    );

    return response;
  };

  const handleBackgroundRemove = async (url: string) => {
    if (!session) return;

    const response = await clientApi('/server/supercar/v1/user/background', {
      method: 'DELETE',
      headers: {
        ACCESS_TOKEN: session.accessToken,
        'Content-Type': 'application/json',
      },
      data: { url },
    });

    return response;
  };

  const handleGalleryRemove = async (url: string) => {
    if (!session) return;

    const response = await clientApi('/server/supercar/v1/user/gallery', {
      method: 'DELETE',
      headers: {
        ACCESS_TOKEN: session.accessToken,
        'Content-Type': 'application/json',
      },
      data: { url },
    });

    return response;
  };

  const handlePhoneAuth = () => {
    if (!target) return;

    setError(false);
    setSuccess(false);

    if (htmlFor === 'phone') requestPhoneAuth(dispatch, target);
    else if (htmlFor === 'authentication' && !!phone)
      confirmPhoneAuth(dispatch, phone.data.phone, target);
  };

  const handleEmailAuth = () => {
    if (!target) return;

    setError(false);
    setSuccess(false);

    if (htmlFor === 'email') duplicateEmailAuth(dispatch, htmlFor, target);
  };

  const handleNicknameAuth = () => {
    if (!target) return;

    setError(false);
    setSuccess(false);

    if (htmlFor === 'nickname')
      duplicateNickanmeAuth(dispatch, htmlFor, target);
  };

  React.useEffect(() => {
    if (isSubmitSuccessful) {
      setError(false);
      setSuccess(false);
    }
  }, [isSubmitSuccessful]);

  React.useEffect(() => {
    if (infoState && infoState.data) setSuccess(true);
    if (infoState && infoState.error) setError(true);
  }, [infoState]);

  React.useEffect(() => {
    if (infoState && !infoState.data) setSuccess(false);
    if (infoState && !infoState.error) setError(false);
  }, [infoState]);

  return (
    <FormLabel name={htmlFor} label={label}>
      <Wrapper
        css={css`
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 6px;
        `}
      >
        {
          {
            text: (
              <FormInput
                {...attr}
                {...inputBtnAttr}
                {...regsiter(htmlFor, options)}
                buttonCallback={handleNicknameAuth}
                readOnly={success}
              />
            ),
            tel: (
              <FormInput
                {...attr}
                {...phoneBtnAttr}
                {...regsiter(htmlFor, options)}
                buttonCallback={handlePhoneAuth}
                buttonDisabled={phoneButtonDisabled()}
                readOnly={success}
              />
            ),
            email: (
              <FormInput
                {...attr}
                {...inputBtnAttr}
                {...regsiter(htmlFor, options)}
                buttonCallback={handleEmailAuth}
                readOnly={success}
              />
            ),
            password: <FormInput {...attr} {...regsiter(htmlFor, options)} />,
          }[type]
        }
        <FormMessage
          tooltip={tooltip}
          success={success ? successMessage : undefined}
          error={fieldErrorMessage}
          padding="0 0 0 14px"
        />
      </Wrapper>
    </FormLabel>
  );
});

export default AccountFormItem;
