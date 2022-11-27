import ChatIcon from '../../../assets/svg/chat.svg';
import Container from '../container';
import Typography from '../typography';
import { CommentHeadLeft, CommentHeadRight } from './comment.styled';

interface CommentHeadProps {
  totalCount?: number;
}

const CommentHead = ({ totalCount }: CommentHeadProps) => {
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
        <Typography
          fontSize="body-16"
          fontWeight="regular"
          color="greyScale-6"
          lineHeight="150%"
          style={{
            cursor: 'pointer',
          }}
        >
          등록순
        </Typography>
        <Typography
          fontSize="body-16"
          fontWeight="regular"
          color="greyScale-4"
          lineHeight="150%"
          style={{
            cursor: 'pointer',
          }}
        >
          최신순
        </Typography>
      </CommentHeadRight>
    </Container>
  );
};

export default CommentHead;
