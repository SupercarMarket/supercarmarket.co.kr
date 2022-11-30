import type { CommentResponse } from 'types/comment';

import Container from '../container';
import Pagination from '../pagination';
import CommentArea from './commentArea';
import CommentBody from './commentBody';
<<<<<<< HEAD
<<<<<<< HEAD
import CommentHead from './commentHead';
=======
>>>>>>> 7be72e2 (feat: Comment Component 마크업)
=======
import CommentHead from './commentHead';
>>>>>>> 643580a (feat: Comment Head Component)

const Comment = ({ data, page, totalPages, totalCount }: CommentResponse) => {
  return (
    <Container
      width="100%"
      display="flex"
      alignItems="center"
      justifyContent="flex-start"
      flexDirection="column"
      gap="20px"
      padding="40px 40px"
      border="1px solid #EAEAEC"
      borderRadius="4px"
      boxSizing="border-box"
    >
<<<<<<< HEAD
<<<<<<< HEAD
      <CommentHead totalCount={9999} />
=======
>>>>>>> 7be72e2 (feat: Comment Component 마크업)
=======
      <CommentHead totalCount={9999} />
<<<<<<< HEAD
>>>>>>> 643580a (feat: Comment Head Component)
      <CommentBody />
      <Pagination page={0} totalPages={1} totalCount={2} pageSize={10} />
=======
      <CommentBody comments={data} />
      <Pagination
        page={page}
        totalPages={totalPages}
        totalCount={totalCount}
        pageSize={10}
      />
>>>>>>> 9ee969b (feat: magazine and comment api 추가)
      <CommentArea />
    </Container>
  );
};

export default Comment;
