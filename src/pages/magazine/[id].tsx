import Comment from 'components/common/comment';
import Container from 'components/common/container';
import layout from 'components/layout';

const MagazinePost = () => {
  return (
    <Container display="flex" flexDirection="column">
      <Comment />
    </Container>
  );
};

export default MagazinePost;

MagazinePost.Layout = layout;
