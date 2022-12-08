import Button from 'components/common/button';
import Input from 'components/common/input';
import Typography from 'components/common/typography';
import Wrapper from 'components/common/wrapper';
import {
  HTMLInputTypeAttribute,
  memo,
  PropsWithChildren,
  ReactNode,
} from 'react';
import { useCallback, useState } from 'react';
import { FormProvider, RegisterOptions, useFormContext } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { DuplicationList } from 'types/auth';
import { user } from 'utils/api/auth';

import * as style from './signupForm.styled';
import { Form } from './signupForm.styled';

const forms: Forms[] = [
  {
    htmlFor: 'id',
    label: '아이디',
    type: 'text',
    placeholder: '아이디를 입력해주세요',
    button: '중복 확인',
    buttonWidth: '140px',
    options: {
      required: true,
    },
    errorMessage: '사용 불가능한 아이디입니다',
    successMessage: '사용 가능한 아이디입니다',
  },
  {
    htmlFor: 'password',
    label: '비밀번호',
    type: 'password',
    placeholder: '비밀번호를 입력해주세요',
    tooltip: '영문/숫자/특수문자 중 2가지 이상, 8자 이상',
    options: {
      required: true,
    },
  },
  {
    htmlFor: 'passwordConfirm',
    label: '비밀번호 확인',
    type: 'password',
    placeholder: '비밀번호를 한번 더 입력해주세요',
    options: {
      required: true,
    },
  },
  {
    htmlFor: 'name',
    label: '이름',
    type: 'text',
    placeholder: '이름을 입력해주세요',
    options: {
      required: true,
    },
  },
  {
    htmlFor: 'nickname',
    label: '닉네임',
    type: 'text',
    placeholder: '닉네임을 입력해주세요 (최대 10자)',
    tooltip: '2~10자 한글, 영문 대소문자를 사용할 수 있습니다',
    button: '중복 확인',
    buttonWidth: '140px',
    options: {
      required: true,
    },
    errorMessage: '사용 불가능한 닉네임입니다',
    successMessage: '사용 가능한 닉네임입니다',
  },
  {
    htmlFor: 'phone',
    label: '휴대폰',
    type: 'text',
    placeholder: '숫자만 입력해주세요',
    button: '인증번호 받기',
    buttonWidth: '120px',
    options: {
      required: true,
    },
  },
  {
    htmlFor: 'authentication',
    label: '인증번호',
    type: 'text',
    placeholder: '인증번호를 입력해주세요',
    button: '인증번호 확인',
    buttonWidth: '120px',
    options: {
      required: true,
    },
  },
  {
    htmlFor: 'email',
    label: '이메일',
    type: 'email',
    placeholder: '이메일을 입력해주세요',
    button: '중복 확인',
    buttonWidth: '140px',
    options: {
      required: true,
    },
    errorMessage: '사용 불가능한 이메일입니다',
    successMessage: '사용 가능한 이메일입니다',
  },
];

interface Forms {
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

interface FormItemProps extends Forms {
  children?: ReactNode;
}

interface FormWrapperProps extends PropsWithChildren {
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

const FormItem = memo(function FormItem({
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
  children,
}: FormItemProps) {
  const { register, watch } = useFormContext();
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const target = watch(htmlFor);

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
          paddingTop: '12px',
        }}
      >
        {label}
      </Typography>
      <FormWrapper
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
      </FormWrapper>
    </Wrapper>
  );
});

const FormWrapper = ({
  tooltip,
  success,
  error,
  children,
}: FormWrapperProps) => {
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

const SignupForm = () => {
  const methods = useForm<FormState>();

  const onSubmit = methods.handleSubmit(async (data) => {
    await user.signUp(data);
  });

  return (
    <FormProvider {...methods}>
      <Form onSubmit={onSubmit}>
        {forms.map((props) => (
          <FormItem key={props.label} {...props} />
        ))}
        <Button width="340px" type="submit" variant="Primary">
          가입하기
        </Button>
      </Form>
    </FormProvider>
  );
};

export default SignupForm;
