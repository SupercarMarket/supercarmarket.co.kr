import * as React from 'react';
import { Container, Title } from '@supercarmarket/ui';
import type { NextPageWithLayout } from '@supercarmarket/types/base';
import AuthLayout from 'components/layout/authLayout';
import { FindIdForm } from 'components/auth';

const FindPassword: NextPageWithLayout = () => {
  return (
    <Container
      display="flex"
      flexDirection="column"
      alignItems="center"
      margin="80px 0"
      gap="60px"
    >
      <Title textAlign="center">아이디 찾기</Title>
      <FindIdForm />
    </Container>
  );
};

FindPassword.Layout = AuthLayout;

export default FindPassword;
