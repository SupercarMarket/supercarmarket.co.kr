import { Container, Title } from '@supercarmarket/ui';
import type { NextPageWithLayout } from '@supercarmarket/types/base';
import layout from 'components/layout';

const CommunityPost: NextPageWithLayout = () => {
  return (
    <Container>
      <Title>커뮤니티 게시글</Title>
    </Container>
  );
};

CommunityPost.Layout = layout;

export default CommunityPost;
