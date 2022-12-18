import { SignupForm } from 'components/auth';
import Container from 'components/common/container';
import Title from 'components/common/title';
import layout from 'components/layout';
import { AuthProvider } from 'feature/authProvider';

const Signup = () => {
  return (
    <Container
      display="flex"
      flexDirection="column"
      alignItems="center"
      margin="80px 0"
      gap="60px"
    >
      <Title textAlign="center">회원가입</Title>
      <AuthProvider>
        <SignupForm />
      </AuthProvider>
    </Container>
  );
};

Signup.Layout = layout;

export default Signup;
