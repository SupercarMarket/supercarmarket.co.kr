import { Container, deviceQuery, Pagination } from '@supercarmarket/ui';
import { useMedia, useUrlQuery } from '@supercarmarket/hooks';
import useComment from 'hooks/queries/useComment';

import CommentArea from './commentArea';
import CommentBody from './commentBody';
import CommentHead from './commentHead';

interface CommentProps {
  id: string;
  kind?: 'magazine' | 'paparazzi' | 'partnership';
}

const Comment = ({ id, kind = 'magazine' }: CommentProps) => {
  const { isMobile } = useMedia({ deviceQuery });
  const { page, orderBy, category } = useUrlQuery();

  const { data: comment } = useComment(
    id,
    {
      page,
      orderBy,
      category: kind,
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
      padding={isMobile ? '16px' : '40px'}
      border={isMobile ? undefined : '1px solid #EAEAEC'}
      borderRadius="4px"
      boxSizing="border-box"
    >
      {comment && (
        <>
          <CommentHead totalCount={comment.data.length} />
          <CommentBody
            postId={id}
            comments={comment.data}
            kind={kind}
            category={category}
          />
          <Pagination
            totalPages={comment.totalPages}
            totalCount={comment.totalCount}
            pageSize={10}
          />
          <CommentArea postId={id} kind={kind} category={category} />
        </>
      )}
    </Container>
  );
};

export default Comment;
