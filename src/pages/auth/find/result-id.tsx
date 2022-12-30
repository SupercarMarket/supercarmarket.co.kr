import { ResultId } from 'components/auth';
import Container from 'components/common/container';
import Title from 'components/common/title';
import AuthLayout from 'components/layout/authLayout';

const FindRsultId = () => {
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
