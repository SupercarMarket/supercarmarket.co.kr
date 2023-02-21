import { Container } from '@supercarmarket/ui';
import useCommunityPost from 'hooks/queries/useCommunityPost';

import useMagazinePost from 'hooks/queries/useMagazinePost';
import { useSession } from 'next-auth/react';
import * as React from 'react';

import PostingBody from './postingBody';
import { PostingHeadCommunity, PostingHeadMagainze } from './postingHead';

type PostingType = 'magazine' | 'community';

export interface PostingProps {
  postId: string;
  type: PostingType;
  category?: string;
  subject?: string;
}

const Posting = function Posting(props: PostingProps) {
  const { type, postId, subject, category } = props;

  return {
    community: <CommunityPosting postId={postId} />,
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
      {magazinePost && <PostingHeadMagainze {...magazinePost.data} />}
      <Container
        width="100%"
        display="flex"
        flexDirection="column"
        padding="0 40px"
        border="1px solid #EAEAEC"
        borderRadius="4px"
        boxSizing="border-box"
      >
        {magazinePost && (
          <>
            <PostingBody contentHtml={magazinePost.data.contentHtml} />
          </>
        )}
      </Container>
    </Container>
  );
};

const CommunityPosting = ({
  postId,
  subject = 'paparazzi',
  category = 'report',
}: Omit<PostingProps, 'type'>) => {
  const session = useSession();
  const { data: communityPost } = useCommunityPost(
    session.data?.accessToken || '',
    {
      subject,
      category,
      id: postId,
    },
    {
      enabled: session.status !== 'loading',
    }
  );

  return (
    <Container
      width="100%"
      display="flex"
      flexDirection="column"
      padding="40px"
      border="1px solid #EAEAEC"
      borderRadius="4px"
      boxSizing="border-box"
    >
      {communityPost && (
        <>
          <PostingHeadCommunity {...communityPost.data} />
          <PostingBody contentHtml={communityPost.data.contentHtml} />
        </>
      )}
    </Container>
  );
};

export default React.memo(Posting);
