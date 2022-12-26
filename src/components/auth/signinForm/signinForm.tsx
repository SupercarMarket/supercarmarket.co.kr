import Button from 'components/common/button';
import Container from 'components/common/container';
import Divider from 'components/common/divider';
<<<<<<< HEAD
import { Form, FormLabel } from 'components/common/form';
import Typography from 'components/common/typography';
import Wrapper from 'components/common/wrapper';
import auth from 'constants/auth';
import {
  AuthProvider,
  useAuthDispatch,
  useAuthState,
} from 'feature/authProvider';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { FormProvider, useForm } from 'react-hook-form';
import { catchNoExist } from 'utils/misc';

import GoogleIcon from '../../../assets/svg/google.svg';
import KakaoIcon from '../../../assets/svg/kakao.svg';
import AuthFormItem from '../authFormItem/authFormItem';
import * as style from './signinForm.styled';
=======
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
>>>>>>> 45c355dfdce16a4132d1d52bd9d7eabb4caf0864

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
        href="/auth/find?type=id"
        style={{
          cursor: 'pointer',
        }}
      >
        아이디 찾기
      </Link>
      <Divider width="1px" height="10px" color="#C3C3C7" margin="0 10px" />
      <Link
        href="/auth/find?type=password"
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
<<<<<<< HEAD
  const dispatch = useAuthDispatch();
  const state = useAuthState();

  const onSubmit = methods.handleSubmit((data) => {
    const { id, password } = data;
    catchNoExist(id, password);
    console.log(id, password);
    signIn('credentials', { id, password, redirect: false }).then((result) => {
      if (!result) return;
      const { error, ok, status } = result;
      console.log(error, ok, status);
    });
  });
  return (
    <AuthProvider>
      <FormProvider {...methods}>
        <Form css={style.form} onSubmit={onSubmit}>
          <Wrapper css={style.wrapper}>
            {auth.signin().map((form) => (
              <FormLabel
                key={form.htmlFor}
                name={form.htmlFor}
                label={form.label}
                hidden
              >
                <AuthFormItem state={state} dispatch={dispatch} {...form} />
              </FormLabel>
            ))}
          </Wrapper>
          <Button type="submit" variant="Primary" fullWidth>
            로그인
          </Button>
          <Links />
        </Form>
      </FormProvider>
    </AuthProvider>
=======

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
>>>>>>> 45c355dfdce16a4132d1d52bd9d7eabb4caf0864
  );
};

const OauthFormItem = () => {
  return (
    <Container display="flex" flexDirection="column" gap="10px">
      {oauth.map((service) => (
        <Button
          key={service.provider}
          variant="Init"
<<<<<<< HEAD
          onClick={() => signIn(service.provider, { redirect: false })}
=======
          onClick={() => signIn(service.provider)}
>>>>>>> 45c355dfdce16a4132d1d52bd9d7eabb4caf0864
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
<<<<<<< HEAD
      <AuthProvider>
        <LocalFormItem />
      </AuthProvider>
=======
      <LocalFormItem />
>>>>>>> 45c355dfdce16a4132d1d52bd9d7eabb4caf0864
      <OauthFormItem />
    </Container>
  );
};

export default SigninForm;
