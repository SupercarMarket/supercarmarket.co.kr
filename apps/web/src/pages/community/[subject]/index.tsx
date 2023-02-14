import { Container, Title } from '@supercarmarket/ui';
import type { NextPageWithLayout } from '@supercarmarket/types/base';
import layout from 'components/layout';

const CommunitySubject: NextPageWithLayout = () => {
  return (
    <Container>
      <Title>커뮤니티</Title>
    </Container>
  );
};

CommunitySubject.Layout = layout;

export default CommunitySubject;
