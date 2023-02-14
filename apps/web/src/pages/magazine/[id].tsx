import { Container } from '@supercarmarket/ui';
import type { NextPageWithLayout } from '@supercarmarket/types/base';
import {
  dehydrate,
  QueryClient,
  QueryErrorResetBoundary,
} from '@tanstack/react-query';
import Posting from 'components/common/posting';
import { ErrorFallback } from 'components/fallback';
import layout from 'components/layout';
import { MagazineDealer, MagazineScrape } from 'components/magazine';
import queries from 'constants/queries';
import { ModalProvider } from 'feature/modalContext';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import dynamic from 'next/dynamic';
import type { ParsedUrlQuery } from 'querystring';
import * as React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { baseFetch } from 'utils/api/fetcher';

const Comment = dynamic(() => import('components/common/comment'), {
  ssr: false,
});

interface IParams extends ParsedUrlQuery {
  id: string;
}

const MagazinePost: NextPageWithLayout = ({
  id,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <ModalProvider>
      <Container
        display="flex"
        alignItems="center"
        justifyContent="flex-start"
        flexDirection="column"
        gap="80px"
      >
        <QueryErrorResetBoundary>
          {({ reset }) => (
            <>
              <ErrorBoundary
                onReset={reset}
                fallbackRender={(props) => (
                  <ErrorFallback margin="100px 0" {...props} />
                )}
              >
                <Posting postId={id} type="magazine" />
              </ErrorBoundary>
              {/* {magazinePost && (
                <MagazineScrape
                  postId={id}
                  isScraped={magazinePost?.isScraped}
                />
              )} */}
              <MagazineDealer postId={id} />
              <ErrorBoundary
                onReset={reset}
                fallbackRender={(props) => <ErrorFallback {...props} />}
              >
                <React.Suspense fallback={<div>loading..</div>}>
                  <Comment id={id} />
                </React.Suspense>
              </ErrorBoundary>
            </>
          )}
        </QueryErrorResetBoundary>
      </Container>
    </ModalProvider>
  );
};

export default MagazinePost;

MagazinePost.Layout = layout;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params as IParams;

  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery(queries.magazine.id(id), () =>
      baseFetch(`${process.env.NEXT_PUBLIC_URL}/api/magazine`, {
        method: 'GET',
        params: id,
      })
    ),
  ]);

  return {
    props: {
      id,
      dehydratedState: dehydrate(queryClient),
    },
  };
};
