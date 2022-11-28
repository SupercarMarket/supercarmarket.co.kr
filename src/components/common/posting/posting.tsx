import Container from '../container';
import PostingBody from './postingBody';
import PostingHead from './postingHead';

const Posting = () => {
  return (
    <Container
      width="100%"
      display="flex"
      flexDirection="column"
      padding="40px"
      border="1px solid #EAEAEC"
      borderRadius="4px"
      boxSizing="border-box"
    >
      <PostingHead />
      <PostingBody />
    </Container>
  );
};

export default Posting;
