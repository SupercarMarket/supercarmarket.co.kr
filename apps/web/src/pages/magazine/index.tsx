import { Container, Title } from '@supercarmarket/ui';
import type { NextPageWithLayout } from '@supercarmarket/types/base';
import { clientFetcher } from '@supercarmarket/lib';
import {
  dehydrate,
  QueryClient,
  QueryErrorResetBoundary,
} from '@tanstack/react-query';
import { ErrorFallback } from 'components/fallback';
import layout from 'components/layout';
import { MagazineBanner, MagazineList } from 'components/magazine';
import queries from 'constants/queries';
import type { GetStaticProps } from 'next/types';
import { ErrorBoundary } from 'react-error-boundary';

const MagazinePage: NextPageWithLayout = () => {
  return (
    <Container
      display="flex"
      flexDirection="column"
      alignItems="center"
      margin="20px 0 0 0"
    >
      <Title marginBottom="20px">따끈따끈한 최근 소식</Title>
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <>
            <ErrorBoundary
              onReset={reset}
              fallbackRender={(props) => (
                <ErrorFallback margin="100px 0" {...props} />
              )}
            >
              <MagazineBanner />
              <MagazineList />
            </ErrorBoundary>
          </>
        )}
      </QueryErrorResetBoundary>
    </Container>
  );
};

export default MagazinePage;

MagazinePage.Layout = layout;

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(
    [...queries.magazine.lists(), ...queries.magazine.query({ page: 0 })],
    () =>
      clientFetcher(`${process.env.NEXT_PUBLIC_URL}/api/magazine`, {
        method: 'GET',
        query: {
          page: 0,
        },
      })
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
