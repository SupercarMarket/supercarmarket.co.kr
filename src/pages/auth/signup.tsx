import { SignupForm } from 'components/auth';
import Container from 'components/common/container';
import Title from 'components/common/title';
import layout from 'components/layout';
<<<<<<< HEAD
import { AuthProvider } from 'feature/authProvider';
=======
>>>>>>> 45c355dfdce16a4132d1d52bd9d7eabb4caf0864

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
<<<<<<< HEAD
      <AuthProvider>
        <SignupForm />
      </AuthProvider>
=======
      <SignupForm />
>>>>>>> 45c355dfdce16a4132d1d52bd9d7eabb4caf0864
    </Container>
  );
};

Signup.Layout = layout;

export default Signup;
