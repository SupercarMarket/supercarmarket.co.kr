import { SigninForm } from 'components/auth';
import Container from 'components/common/container';
import Typography from 'components/common/typography';
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
      <Typography
        as="h3"
        fontSize="header-24"
        fontWeight="bold"
        color="greyScale-6"
        lineHeight="120%"
      >
        로그인
      </Typography>
      <SigninForm />
    </Container>
  );
};

Signin.Layout = layout;

export default Signin;
