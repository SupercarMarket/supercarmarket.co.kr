import { Container, Wrapper } from '@supercarmarket/ui';
import { css } from 'styled-components';

interface PostingBodyProps {
  contentHtml: string;
}

const PostingBody = ({ contentHtml }: PostingBodyProps) => {
  return (
    <Container margin="40px 0">
      <Wrapper
        css={css`
          p {
            line-height: 160%;
          }
          code {
            color: #c1798b;
            background-color: #f9f2f4;
            padding: 2px 3px px;
            letter-spacing: -0.3px;
            border-radius: 2px;
          }
          hr {
            border-top: 1px solid #eee;
            margin: 16px 0;
          }
          strong {
            font-weight: bold;
          }
          del {
            color: #999;
          }
          a {
            color: #1f70de;
            cursor: pointer;
            text-decoration: underline;
          }
          img {
            margin: 4px 0 10px;
            box-sizing: border-box;
            vertical-align: top;
            max-width: 100%;
          }
        `}
      >
        <div
          dangerouslySetInnerHTML={{
            __html: contentHtml,
          }}
        />
      </Wrapper>
    </Container>
  );
};

export default PostingBody;
