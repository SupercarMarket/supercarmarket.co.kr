import { Container, Title } from '@supercarmarket/ui';
import type { NextPageWithLayout } from '@supercarmarket/types/base';
import { SigninForm } from 'components/auth';
import AuthLayout from 'components/layout/authLayout';

const Signin: NextPageWithLayout = () => {
  return (
    <Container
      display="flex"
      flexDirection="column"
      alignItems="center"
      margin="80px 0"
      gap="60px"
    >
      <Title textAlign="center">로그인</Title>
      <SigninForm />
    </Container>
  );
};

Signin.Layout = AuthLayout;

export default Signin;
