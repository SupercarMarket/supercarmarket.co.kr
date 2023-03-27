import { Container, deviceQuery, Pagination } from '@supercarmarket/ui';
import { useMedia, useUrlQuery } from '@supercarmarket/hooks';

import CommentArea from './commentArea';
import CommentBody from './commentBody';
import CommentHead from './commentHead';
import { CommentSkeleton } from 'components/fallback/loading';
import { useSession } from 'next-auth/react';
import { useComment } from 'http/server/comment';
import * as React from 'react';

interface CommentProps {
  id: string;
  kind?: 'magazine' | 'paparazzi' | 'partnership' | 'download';
}

const Comment = ({ id, kind = 'magazine' }: CommentProps) => {
  const session = useSession();
  const { isMobile } = useMedia({ deviceQuery });
  const { page, orderBy, category } = useUrlQuery();
  const scrollTarget = React.useRef<HTMLDivElement>(null);

  const { data: comment, isLoading } = useComment(
    {
      postId: id,
      query: {
        page,
        orderBy,
        category: kind,
      },
      token: session.data?.accessToken,
    },
    {
      enabled: session.status !== 'loading',
    }
  );

  if (isLoading) return <CommentSkeleton />;

  return (
    <>
      <div ref={scrollTarget} />
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
              session={session.data}
            />
            <Pagination
              scrollTarget={scrollTarget}
              totalPages={comment.totalPages}
              totalCount={comment.totalCount}
              pageSize={10}
            />
            <CommentArea
              postId={id}
              kind={kind}
              category={category}
              session={session.data}
            />
          </>
        )}
      </Container>
    </>
  );
};

export default Comment;
