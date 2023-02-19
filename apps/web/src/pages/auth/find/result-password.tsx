import { Container, Title } from '@supercarmarket/ui';
import { ResultPasswordForm } from 'components/auth';
import AuthLayout from 'components/layout/authLayout';
import { ModalProvider } from 'feature/modalContext';
import type { NextPageWithLayout } from '@supercarmarket/types/base';

const FindResultPassword: NextPageWithLayout = () => {
  return (
    <ModalProvider>
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
    </ModalProvider>
  );
};

FindResultPassword.Layout = AuthLayout;

export default FindResultPassword;
