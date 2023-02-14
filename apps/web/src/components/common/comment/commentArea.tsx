import { Button, Container, Typography } from '@supercarmarket/ui';
import useAddComment from 'hooks/mutations/comment/useAddComment';
import useUpdateComment from 'hooks/mutations/comment/useUpdateComment';
import { useSession } from 'next-auth/react';
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';

import {
  CommentAreaBottom,
  CommentAreaTextArea,
  CommentAreaTop,
} from './comment.styled';

type CommentAreaType = 'add' | 'edit';

interface CommentAreaProps {
  postId: string;
  parentId?: string;
  type?: CommentAreaType;
  defaultValue?: string;
}

const CommentArea = ({
  postId,
  parentId,
  defaultValue,
  type = 'add',
}: CommentAreaProps) => {
  const isAuthenticated = useSession().status === 'authenticated';
  const { mutate: addMutation, isSuccess: isAddSuccess } = useAddComment(
    postId,
    parentId
  );
  const { mutate: updateMutation, isSuccess: isUpdateSuccess } =
    useUpdateComment(postId, parentId);
  const [comment, setComment] = useState(defaultValue ? defaultValue : '');
  const length = useMemo(() => comment.length, [comment.length]);

  const onChange = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  }, []);

  const onSubmit = useCallback(() => {
    if (type === 'add') addMutation({ contents: comment });
    else if (type === 'edit') updateMutation(comment);
  }, [type, addMutation, comment, updateMutation]);

  useEffect(() => {
    if (isAddSuccess || isUpdateSuccess) setComment('');
  }, [isAddSuccess, isUpdateSuccess]);

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
