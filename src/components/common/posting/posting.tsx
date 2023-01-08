import useMagazinePost from 'hooks/queries/useMagazinePost';
import * as React from 'react';

import Container from '../container';
import PostingBody from './postingBody';
import PostingHead from './postingHead';

type PostingType = 'magazine' | 'community';

export interface PostingProps {
  postId: string;
  type: PostingType;
}

const Posting = function Posting(props: PostingProps) {
  const { postId, type } = props;
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
          {type === 'magazine' ? (
            <PostingHead {...magazinePost.data} />
          ) : (
            <PostingHead {...magazinePost.data} />
          )}
          <PostingBody contentHtml={magazinePost.data.contentHtml} />
        </>
      )}
    </Container>
  );
};

export default React.memo(Posting);
