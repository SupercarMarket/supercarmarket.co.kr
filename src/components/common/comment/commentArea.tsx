import useAddComment from 'hooks/mutations/comment/useAddComment';
import { useSession } from 'next-auth/react';
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';

import Button from '../button';
import Container from '../container';
import Typography from '../typography';
import {
  CommentAreaBottom,
  CommentAreaTextArea,
  CommentAreaTop,
} from './comment.styled';

interface CommentAreaProps {
  postId: string;
  parentId?: string;
}

const CommentArea = ({ postId, parentId }: CommentAreaProps) => {
  const isAuthenticated = useSession().status === 'authenticated';
  const { mutate, isSuccess } = useAddComment(postId, parentId);
  const [comment, setComment] = useState('');
  const length = useMemo(() => comment.length, [comment.length]);

  const onChange = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  }, []);

  const onSubmit = useCallback(() => {
    mutate({ contents: comment });
  }, [comment, mutate]);

  useEffect(() => {
    if (isSuccess) setComment('');
  }, [isSuccess]);

  return (
    <Container
      display="flex"
      flexDirection="column"
      gap="8px"
      padding="12px 10px"
      border="1px solid #C3C3C7"
      borderRadius="4px"
      boxSizing="border-box"
    >
      <CommentAreaTop>
        <CommentAreaTextArea
          value={comment}
          onChange={onChange}
          placeholder={
            isAuthenticated ? '댓글을 남겨보세요.' : '로그인이 필요합니다.'
          }
          minLength={1}
          maxLength={2000}
          disabled={!isAuthenticated}
        />
      </CommentAreaTop>
      <CommentAreaBottom>
        <Typography
          fontSize="body-14"
          fontWeight="regular"
          color="greyScale-5"
          lineHeight="120%"
        >
          <Typography
            fontSize="body-14"
            fontWeight="regular"
            color="system-1"
            lineHeight="120%"
          >
            {length}
          </Typography>
          /2000자
        </Typography>
        <Button
          variant="Line"
          onClick={onSubmit}
          disabled={!isAuthenticated || length < 1}
        >
          <Typography
            fontSize="body-16"
            fontWeight="regular"
            color="greyScale-6"
            lineHeight="150%"
          >
            등록
          </Typography>
        </Button>
      </CommentAreaBottom>
    </Container>
  );
};

export default CommentArea;
