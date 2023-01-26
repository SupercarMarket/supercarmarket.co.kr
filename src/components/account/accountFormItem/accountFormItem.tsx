import { FormInput, FormLabel, FormMessage } from 'components/common/form';
import FormImages from 'components/common/form/formImages';
import Wrapper from 'components/common/wrapper';
import type { Forms } from 'constants/account';
import {
  confirmPhoneAuth,
  duplicateEmailAuth,
  duplicateNickanmeAuth,
  requestPhoneAuth,
} from 'feature/actions/authActions';
import { AuthDispatch, AuthInitialState } from 'feature/authProvider';
import * as React from 'react';
import {
  Control,
  Controller,
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
  state: AuthInitialState;
  dispatch: AuthDispatch;
}

interface AccountFormItemContainerProps extends AccountFormItemProps {
  regsiter: UseFormRegister<FieldValues>;
  control: Control<FieldValues, any>;
  patternError?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
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
          code: string;
          phone: string;
        } | null;
        loading: boolean;
      };
  phone?: {
    code: string;
    phone: string;
  } | null;
}

const AccountFormItem = (props: AccountFormItemProps) => {
  const { htmlFor, state } = props;
  const infoState = React.useMemo(() => {
    if (
      htmlFor !== 'password' &&
      htmlFor !== 'newPassword' &&
      htmlFor !== 'newPasswordConfirm' &&
      htmlFor !== 'name' &&
      htmlFor !== 'description' &&
      htmlFor !== 'gallery' &&
      htmlFor !== 'background'
    )
      return state[htmlFor];
  }, [state, htmlFor]);
  const {
    register,
    control,
    formState: { errors, isSubmitSuccessful },
  } = useFormContext();
  const target = useWatch({ name: props.htmlFor });
  const patternError = errors[props.htmlFor];

  return (
    <AccountFormItemContainer
      control={control}
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
  control,
  patternError,
  target,
  isSubmitSuccessful,
  infoState,
  phone,
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
    buttonCallback: () => console.log('callback'),
    buttonDisabled: false,
  };

  const fieldErrorMessage = React.useMemo(() => {
    if (error) return errorMessage;
    else if (patternError) return patternError.message as string;
    else return undefined;
  }, [error, errorMessage, patternError]);

  const handlePhoneAuth = () => {
    if (!target) return;

    setError(false);
    setSuccess(false);

    if (htmlFor === 'phone') requestPhoneAuth(dispatch, target);
    else if (htmlFor === 'authentication' && !!phone)
      confirmPhoneAuth(dispatch, '01062579881', target);
  };

  const handleEmailAuth = () => {
    if (!target) return;

    setError(false);
    setSuccess(false);

    if (htmlFor === 'email') duplicateEmailAuth(dispatch, htmlFor, target);
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
              />
            ),
            tel: (
              <FormInput
                {...attr}
                {...inputBtnAttr}
                {...regsiter(htmlFor, options)}
                buttonCallback={handlePhoneAuth}
              />
            ),
            email: (
              <FormInput
                {...attr}
                {...inputBtnAttr}
                {...regsiter(htmlFor, options)}
              />
            ),
            password: <FormInput {...attr} {...regsiter(htmlFor, options)} />,
            images: (
              <Controller
                control={control}
                name={htmlFor}
                render={({ field: { onChange } }) => (
                  <FormImages
                    size={3}
                    {...attr}
                    callback={(files) => onChange(files)}
                  />
                )}
              />
            ),
            image: (
              <Controller
                control={control}
                name={htmlFor}
                render={({ field: { onChange } }) => (
                  <FormImages
                    size={1}
                    {...attr}
                    callback={(files) => onChange(files)}
                  />
                )}
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
    </FormLabel>
  );
});

export default AccountFormItem;
