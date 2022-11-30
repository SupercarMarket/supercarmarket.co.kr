import Avvvatars from 'avvvatars-react';
import { Comment } from 'types/comment';

import LikeIcon from '../../../assets/svg/thumb-up.svg';
import Container from '../container';
import Typography from '../typography';
import {
  CommentCardChildrenWrapper,
  CommentCardContent,
  CommentCardInfo,
  CommentCardInfoWrapper,
  CommentCardWrapper,
} from './comment.styled';

const CommentCard = ({
  user,
  like,
  content,
  createAt,
  updateAt,
  children,
}: Comment) => {
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
            <CommentCardInfoWrapper>
              <Typography
                fontSize="header-14"
                fontWeight="bold"
                lineHeight="120%"
                color="greyScale-6"
              >
                {user.nickName}
              </Typography>
              <Typography
                fontSize="body-14"
                fontWeight="regular"
                lineHeight="150%"
                color="greyScale-5"
              >
                {createAt.toString()}
              </Typography>
              {updateAt && (
                <Typography
                  fontSize="body-14"
                  fontWeight="regular"
                  lineHeight="150%"
                  color="greyScale-5"
                >
                  수정됨
                </Typography>
              )}
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
            </CommentCardInfoWrapper>
            <CommentCardInfoWrapper>
              <LikeIcon />
              <Typography
                fontSize="body-14"
                fontWeight="regular"
                lineHeight="120%"
                color="greyScale-5"
              >
                {like}
              </Typography>
            </CommentCardInfoWrapper>
          </CommentCardInfo>
          <CommentCardContent>
            <Typography>{content}</Typography>
          </CommentCardContent>
        </CommentCardWrapper>
      </Container>
      {children && (
        <CommentCardChildrenWrapper>
          {children.map((comment) => (
            <CommentCard key={comment.id} {...comment} />
          ))}
        </CommentCardChildrenWrapper>
      )}
    </>
  );
};

const CommentBody = ({ comments }: { comments: Comment[] }) => {
  return (
    <Container display="flex" flexDirection="column">
      {comments.map((comment) => (
        <CommentCard key={comment.id} {...comment} />
      ))}
    </Container>
  );
};

export default CommentBody;
