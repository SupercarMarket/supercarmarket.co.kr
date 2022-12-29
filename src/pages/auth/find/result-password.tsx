import { ResultPasswordForm } from 'components/auth';
import Container from 'components/common/container';
import Title from 'components/common/title';
import AuthLayout from 'components/layout/authLayout';

const FindResultPassword = () => {
  return (
    <Container>
      <Title textAlign="center">비밀번호 재설정</Title>
      <ResultPasswordForm />
    </Container>
  );
};

FindResultPassword.Layout = AuthLayout;

export default FindResultPassword;
