import { SigninForm } from 'components/auth';
import Container from 'components/common/container';
import Title from 'components/common/title';
import layout from 'components/layout';

const Signin = () => {
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

Signin.Layout = layout;

export default Signin;
