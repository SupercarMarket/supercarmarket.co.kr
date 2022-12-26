import Button from 'components/common/button';
import Container from 'components/common/container';
import Divider from 'components/common/divider';
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
  );
};

const OauthFormItem = () => {
  return (
    <Container display="flex" flexDirection="column" gap="10px">
      {oauth.map((service) => (
        <Button
          key={service.provider}
          variant="Init"
          onClick={() => signIn(service.provider, { redirect: false })}
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
      <AuthProvider>
        <LocalFormItem />
      </AuthProvider>
      <OauthFormItem />
    </Container>
  );
};

export default SigninForm;
