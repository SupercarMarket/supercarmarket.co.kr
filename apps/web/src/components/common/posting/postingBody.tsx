import '@toast-ui/editor/dist/toastui-editor-viewer.css';

import { Container } from '@supercarmarket/ui';
import { Viewer } from '@toast-ui/react-editor';

interface PostingBodyProps {
  contentHtml: string;
}

const PostingBody = ({ contentHtml }: PostingBodyProps) => {
  return (
    <Container margin="40px 0">
      <Viewer initialValue={contentHtml} />
    </Container>
  );
};

export default PostingBody;
