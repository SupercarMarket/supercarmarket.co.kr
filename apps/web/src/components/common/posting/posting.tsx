import {
  Button,
  Container,
  Tab,
  theme,
  Typography,
  Wrapper,
} from '@supercarmarket/ui';
import { useRouter } from 'next/navigation';
import useCommunityPost from 'hooks/queries/community/useCommunityPost';

import useMagazinePost from 'hooks/queries/useMagazinePost';
import useRemoveCommunityPost from 'hooks/mutations/community/useRemoveCommunityPost';
import { useSession } from 'next-auth/react';
import * as React from 'react';
import { css } from 'styled-components';
import { PostingHeadCommunity, PostingHeadMagainze } from './postingHead';

import dynamic from 'next/dynamic';
import useLikeCommunityPost from 'hooks/mutations/community/useLikeCommunityPost';
import ModalContext from 'feature/modalContext';
import AuthModal from '../modal/authModal';

import LikeIcon from '../../../assets/svg/thumb-up.svg';
import HeadSeo from '../headSeo/headSeo';
import { useQueryClient } from '@tanstack/react-query';
import queries from 'constants/queries';
import { MagazineScrape } from 'components/magazine';

const PostingBody = dynamic(() => import('./postingBody'), {
  ssr: false,
});
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
    <>
      {magazinePost && (
        <>
          <HeadSeo
            title={magazinePost.data.title}
            description={magazinePost.data.contentHtml}
          />
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
          <MagazineScrape postId={postId} isScraped={magazinePost.isScraped} />
        </>
      )}
    </>
  );
};

const CommunityPosting = ({
  postId,
  subject = 'paparazzi',
  category = 'report',
}: Omit<PostingProps, 'type'>) => {
  const session = useSession();
  const { onOpen, onClose, onClick } = React.useContext(ModalContext);
  const queryClient = useQueryClient();
  const { replace } = useRouter();
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
  const { mutate: removeMutate } = useRemoveCommunityPost({
    onSuccess: () => {
      Promise.all([
        queryClient.invalidateQueries([
          ...queries.community.all,
          {
            subject,
            category,
            id: postId,
          },
        ]),
        queryClient.invalidateQueries({
          queryKey: [
            ...queries.community.lists(),
            {
              category: category,
              page: 0,
              filter: undefined,
              searchType: undefined,
              keyword: undefined,
            },
          ],
        }),
      ]);
      replace(`/community/${subject}?category=${category}`);
    },
  });

  const handleRemove = React.useCallback(() => {
    if (!session.data) return;
    removeMutate({
      data: [
        {
          id: postId,
          category,
        },
      ],
      token: session.data.accessToken,
    });
  }, [category, postId, removeMutate, session.data]);

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
    <>
      {communityPost && (
        <>
          <HeadSeo
            title={communityPost.data.title}
            description={communityPost.data.contents}
          />
          <Container display="flex" flexDirection="column" alignItems="center">
            <>
              <Tab
                create={
                  session.status === 'authenticated'
                    ? '/community/create'
                    : undefined
                }
                list={`/community/${subject}?category=${category}`}
              />
              <Wrapper
                css={css`
                  width: 100%;
                  display: flex;
                  flex-direction: column;
                  padding: 40px;
                  border: 1px solid #eaeaec;
                  border-radius: 4px;
                  box-sizing: border-box;
                  margin-top: 20px;
                `}
              >
                <PostingHeadCommunity
                  category={category}
                  {...communityPost.data}
                />
                <PostingBody contentHtml={communityPost.data.contents} />
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
                <Tab
                  create={
                    session.status === 'authenticated'
                      ? '/community/create'
                      : undefined
                  }
                  list={`/community/${subject}`}
                  update={
                    communityPost.data.isMyPost
                      ? `/community/${subject}/${category}/${postId}/update`
                      : undefined
                  }
                  handleRemove={
                    communityPost.data.isMyPost ? handleRemove : undefined
                  }
                  scroll
                />
              </Wrapper>
            </>
          </Container>
        </>
      )}
    </>
  );
};

export default React.memo(Posting);
