'use client';

import { Container, Typography } from '@supercarmarket/ui';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

import ChatIcon from '../../../assets/svg/chat.svg';
import { CommentHeadLeft, CommentHeadRight } from './comment.styled';

interface CommentHeadProps {
  totalCount?: number;
}

const CommentHead = ({ totalCount }: CommentHeadProps) => {
  const pathname = usePathname();
  const isOrderby = useSearchParams().get('orderby') === 'true';

  return (
    <Container
      display="flex"
      alignItems="center"
      justifyContent="space-between"
    >
      <CommentHeadLeft>
        <ChatIcon />
        <Typography
          fontSize="header-20"
          fontWeight="bold"
          color="greyScale-6"
          lineHeight="150%"
        >
          댓글
        </Typography>
        <Typography
          fontSize="body-20"
          fontWeight="regular"
          color="greyScale-6"
          lineHeight="150%"
        >
          {totalCount}
        </Typography>
      </CommentHeadLeft>
      <CommentHeadRight>
        <Link
          href={{
            pathname,
            query: {
              orderby: 'false',
            },
          }}
        >
          <Typography
            fontSize="body-16"
            fontWeight="regular"
            color={isOrderby ? 'greyScale-4' : 'greyScale-6'}
            lineHeight="150%"
            style={{
              cursor: 'pointer',
            }}
          >
            등록순
          </Typography>
        </Link>
        <Link
          href={{
            pathname,
            query: {
              orderby: 'true',
            },
          }}
        >
          <Typography
            fontSize="body-16"
            fontWeight="regular"
            color={isOrderby ? 'greyScale-6' : 'greyScale-4'}
            lineHeight="150%"
            style={{
              cursor: 'pointer',
            }}
          >
            최신순
          </Typography>
        </Link>
      </CommentHeadRight>
    </Container>
  );
};

export default CommentHead;
