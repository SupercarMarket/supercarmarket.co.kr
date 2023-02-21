import { Container, Pagination } from '@supercarmarket/ui';
import { useUrlQuery } from '@supercarmarket/hooks';
import useComment from 'hooks/queries/useComment';

import CommentArea from './commentArea';
import CommentBody from './commentBody';
import CommentHead from './commentHead';

interface CommentProps {
  id: string;
  category?: 'magazine' | 'paparazzi' | 'partnership';
}

const Comment = ({ id, category = 'magazine' }: CommentProps) => {
  const { page, orderBy } = useUrlQuery();

  const { data: comment } = useComment(
    id,
    {
      page,
      orderBy,
      category,
    },
    {
      enabled: !!id,
    }
  );

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
          <CommentBody
            postId={id}
            comments={comment.data}
            category={category}
          />
          <Pagination
            totalPages={comment.totalPages}
            totalCount={comment.totalCount}
            pageSize={10}
          />
          <CommentArea postId={id} category={category} />
        </>
      )}
    </Container>
  );
};

export default Comment;
