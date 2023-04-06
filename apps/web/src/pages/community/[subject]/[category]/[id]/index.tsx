import { applyMediaQuery, Container, Title, Wrapper } from '@supercarmarket/ui';
import type { NextPageWithLayout, Params } from '@supercarmarket/types/base';
import layout from 'components/layout';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import {
  dehydrate,
  QueryClient,
  QueryErrorResetBoundary,
} from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from 'components/fallback';
import Posting from 'components/common/posting';
import { CommunityPostingList } from 'components/community';
import Advertisement from 'components/common/advertisement';
import { prefetchCommunityPost, QUERY_KEYS } from 'http/server/community';
import { getSession } from 'http/server/next';
import { ModalProvider } from 'feature/ModalProvider';

const CommunityPost: NextPageWithLayout = ({
  subject,
  category,
  id,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <Container>
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <Wrapper>
            <ErrorBoundary
              onReset={reset}
              fallbackRender={(props) => (
                <ErrorFallback margin="100px 0" {...props} />
              )}
            >
              <Advertisement />
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
  const boardView = req.cookies['boardView'];

  await queryClient.prefetchQuery({
    queryKey: [
      ...QUERY_KEYS.id(id),
      {
        subject,
        category,
      },
    ],
    queryFn: () =>
      prefetchCommunityPost({
        id,
        category,
        token: session?.accessToken,
        boardView: `${boardView}[${id}]`,
      }),
  });

  return {
    props: {
      subject,
      category,
      id,
      dehydratedState: dehydrate(queryClient),
    },
  };
};
