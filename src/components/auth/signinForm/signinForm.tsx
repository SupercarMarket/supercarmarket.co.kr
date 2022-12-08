import Button from 'components/common/button';
import Container from 'components/common/container';
import Divider from 'components/common/divider';
import Typography from 'components/common/typography';
import Wrapper from 'components/common/wrapper';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { FormProvider, useForm } from 'react-hook-form';

import GoogleIcon from '../../../assets/svg/google.svg';
import KakaoIcon from '../../../assets/svg/kakao.svg';
import type { Forms } from '../authFormItem/authFormItem';
import AuthFormItem from '../authFormItem/authFormItem';
import * as style from './signinForm.styled';
import { Form } from './signinForm.styled';

const forms: Forms[] = [
  {
    variant: 'Default',
    htmlFor: 'id',
    label: '아이디',
    type: 'text',
    placeholder: '아이디를 입력해주세요',
    options: {
      required: true,
    },
    errorMessage: '사용 불가능한 아이디입니다',
    successMessage: '사용 가능한 아이디입니다',
  },
  {
    variant: 'Default',
    htmlFor: 'password',
    label: '비밀번호',
    type: 'password',
    placeholder: '비밀번호를 입력해주세요',
    options: {
      required: true,
    },
  },
];

const oauth = [
  { provider: 'kakao', title: '카카오', icon: <KakaoIcon /> },
  { provider: 'google', title: '구글', icon: <GoogleIcon /> },
];

interface FormState {
  id: string;
  password: string;
}

const Links = () => {
  return (
    <Container display="flex" alignItems="center" justifyContent="center">
      <Link
        href="/auth"
        style={{
          cursor: 'pointer',
        }}
      >
        아이디 찾기
      </Link>
      <Divider width="1px" height="10px" color="#C3C3C7" margin="0 10px" />
      <Link
        href="/auth"
        style={{
          cursor: 'pointer',
        }}
      >
        비밀번호 찾기
      </Link>
      <Divider width="1px" height="10px" color="#C3C3C7" margin="0 10px" />
      <Link
        href="/auth/signup"
        style={{
          cursor: 'pointer',
        }}
      >
        회원가입
      </Link>
    </Container>
  );
};

const LocalFormItem = () => {
  const methods = useForm<FormState>();

  const onSubmit = methods.handleSubmit((data) => {
    const { id, password } = data;
    signIn('credentials', { id, password, redirect: false });
  });
  return (
    <FormProvider {...methods}>
      <Form onSubmit={onSubmit}>
        <Wrapper css={style.wrapper}>
          {forms.map((form) => (
            <AuthFormItem key={form.htmlFor} {...form} />
          ))}
        </Wrapper>
        <Button type="submit" variant="Primary" fullWidth>
          로그인
        </Button>
        <Links />
      </Form>
    </FormProvider>
  );
};

const OauthFormItem = () => {
  return (
    <Container display="flex" flexDirection="column" gap="10px">
      {oauth.map((service) => (
        <Button
          key={service.provider}
          variant="Init"
          onClick={() => signIn(service.provider)}
        >
          <Wrapper
            css={service.provider === 'kakao' ? style.kakao : style.google}
          >
            {service.icon}
            <Typography
              as="span"
              fontSize="body-16"
              fontWeight="regular"
              lineHeight="150%"
              color="greyScale-6"
            >
              {service.title}로 시작하기
            </Typography>
          </Wrapper>
        </Button>
      ))}
    </Container>
  );
};

const SigninForm = () => {
  return (
    <Container
      width="340px"
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap="64px"
    >
      <LocalFormItem />
      <OauthFormItem />
    </Container>
  );
};

export default SigninForm;
