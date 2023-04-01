import { Container, Title } from '@supercarmarket/ui';
import type { NextPageWithLayout } from '@supercarmarket/types/base';
import { FindPasswordForm } from 'components/auth';
import AuthLayout from 'components/layout/authLayout';
import * as React from 'react';
import { ModalProvider } from 'feature/modalContext';

const FindPassword: NextPageWithLayout = () => {
  return (
    <Container
      display="flex"
      flexDirection="column"
      alignItems="center"
      margin="80px 0"
      gap="60px"
    >
      <Title textAlign="center">비밀번호 찾기</Title>
      <ModalProvider>
        <FindPasswordForm />
      </ModalProvider>
    </Container>
  );
};

FindPassword.Layout = AuthLayout;

export default FindPassword;
