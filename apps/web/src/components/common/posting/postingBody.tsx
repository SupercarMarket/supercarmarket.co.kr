import '@toast-ui/editor/dist/toastui-editor-viewer.css';

import { Container } from '@supercarmarket/ui';
import { Viewer } from '@toast-ui/react-editor';
import React from 'react';

interface PostingBodyProps {
  contentHtml: string;
}

const PostingBody = React.memo(function PostingBody({
  contentHtml,
}: PostingBodyProps) {
  const viewer = React.useRef<InstanceType<typeof Viewer>>(null);

  React.useEffect(() => {
    viewer.current?.getInstance().setMarkdown(contentHtml);
  }, [contentHtml]);

  return (
    <Container margin="40px 0">
      <Viewer ref={viewer} initialValue={contentHtml} />
    </Container>
  );
});

export default PostingBody;
