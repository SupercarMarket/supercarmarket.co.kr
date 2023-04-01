import { Container, Title } from '@supercarmarket/ui';
import { ResultId } from 'components/auth';
import Layout from 'components/layout/layout';

const FindIdResult = () => {
  return (
    <Container
      display="flex"
      flexDirection="column"
      alignItems="center"
      margin="80px 0"
      gap="60px"
    >
      <Title textAlign="center">아이디 찾기</Title>
      <ResultId />
    </Container>
  );
};

FindIdResult.Layout = Layout;

export default FindIdResult;
