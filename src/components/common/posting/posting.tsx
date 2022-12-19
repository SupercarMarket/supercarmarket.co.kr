import { memo, useMemo } from 'react';
import type { Posting as PostingType } from 'types/base';

import Container from '../container';
import PostingBody from './postingBody';
import PostingHead from './postingHead';

export interface PostingProps extends PostingType {
  like?: number;
  isScraped?: boolean;
}

const Posting = memo(function Posting(props: PostingProps) {
  const posting = useMemo(() => ({ ...props }), [props]);
  const { contentHtml, ...rest } = posting;

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
      <PostingHead {...rest} />
      <PostingBody contentHtml={contentHtml} />
    </Container>
  );
});

export default Posting;
