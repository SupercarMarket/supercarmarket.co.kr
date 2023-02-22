import {
  Button,
  Container,
  theme,
  Typography,
  Wrapper,
} from '@supercarmarket/ui';
import useCommunityPost from 'hooks/queries/community/useCommunityPost';

import useMagazinePost from 'hooks/queries/useMagazinePost';
import { useSession } from 'next-auth/react';
import * as React from 'react';
import { css } from 'styled-components';

import PostingBody from './postingBody';
import { PostingHeadCommunity, PostingHeadMagainze } from './postingHead';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import useLikeCommunityPost from 'hooks/mutations/community/useLikeCommunityPost';
import ModalContext from 'feature/modalContext';
import AuthModal from '../modal/authModal';

import LikeIcon from '../../../assets/svg/thumb-up.svg';

const Comment = dynamic(() => import('components/common/comment'), {
  ssr: false,
});

type PostingType = 'magazine' | 'community';

export interface PostingProps {
  postId: string;
  type: PostingType;
  category?: string;
  subject?: 'magazine' | 'paparazzi' | 'partnership';
}

const Posting = function Posting(props: PostingProps) {
  const { type, postId, subject, category } = props;

  return {
    community: (
      <CommunityPosting postId={postId} category={category} subject={subject} />
    ),
    magazine: (
      <MagazinePosting postId={postId} category={category} subject={subject} />
    ),
  }[type];
};

const MagazinePosting = ({ postId }: Omit<PostingProps, 'type'>) => {
  const { data: magazinePost } = useMagazinePost(postId, {
    enabled: !!postId,
  });

  return (
    <Container>
      {magazinePost && (
        <>
          <PostingHeadMagainze {...magazinePost.data} />
          <Container
            width="100%"
            display="flex"
            flexDirection="column"
            padding="0 40px"
            border="1px solid #EAEAEC"
            borderRadius="4px"
            boxSizing="border-box"
          >
            <PostingBody contentHtml={magazinePost.data.contentHtml} />
          </Container>
        </>
      )}
    </Container>
  );
};

const CommunityPosting = ({
  postId,
  subject = 'paparazzi',
  category = 'report',
}: Omit<PostingProps, 'type'>) => {
  const session = useSession();
  const { onOpen, onClose, onClick } = React.useContext(ModalContext);
  const { data: communityPost } = useCommunityPost(
    session.data?.accessToken || null,
    {
      subject,
      category,
      id: postId,
    },
    {
      enabled: session.status !== 'loading',
    }
  );
  const { mutate: likeMuate } = useLikeCommunityPost({
    subject,
    category,
    id: postId,
  });

  const handleLike = React.useCallback(() => {
    if (session.status === 'unauthenticated') {
      onOpen(
        <AuthModal
          onClose={onClose}
          onClick={onClick}
          onOpen={onOpen}
          description="로그인 후 상담 추천이 가능합니다"
        />
      );
      return;
    }
    likeMuate(session.data?.accessToken || '');
    return;
  }, [likeMuate, onClick, onClose, onOpen, session]);

  return (
    <Container display="flex" flexDirection="column" alignItems="center">
      {communityPost && (
        <>
          <Wrapper
            css={css`
              width: 100%;
              display: flex;
              justify-content: flex-end;
              gap: 9px;
              margin-bottom: 20px;
            `}
          >
            <Button type="button" variant="Line">
              <Link
                href={{
                  pathname: `/community/${subject}`,
                  query: {
                    category,
                  },
                }}
              >
                목록
              </Link>
            </Button>
            {session.status === 'authenticated' && (
              <Button type="button">
                <Link
                  href={{
                    pathname: '/community/create',
                  }}
                >
                  글쓰기
                </Link>
              </Button>
            )}
          </Wrapper>
          <Wrapper
            css={css`
              width: 100%;
              display: flex;
              flex-direction: column;
              padding: 40px;
              border: 1px solid #eaeaec;
              border-radius: 4px;
              box-sizing: border-box;
            `}
          >
            <PostingHeadCommunity category={category} {...communityPost.data} />
            <PostingBody contentHtml={communityPost.data.contentHtml} />
          </Wrapper>
          <Wrapper
            css={css`
              margin: 80px 0;
            `}
          >
            <Button
              type="button"
              variant="Line"
              width="95px"
              onClick={handleLike}
            >
              <Wrapper.Item
                css={css`
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  gap: 4px;
                `}
              >
                <Typography
                  fontSize="body-14"
                  fontWeight="regular"
                  color="system-1"
                  lineHeight="150%"
                >
                  {communityPost.data.like}
                </Typography>
                <Typography
                  fontSize="body-14"
                  fontWeight="regular"
                  color={
                    communityPost.data.isLiked ? 'system-1' : 'greyScale-6'
                  }
                  lineHeight="150%"
                >
                  <Wrapper.Item
                    css={css`
                      display: flex;
                      align-items: center;
                      gap: 4.5px;
                    `}
                  >
                    <Wrapper.Left
                      css={css`
                        display: flex;
                        align-items: center;
                        & > svg {
                          width: 18px;
                          height: 18px;
                          fill: ${communityPost.data.isLiked
                            ? theme.color['system-1']
                            : theme.color['greyScale-6']};
                        }
                      `}
                    >
                      <LikeIcon />
                    </Wrapper.Left>
                    <Wrapper.Right>추천</Wrapper.Right>
                  </Wrapper.Item>
                </Typography>
              </Wrapper.Item>
            </Button>
          </Wrapper>
          <Comment id={postId} category={subject} />
          <Wrapper
            css={css`
              width: 100%;
              display: flex;
              justify-content: space-between;
              margin-top: 20px;
              margin-bottom: 80px;
            `}
          >
            <Wrapper.Item
              css={css`
                display: flex;
                gap: 9px;
              `}
            >
              {communityPost.data.isMyPost && (
                <>
                  <Button type="button" variant="Line">
                    수정
                  </Button>
                  <Button type="button" variant="Line">
                    삭제
                  </Button>
                </>
              )}
            </Wrapper.Item>
            <Wrapper.Item
              css={css`
                display: flex;
                gap: 9px;
              `}
            >
              <Button type="button" variant="Line">
                목록
              </Button>
              <Button type="button" variant="Line">
                맨 위로
              </Button>
              <Button type="button">글쓰기</Button>
            </Wrapper.Item>
          </Wrapper>
        </>
      )}
    </Container>
  );
};

export default React.memo(Posting);
