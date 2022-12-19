import type { CommentResponse } from 'types/comment';

import Container from '../container';
import Pagination from '../pagination';
import CommentArea from './commentArea';
import CommentBody from './commentBody';
import CommentHead from './commentHead';

interface CommentProps extends CommentResponse {
  id: string;
}

const Comment = ({ data, page, totalPages, totalCount, id }: CommentProps) => {
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
      <CommentHead totalCount={9999} />
      <CommentBody postId={id} comments={data} />
      <Pagination
        page={page}
        totalPages={totalPages}
        totalCount={totalCount}
        pageSize={10}
      />
      <CommentArea postId={id} />
    </Container>
  );
};

export default Comment;
