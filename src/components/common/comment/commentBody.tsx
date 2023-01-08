import Avvvatars from 'avvvatars-react';
import useLikeComment from 'hooks/mutations/comment/useLikeComment';
import useRemoveComment from 'hooks/mutations/comment/useRemoveComment';
import { useSession } from 'next-auth/react';
import * as React from 'react';
import { Comment } from 'types/comment';

import LikeIcon from '../../../assets/svg/thumb-up.svg';
import Alert from '../alert';
import Button from '../button';
import Container from '../container';
import Typography from '../typography';
import Wrapper from '../wrapper';
import * as style from './comment.styled';
import CommentArea from './commentArea';

const CommentCard = ({
  postId,
  id,
  user,
  like,
  content,
  createAt,
  updateAt,
  isRemoved,
  isLiked,
  children,
}: Comment & { postId: string }) => {
  const isMyComment = useSession().data?.sub === user.nickName;
  const { mutate: likeMuate } = useLikeComment(postId, id);
  const { mutate: removeMutate } = useRemoveComment(postId, id);
  const [modify, setModify] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const handleOpen = React.useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  const handleModify = React.useCallback(() => {
    setModify((prev) => !prev);
  }, []);

  const handleRemove = React.useCallback(() => {
    removeMutate();
  }, [removeMutate]);

  const handleLike = React.useCallback(() => {
    likeMuate();
  }, [likeMuate]);
  return (
    <>
      {isRemoved ? (
        <Typography
          fontSize="body-14"
          fontWeight="regular"
          lineHeight="150%"
          color="greyScale-6"
          style={{
            marginTop: '22px',
          }}
        >
          삭제된 댓글입니다.
        </Typography>
      ) : (
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
                {true && (
                  <Button variant="Init" onClick={handleModify}>
                    <Typography
                      fontSize="body-14"
                      fontWeight="regular"
                      lineHeight="150%"
                      color="greyScale-5"
                      style={{
                        cursor: 'pointer',
                      }}
                    >
                      수정
                    </Typography>
                  </Button>
                )}
                {isMyComment && (
                  <Button variant="Init" onClick={handleRemove}>
                    <Typography
                      fontSize="body-14"
                      fontWeight="regular"
                      lineHeight="150%"
                      color="greyScale-5"
                      style={{
                        cursor: 'pointer',
                      }}
                    >
                      삭제
                    </Typography>
                  </Button>
                )}
              </Wrapper>
              <Button
                variant="Init"
                disabled={isLiked}
                onClick={handleLike}
                style={{
                  cursor: 'pointer',
                }}
              >
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
              </Button>
            </Wrapper.Top>
            <Wrapper.Bottom>
              <Typography>{content}</Typography>
            </Wrapper.Bottom>
          </Wrapper>
        </Container>
      )}
      {modify && (
        <Wrapper css={style.cardArea}>
          <CommentArea postId={id} />
        </Wrapper>
      )}
      {open && (
        <Wrapper css={style.cardArea}>
          <CommentArea postId={postId} parentId={id} />
        </Wrapper>
      )}
      {children && (
        <Wrapper css={style.cardChildren}>
          {children.map((comment) => (
            <CommentCard key={comment.id} postId={postId} {...comment} />
          ))}
        </Wrapper>
      )}
    </>
  );
};

const CommentBody = ({
  postId,
  comments,
}: {
  postId: string;
  comments: Comment[];
}) => {
  return (
    <Container display="flex" flexDirection="column">
      {comments.length === 0 && (
        <Alert
          severity="info"
          title="댓글이 아직 없습니다. 댓글을 남겨보세요."
        />
      )}
      {comments.map((comment) => (
        <CommentCard key={comment.id} postId={postId} {...comment} />
      ))}
    </Container>
  );
};

export default React.memo(CommentBody);
