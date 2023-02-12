import { SignupForm } from 'components/auth';
import Container from 'components/common/container';
import Title from 'components/common/title';
import AuthLayout from 'components/layout/authLayout';
import { NextPageWithLayout } from 'types/base';

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
