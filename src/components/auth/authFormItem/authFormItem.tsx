import { FormInput, FormMessage } from 'components/common/form';
import Wrapper from 'components/common/wrapper';
import { requestAuthNumber } from 'feature/actions/authActions';
import { useAuthDispatch, useAuthState } from 'feature/authProvider';
import * as React from 'react';
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
  register: UseFormRegister<FieldValues>;
  handleAuthNumber?: (phone: string) => Promise<void>;
  target: string;
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
  const state = useAuthState();
  const { htmlFor } = props;
  const { register } = useFormContext();
  const disaptch = useAuthDispatch();
  const handleAuthNumber = (phone: string) =>
    requestAuthNumber(disaptch, phone);
  const target = useWatch({ name: htmlFor });
  return (
    <AuthFormItemContainer
      register={register}
      handleAuthNumber={htmlFor === 'phone' ? handleAuthNumber : undefined}
      target={target}
      {...props}
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
  register,
  handleAuthNumber,
}: AuthFormItemProps) {
  const [error, setError] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  const handleDuplicated = React.useCallback(async () => {
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

  const handleCallback = React.useMemo(() => {
    if (htmlFor === 'phone' && !!handleAuthNumber)
      return () => handleAuthNumber(target);
    return handleDuplicated;
  }, [handleAuthNumber, handleDuplicated, htmlFor, target]);
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

export default AuthFormItem;
