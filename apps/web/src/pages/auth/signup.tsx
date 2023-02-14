import { Container, Title } from '@supercarmarket/ui';
import type { NextPageWithLayout } from '@supercarmarket/types/base';
import { SignupForm } from 'components/auth';
import AuthLayout from 'components/layout/authLayout';

const Signup: NextPageWithLayout = () => {
  return (
    <Container
      display="flex"
      flexDirection="column"
      alignItems="center"
      margin="80px 0"
      gap="60px"
    >
      <Title textAlign="center">회원가입</Title>
      <SignupForm />
    </Container>
  );
};

Signup.Layout = AuthLayout;

export default Signup;
