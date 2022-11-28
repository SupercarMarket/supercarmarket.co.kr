import Comment from 'components/common/comment';
import Container from 'components/common/container';
import Posting from 'components/common/posting';
import layout from 'components/layout';
import MagazineDealer from 'components/magazine/magazineDealer';

const MagazinePost = () => {
  return (
    <Container display="flex" flexDirection="column" gap="80px">
      <Posting />
      <MagazineDealer />
      <Comment />
    </Container>
  );
};

export default MagazinePost;

MagazinePost.Layout = layout;
