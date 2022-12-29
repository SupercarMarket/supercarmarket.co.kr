import { ResultPasswordForm } from 'components/auth';
import Container from 'components/common/container';
import Title from 'components/common/title';
import AuthLayout from 'components/layout/authLayout';

const FindResultPassword = () => {
  return (
    <Container
      display="flex"
      flexDirection="column"
      alignItems="center"
      margin="80px 0"
      gap="60px"
    >
      <Title textAlign="center">비밀번호 재설정</Title>
      <ResultPasswordForm />
    </Container>
  );
};

FindResultPassword.Layout = AuthLayout;

export default FindResultPassword;
