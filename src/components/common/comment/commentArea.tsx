import ModalContext from 'feature/modalContext';
import { ChangeEvent, useCallback, useContext, useMemo, useState } from 'react';

import Button from '../button';
import Container from '../container';
import AuthModal from '../modal';
import Typography from '../typography';
import {
  CommentAreaBottom,
  CommentAreaTextArea,
  CommentAreaTop,
} from './comment.styled';

const CommentArea = () => {
  const { onClick, onClose, onOpen } = useContext(ModalContext);
  const [comment, setComment] = useState('');
  const length = useMemo(() => comment.length, [comment.length]);

  const onChange = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  }, []);

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
          placeholder="댓글을 남겨보세요."
          minLength={1}
          maxLength={2000}
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
          onClick={() =>
            onOpen(
              <AuthModal onClick={onClick} onClose={onClose} onOpen={onOpen} />
            )
          }
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
