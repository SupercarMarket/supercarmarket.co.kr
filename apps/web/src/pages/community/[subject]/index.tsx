import Container from 'components/common/container';
import Title from 'components/common/title';
import layout from 'components/layout';
import { NextPageWithLayout } from 'types/base';

const CommunitySubject: NextPageWithLayout = () => {
  return (
    <Container>
      <Title>커뮤니티</Title>
    </Container>
  );
};

CommunitySubject.Layout = layout;

export default CommunitySubject;
