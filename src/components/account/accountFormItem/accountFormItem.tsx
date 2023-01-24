import { FormInput, FormLabel, FormMessage } from 'components/common/form';
import FormImages from 'components/common/form/formImages';
import Wrapper from 'components/common/wrapper';
import type { Forms } from 'constants/account';
import * as React from 'react';
import type {
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

interface AccountFormItemContainerProps extends Forms {
  regsiter: UseFormRegister<FieldValues>;
  patternError?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
  target: string;
  isSubmitSuccessful: boolean;
}

const AccountFormItem = (props: Forms) => {
  const {
    register,
    formState: { errors, isSubmitSuccessful },
  } = useFormContext();
  const target = useWatch({ name: props.htmlFor });
  const patternError = errors[props.htmlFor];

  return (
    <AccountFormItemContainer
      patternError={patternError}
      target={target}
      isSubmitSuccessful={isSubmitSuccessful}
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

  const handleCallback = () => {
    console.log('callback');
  };

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
            images: <FormImages size={3} {...attr} />,
            image: <FormImages size={1} {...attr} />,
          }[type]
        }
        <FormMessage
          tooltip={tooltip}
          error={fieldErrorMessage}
          padding="0 0 0 14px"
        />
      </Wrapper>
    </FormLabel>
  );
});

export default AccountFormItem;
