import Avvvatars from 'avvvatars-react';
import { useCallback, useState } from 'react';
import { Comment } from 'types/comment';

import LikeIcon from '../../../assets/svg/thumb-up.svg';
import Button from '../button';
import Container from '../container';
import Typography from '../typography';
import Wrapper from '../wrapper';
import * as style from './comment.styled';
import CommentArea from './commentArea';

const CommentCard = ({
  user,
  like,
  content,
  createAt,
  updateAt,
  children,
}: Comment) => {
  const [open, setOpen] = useState(false);

  const handleOpen = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);
  return (
    <>
      <Container
        display="flex"
        padding="20px 0"
        gap="12px"
        borderBottom="1px solid #EAEAEC"
      >
        <Avvvatars value={user.nickName} size={40} radius={20} />
        <Wrapper css={style.cardWrapper}>
          <Wrapper.Top css={style.cardInfo}>
            <Wrapper css={style.cardInfoWrapper}>
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
              {children && (
                <Button variant="Init" onClick={handleOpen}>
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
                </Button>
              )}
            </Wrapper>
            <Wrapper css={style.cardInfoWrapper}>
              <LikeIcon />
              <Typography
                fontSize="body-14"
                fontWeight="regular"
                lineHeight="120%"
                color="greyScale-5"
              >
                {like}
              </Typography>
            </Wrapper>
          </Wrapper.Top>
          <Wrapper.Bottom>
            <Typography>{content}</Typography>
          </Wrapper.Bottom>
        </Wrapper>
      </Container>
      {open && (
        <Wrapper css={style.cardArea}>
          <CommentArea id={'1'} />
        </Wrapper>
      )}
      {children && (
        <Wrapper css={style.cardChildren}>
          {children.map((comment) => (
            <CommentCard key={comment.id} {...comment} />
          ))}
        </Wrapper>
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
