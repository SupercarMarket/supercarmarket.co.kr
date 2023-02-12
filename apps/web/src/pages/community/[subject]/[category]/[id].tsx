import Container from 'components/common/container';
import Title from 'components/common/title';
import layout from 'components/layout';
import { NextPageWithLayout } from 'types/base';

const CommunityPost: NextPageWithLayout = () => {
  return (
    <Container>
      <Title>커뮤니티 게시글</Title>
    </Container>
  );
};

CommunityPost.Layout = layout;

export default CommunityPost;
