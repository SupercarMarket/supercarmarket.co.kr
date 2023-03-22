import { Container, Title, Wrapper } from '@supercarmarket/ui';
import type { NextPageWithLayout, Params } from '@supercarmarket/types/base';
import layout from 'components/layout';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import {
  dehydrate,
  QueryClient,
  QueryErrorResetBoundary,
} from '@tanstack/react-query';
import queries from 'constants/queries';
import { serverFetcher } from '@supercarmarket/lib';
import { getSession } from 'utils/api/auth/user';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from 'components/fallback';
import Posting from 'components/common/posting';
import { CommunityPostingList } from 'components/community';
import { ModalProvider } from 'feature/modalContext';
import { css } from 'styled-components';

const CommunityPost: NextPageWithLayout = ({
  subject,
  category,
  id,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <Container>
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <Wrapper
            css={css`
              padding: 0 16px;
            `}
          >
            <ErrorBoundary
              onReset={reset}
              fallbackRender={(props) => (
                <ErrorFallback margin="100px 0" {...props} />
              )}
            >
              <Title>커뮤니티 게시글</Title>
              <ModalProvider>
                <Posting
                  type="community"
                  postId={id}
                  subject={subject}
                  category={category}
                />
              </ModalProvider>
            </ErrorBoundary>
            <ErrorBoundary
              onReset={reset}
              fallbackRender={(props) => (
                <ErrorFallback margin="100px 0" {...props} />
              )}
            >
              <CommunityPostingList category={category} subject={subject} />
            </ErrorBoundary>
          </Wrapper>
        )}
      </QueryErrorResetBoundary>
    </Container>
  );
};

CommunityPost.Layout = layout;

export default CommunityPost;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { query, req } = ctx;
  const session = await getSession({ req });
  const { subject, category, id } = query as Params;

  const queryClient = new QueryClient();
  let headers = {};
  const boardView = req.cookies['boardView'];

  if (boardView) headers = { ...headers, Cookie: `boardView=${boardView}` };
  if (session) headers = { ...headers, ACCESS_TOKEN: session.accessToken };

  await queryClient.prefetchQuery(
    [
      ...queries.community.all,
      {
        subject,
        category,
        id,
      },
    ],
    () =>
      serverFetcher(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/supercar/v1/community/${category}/post-id/${id}`,
        {
          method: 'GET',
          headers,
        }
      ).then((res) => {
        const { ok, status, ...rest } = res;
        return rest;
      })
  );

  return {
    props: {
      subject,
      category,
      id,
      dehydratedState: dehydrate(queryClient),
    },
  };
};
