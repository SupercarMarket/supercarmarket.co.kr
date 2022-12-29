import { ResultId } from 'components/auth';
import Container from 'components/common/container';
import Title from 'components/common/title';
import layout from 'components/layout';
import { AuthProvider } from 'feature/authProvider';

const FindRsultId = () => {
  return (
    <Container>
      <Title textAlign="center">아이디 찾기</Title>
      <AuthProvider>
        <ResultId />
      </AuthProvider>
    </Container>
  );
};

FindRsultId.Layout = layout;

export default FindRsultId;
