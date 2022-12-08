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
    </Wrapper>
  );
});

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

export default AuthFormItem;
