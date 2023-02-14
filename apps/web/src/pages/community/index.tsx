import { Container, Title } from '@supercarmarket/ui';
import type { NextPageWithLayout } from '@supercarmarket/types/base';
import layout from 'components/layout';

const Community: NextPageWithLayout = () => {
  return (
    <Container>
      <Title>커뮤니티</Title>
    </Container>
  );
};

Community.Layout = layout;

export default Community;
