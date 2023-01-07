import {
  dehydrate,
  QueryClient,
  QueryErrorResetBoundary,
} from '@tanstack/react-query';
import Container from 'components/common/container';
import Title from 'components/common/title';
import { ErrorFallback } from 'components/fallback';
import Community from 'components/home/community';
import Magazine from 'components/home/magazine';
import { MarketBest, MarketNew } from 'components/home/market';
import Layout from 'components/layout';
import queries from 'constants/queries';
import { GetStaticProps } from 'next';
import * as React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { baseFetch } from 'utils/api/fetcher';

const Home = () => {
  return (
    <Container>
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <>
            <Title marginBottom="20px">슈마매거진</Title>
            <ErrorBoundary
              onReset={reset}
              fallbackRender={(props) => <ErrorFallback {...props} />}
            >
              <Magazine />
            </ErrorBoundary>
            <Title marginTop="80px" marginBottom="20px">
              매물 관심 베스트
            </Title>
            <ErrorBoundary
              onReset={reset}
              fallbackRender={(props) => <ErrorFallback {...props} />}
            >
              <MarketBest />
            </ErrorBoundary>
            <Title marginTop="40px" marginBottom="20px">
              최신 매물
            </Title>
            <ErrorBoundary
              onReset={reset}
              fallbackRender={(props) => <ErrorFallback {...props} />}
            >
              <MarketNew />
            </ErrorBoundary>
            <Title marginTop="80px" marginBottom="20px">
              커뮤니티 인기글
            </Title>
            <ErrorBoundary
              onReset={reset}
              fallbackRender={(props) => <ErrorFallback {...props} />}
            >
              <Community />
            </ErrorBoundary>
          </>
        )}
      </QueryErrorResetBoundary>
    </Container>
  );
};

export default Home;

const queryClient = new QueryClient();

export const getStaticProps: GetStaticProps = async () => {
  await Promise.all([
    queryClient.prefetchQuery(queries.home.magazine(), () =>
      baseFetch(`${process.env.NEXT_PUBLIC_URL}/api/home`, {
        method: 'GET',
        query: {
          category: 'magazine',
        },
      })
    ),
    queryClient.prefetchQuery(queries.home.best(), () =>
      baseFetch(`${process.env.NEXT_PUBLIC_URL}/api/home`, {
        method: 'GET',
        query: {
          category: 'best',
        },
      })
    ),
    queryClient.prefetchQuery(queries.home.new(), () =>
      baseFetch(`${process.env.NEXT_PUBLIC_URL}/api/home`, {
        method: 'GET',
        query: {
          category: 'new',
        },
      })
    ),
    queryClient.prefetchQuery(queries.home.community(), () =>
      baseFetch(`${process.env.NEXT_PUBLIC_URL}/api/home`, {
        method: 'GET',
        query: {
          category: 'community',
        },
      })
    ),
  ]);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 30,
  };
};

Home.Layout = Layout;
