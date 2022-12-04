import Container from '../container';

interface PostingBodyProps {
  contentHtml: string;
}

const PostingBody = ({ contentHtml }: PostingBodyProps) => {
  return (
    <Container margin="40px 0">
      <div
        dangerouslySetInnerHTML={{
          __html: contentHtml,
        }}
      />
    </Container>
  );
};

export default PostingBody;
