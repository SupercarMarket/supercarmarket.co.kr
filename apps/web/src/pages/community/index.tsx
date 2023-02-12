import Container from 'components/common/container';
import Title from 'components/common/title';
import layout from 'components/layout';
import { NextPageWithLayout } from 'types/base';

const Community: NextPageWithLayout = () => {
  return (
    <Container>
      <Title>커뮤니티</Title>
    </Container>
  );
};

Community.Layout = layout;

export default Community;
