import { Container } from '@supercarmarket/ui';

interface PostingBodyProps {
  contentHtml: string;
}

const convertHtml = (html: string) => {
  const document = new DOMParser().parseFromString(html, 'text/html');

  const images = Array.from(document.querySelectorAll('img'));

  images.forEach((element) => {
    if (element.width > 261) {
      element.style.width = '100%';
      element.style.height = 'auto';
    }
  });

  return document.body.innerHTML;
};

const PostingBody = ({ contentHtml }: PostingBodyProps) => {
  return (
    <Container margin="40px 0">
      <div
        dangerouslySetInnerHTML={{
          __html: convertHtml(contentHtml),
        }}
      />
    </Container>
  );
};

export default PostingBody;
