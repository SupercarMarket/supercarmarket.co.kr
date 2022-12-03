import Container from 'components/common/container';
import Input from 'components/common/input';

const SignupForm = () => {
  return (
    <Container
      element="form"
      width="800px"
      display="flex"
      flexDirection="column"
    >
      <Input type="text" />
    </Container>
  );
};

export default SignupForm;
