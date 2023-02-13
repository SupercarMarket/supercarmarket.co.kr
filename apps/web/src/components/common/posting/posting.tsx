import { Container } from '@supercarmarket/ui';

import useMagazinePost from 'hooks/queries/useMagazinePost';
import * as React from 'react';

import PostingBody from './postingBody';
import { PostingHeadCommunity, PostingHeadMagainze } from './postingHead';

type PostingType = 'magazine' | 'community';

export interface PostingProps {
  postId: string;
  type: PostingType;
}

const Posting = function Posting(props: PostingProps) {
  const { type, postId } = props;

  switch (type) {
    case 'magazine':
      return <MagazinePosting postId={postId} />;
    case 'community':
      return <CommunityPosting postId={postId} />;
    default:
      throw new Error('neead type props');
  }
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

const CommunityPosting = ({ postId }: Omit<PostingProps, 'type'>) => {
  const { data: magazinePost } = useMagazinePost(postId, {
    enabled: !!postId,
  });

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
      {magazinePost && (
        <>
          <PostingHeadCommunity {...magazinePost.data} />
          <PostingBody contentHtml={magazinePost.data.contentHtml} />
        </>
      )}
    </Container>
  );
};

export default React.memo(Posting);
