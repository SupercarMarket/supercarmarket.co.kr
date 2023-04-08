import {
  Alert,
  Button,
  Container,
  Divider,
  Form,
  FormLabel,
  Typography,
  Wrapper,
} from '@supercarmarket/ui';
import { catchNoExist, ErrorCode } from '@supercarmarket/lib';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import * as React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import GoogleIcon from '../../../assets/svg/google.svg';
import KakaoIcon from '../../../assets/svg/kakao.svg';
import AuthFormItem from '../authFormItem/authFormItem';
import * as style from './signinForm.styled';
import { form, FormState } from 'constants/form/signin';

const oauth = [
  { provider: 'kakao', title: '카카오', icon: <KakaoIcon /> },
  { provider: 'google', title: '구글', icon: <GoogleIcon /> },
];

const Links = () => {
  return (
    <Container display="flex" alignItems="center" justifyContent="center">
      <Link
        href="/auth/find-id"
        style={{
          cursor: 'pointer',
        }}
      >
        아이디 찾기
      </Link>
      <Divider width="1px" height="10px" color="#C3C3C7" margin="0 10px" />
      <Link
        href="/auth/find-password"
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
  const { replace } = useRouter();
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  const { formState } = methods;

  const handleSubmit = React.useCallback(
    async (data: FormState) => {
      setErrorMessage(null);

      const { id, password } = data;
      catchNoExist(id, password);

      const response = await signIn('Credentials', {
        id,
        password,
        redirect: false,
      });

      if (!response) setErrorMessage(ErrorCode[450]);
      else if (response.ok) replace('/');
      else setErrorMessage(response?.error || ErrorCode[450]);
    },
    [replace]
  );

  return (
    <FormProvider {...methods}>
      <Form css={style.form} onSubmit={methods.handleSubmit(handleSubmit)}>
        <Wrapper css={style.wrapper}>
          {form.map((form) => (
            <FormLabel
              key={form.htmlFor}
              name={form.htmlFor}
              label={form.label}
              hidden
            >
              <AuthFormItem {...form} tooltip="" />
            </FormLabel>
          ))}
        </Wrapper>
        <Button
          type="submit"
          variant="Primary"
          fullWidth
          disabled={formState.isSubmitting}
        >
          {formState.isSubmitting ? '로그인중..' : '로그인'}
        </Button>
        <Links />
        {errorMessage && <Alert title={errorMessage} severity="error" />}
      </Form>
    </FormProvider>
  );
};

const OauthFormItem = () => {
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const { replace } = useRouter();

  const handleOauthLogin = async (provider: string) => {
    const response = await signIn(provider);

    if (!response) setErrorMessage(ErrorCode[450]);
    else if (response.ok) replace('/');
  };

  return (
    <Container display="flex" flexDirection="column" gap="10px">
      {oauth.map((service) => (
        <Button
          key={service.provider}
          variant="Init"
          onClick={() => handleOauthLogin(service.provider)}
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
      {errorMessage && <Alert title={errorMessage} severity="error" />}
    </Container>
  );
};

const SigninForm = () => {
  return (
    <Container
      width="100%"
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
