import {
  dehydrate,
  QueryClient,
  QueryErrorResetBoundary,
} from '@tanstack/react-query';
import Container from 'components/common/container';
import Title from 'components/common/title';
import { ErrorFallback } from 'components/fallback';
import layout from 'components/layout';
import { MagazineBanner, MagazineList } from 'components/magazine';
import queries from 'constants/queries';
import { useRouter } from 'next/router';
import type { GetStaticProps } from 'next/types';
import { useMemo } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { baseFetcher } from 'utils/api/fetcher';

const MagazinePage = () => {
  const { query } = useRouter();
  const page = useMemo(
    () =>
      query.page && typeof query.page === 'string' ? parseInt(query.page) : 0,
    [query.page]
  );

  return (
    <Container
      display="flex"
      flexDirection="column"
      alignItems="center"
      margin="20px 0 0 0"
    >
      <Title>따끈따끈한 최근 소식</Title>
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
              <MagazineList page={page} />
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

  await queryClient.prefetchQuery(queries.magazine.lists(), () =>
    baseFetcher(`${process.env.NEXT_PUBLIC_URL}/api/magazine`, {
      method: 'GET',
    })
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
