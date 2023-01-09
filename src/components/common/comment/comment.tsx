import useComment from 'hooks/queries/useComment';
import useCurrentPage from 'hooks/useCurrentPage';

import Container from '../container';
import Pagination from '../pagination';
import CommentArea from './commentArea';
import CommentBody from './commentBody';
import CommentHead from './commentHead';

interface CommentProps {
  id: string;
}

const Comment = ({ id }: CommentProps) => {
  const page = useCurrentPage();
  const { data: comment } = useComment(id, {
    enabled: !!id,
  });

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
      {comment && (
        <>
          <CommentHead totalCount={comment.data.length} />
          <CommentBody postId={id} comments={comment.data} />
          <Pagination
            page={page}
            totalPages={comment.totalPages}
            totalCount={comment.totalCount}
            pageSize={10}
          />
          <CommentArea postId={id} />
        </>
      )}
    </Container>
  );
};

export default Comment;
