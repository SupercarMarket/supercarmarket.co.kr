import {
  Alert,
  applyMediaQuery,
  Button,
  Container,
  theme,
  Typography,
  Wrapper,
} from '@supercarmarket/ui';

import Avvvatars from 'avvvatars-react';
import useLikeComment from 'hooks/mutations/comment/useLikeComment';
import useRemoveComment from 'hooks/mutations/comment/useRemoveComment';
import * as React from 'react';
import type { Comment } from '@supercarmarket/types/comment';

import LikeIcon from '../../../assets/svg/thumb-up.svg';
import * as style from './comment.styled';
import CommentArea from './commentArea';
import { css } from 'styled-components';

const CommentCard = ({
  isMyComment = true,
  root = true,
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
  category,
}: Comment & {
  root?: boolean;
  postId: string;
  category: 'magazine' | 'paparazzi' | 'partnership';
}) => {
  const { mutate: likeMuate } = useLikeComment({
    category,
    postId,
    commentId: id,
  });
  const { mutate: removeMutate } = useRemoveComment({
    category,
    postId,
    commentId: id,
  });
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
          <Wrapper
            css={css`
              ${applyMediaQuery('mobile')} {
                & > div {
                  width: 24px !important;
                  height: 24px !important;
                }
                & > div > p {
                  font-size: 10px !important;
                }
              }
            `}
          >
            <Avvvatars value={user.nickName} size={40} radius={20} />
          </Wrapper>
          <Wrapper css={style.cardWrapper}>
            <Wrapper.Top css={style.cardInfo}>
              <Wrapper css={style.cardInfoWrapper}>
                <Typography
                  as="p"
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
                {children && root && (
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
                {isMyComment && (
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
                <Wrapper
                  css={css`
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    & > svg {
                      width: 16px;
                      height: 16px;
                      fill: ${isLiked
                        ? theme.color['system-1']
                        : theme.color['greyScale-5']};
                    }
                  `}
                >
                  <LikeIcon />
                  <Typography
                    fontSize="body-14"
                    fontWeight="regular"
                    lineHeight="120%"
                    color={isLiked ? 'system-1' : 'greyScale-5'}
                  >
                    {like}
                  </Typography>
                </Wrapper>
              </Button>
            </Wrapper.Top>
            <Wrapper.Bottom
              css={css`
                display: flex;
                flex-direction: column;
                gap: 4px;
              `}
            >
              <Typography>{content}</Typography>
              <Wrapper
                css={css`
                  display: flex;
                  align-items: center;
                  gap: 12px;
                  & > svg {
                    width: 16px;
                    height: 16px;
                    fill: ${({ theme }) => theme.color['greyScale-5']};
                  }
                  ${applyMediaQuery('desktop', 'tablet')} {
                    & > span {
                      display: none !important;
                    }
                    & > button {
                      display: none !important;
                    }
                  }
                `}
              >
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
                {children && root && (
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
                {isMyComment && (
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
            </Wrapper.Bottom>
          </Wrapper>
        </Container>
      )}
      {modify && (
        <Wrapper css={style.cardArea}>
          <CommentArea
            postId={postId}
            parentId={id}
            defaultValue={content}
            category={category}
            type="edit"
          />
        </Wrapper>
      )}
      {open && (
        <Wrapper css={style.cardArea}>
          <CommentArea postId={postId} parentId={id} category={category} />
        </Wrapper>
      )}
      {children && (
        <Wrapper css={style.cardChildren}>
          {children.map((comment) => (
            <CommentCard
              key={comment.id}
              postId={postId}
              category={category}
              root={false}
              {...comment}
            />
          ))}
        </Wrapper>
      )}
    </>
  );
};

const CommentBody = ({
  postId,
  comments,
  category = 'magazine',
}: {
  postId: string;
  comments: Comment[];
  category?: 'magazine' | 'paparazzi' | 'partnership';
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
        <CommentCard
          key={comment.id}
          postId={postId}
          category={category}
          {...comment}
        />
      ))}
    </Container>
  );
};

export default React.memo(CommentBody);
