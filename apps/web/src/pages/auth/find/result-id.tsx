import { Container, Title } from '@supercarmarket/ui';
import { ResultId } from 'components/auth';
import AuthLayout from 'components/layout/authLayout';
import type { NextPageWithLayout } from '@supercarmarket/types/base';

const FindRsultId: NextPageWithLayout = () => {
  return (
    <Container
      display="flex"
      flexDirection="column"
      gap="60px"
      alignItems="center"
    >
      <Title textAlign="center">아이디 찾기</Title>
      <ResultId />
    </Container>
  );
};

FindRsultId.Layout = AuthLayout;

export default FindRsultId;
