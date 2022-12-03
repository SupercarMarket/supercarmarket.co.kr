import { SignupForm } from 'components/auth';
import Container from 'components/common/container';
import Typography from 'components/common/typography';
import layout from 'components/layout';

const Signup = () => {
  return (
    <Container
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap="60px"
    >
      <Typography
        as="h3"
        fontSize="header-24"
        fontWeight="bold"
        color="greyScale-6"
        lineHeight="120%"
      >
        회원가입
      </Typography>
      <SignupForm />
    </Container>
  );
};

Signup.Layout = layout;

export default Signup;
