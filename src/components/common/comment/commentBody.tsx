import Avvvatars from 'avvvatars-react';

import Container from '../container';
import Typography from '../typography';
import { Comment } from './comment';
import {
  CommentCardChildrenWrapper,
  CommentCardContent,
  CommentCardInfo,
  CommentCardWrapper,
} from './comment.styled';

const CommentCard = ({ children }: Comment) => {
  return (
    <>
      <Container
        display="flex"
        padding="20px 0"
        gap="12px"
        borderBottom="1px solid #EAEAEC"
      >
        <Avvvatars value="금종선" size={40} radius={20} />
        <CommentCardWrapper>
          <CommentCardInfo>
            <Typography
              fontSize="header-14"
              fontWeight="bold"
              lineHeight="120%"
              color="greyScale-6"
            >
              슈퍼카마켓슈퍼카마켓
            </Typography>
            <Typography
              fontSize="body-14"
              fontWeight="regular"
              lineHeight="150%"
              color="greyScale-5"
            >
              2022. 9. 14 16:24
            </Typography>
            <Typography
              fontSize="body-14"
              fontWeight="regular"
              lineHeight="150%"
              color="greyScale-5"
            >
              수정됨
            </Typography>
            <Typography
              fontSize="body-14"
              fontWeight="regular"
              lineHeight="150%"
              color="greyScale-5"
              style={{
                cursor: 'pointer',
              }}
            >
              답글쓰기
            </Typography>
          </CommentCardInfo>
          <CommentCardContent>
            <Typography>
              댓글 내용 띄어쓰기 포함 총 2000자 댓글 내용 띄어쓰기 포함 총
              2000자
            </Typography>
          </CommentCardContent>
        </CommentCardWrapper>
      </Container>
      {children && (
        <CommentCardChildrenWrapper>
          {children.map((comment) => (
            <CommentCard key={comment.nickname} {...comment} />
          ))}
        </CommentCardChildrenWrapper>
      )}
    </>
  );
};

const CommentBody = ({ comments }: { comments?: Comment[] }) => {
  return (
    <Container display="flex" flexDirection="column">
      <CommentCard />
    </Container>
  );
};

export default CommentBody;
