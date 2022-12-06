import Button from 'components/common/button';
import Input from 'components/common/input';
import Typography from 'components/common/typography';
import Wrapper from 'components/common/wrapper';
import type {
  HTMLInputTypeAttribute,
  PropsWithChildren,
  ReactNode,
} from 'react';
import type { RegisterOptions, UseFormRegister } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import * as style from './signupForm.styled';
import { Form } from './signupForm.styled';

const forms: Forms[] = [
  {
    htmlFor: 'userId',
    label: '아이디',
    type: 'text',
    placeholder: '아이디를 입력해주세요',
    button: '중복 확인',
    buttonWidth: '140px',
    options: {
      required: true,
    },
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
    htmlFor: 'nickName',
    label: '닉네임',
    type: 'text',
    placeholder: '닉네임을 입력해주세요 (최대 10자)',
    tooltip: '2~10자 한글, 영문 대소문자를 사용할 수 있습니다',
    button: '중복 확인',
    buttonWidth: '140px',
    options: {
      required: true,
    },
  },
  {
    htmlFor: 'call',
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
}

interface FormItemProps extends Forms {
  regsiter: UseFormRegister<FormState>;
  children?: ReactNode;
}

interface FormWrapperProps extends PropsWithChildren {
  tooltip?: string;
  error?: string;
}

interface FormState {
  userId: string;
  password: string;
  passwordConfirm: string;
  name: string;
  nickName: string;
  call: string;
  authentication: string;
  email: string;
}

const FormItem = (props: FormItemProps) => {
  const {
    htmlFor,
    label,
    button,
    placeholder,
    tooltip,
    type = 'text',
    regsiter,
    options,
    buttonWidth,
    children,
  } = props;
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
      <FormWrapper tooltip={tooltip}>
        <Input
          id={htmlFor}
          type={type}
          placeholder={placeholder}
          {...regsiter(htmlFor, options)}
        />
        {button && (
          <Button type="button" variant="Primary-Line" width={buttonWidth}>
            {button}
          </Button>
        )}
        {children}
      </FormWrapper>
    </Wrapper>
  );
};

const FormWrapper = ({ tooltip, error, children }: FormWrapperProps) => {
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
    </Wrapper>
  );
};

const SignupForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormState>();

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <Form onSubmit={onSubmit}>
      {forms.map((props) => (
        <FormItem key={props.label} regsiter={register} {...props} />
      ))}
      <Button width="340px" type="submit" variant="Primary">
        가입하기
      </Button>
    </Form>
  );
};

export default SignupForm;
