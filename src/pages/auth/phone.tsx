import { PhoneForm } from 'components/auth';
import Container from 'components/common/container';
import Title from 'components/common/title';
import layout from 'components/layout';
import { AuthProvider } from 'feature/authProvider';

const Phone = () => {
  return (
    <Container
      display="flex"
      flexDirection="column"
      alignItems="center"
      margin="80px 0"
      gap="60px"
    >
      <Title textAlign="center">핸드폰 인증</Title>
      <AuthProvider>
        <PhoneForm />
      </AuthProvider>
    </Container>
  );
};

Phone.Layout = layout;

export default Phone;
