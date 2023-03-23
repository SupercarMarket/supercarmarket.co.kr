import {
  dehydrate,
  QueryClient,
  QueryErrorResetBoundary,
} from '@tanstack/react-query';
import { Container, Wrapper, Title, applyMediaQuery } from '@supercarmarket/ui';
import type { NextPageWithLayout } from '@supercarmarket/types/base';
import { ErrorFallback } from 'components/fallback';
import Community from 'components/home/community';
import Magazine from 'components/home/magazine';
import { MarketBest, MarketNew } from 'components/home/market';
import Layout from 'components/layout';
import queries from 'constants/queries';
import { GetStaticProps } from 'next';
import * as React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import HeadSeo from 'components/common/headSeo';
import { APP_NAME } from 'constants/core';
import { css } from 'styled-components';
import { serverFetcher } from '@supercarmarket/lib';

const Home: NextPageWithLayout = () => {
  return (
    <>
      <HeadSeo title={APP_NAME} description="안녕하세요 슈퍼카마켓입니다." />
      <Container>
        <QueryErrorResetBoundary>
          {({ reset }) => (
            <Wrapper
              css={css`
                ${applyMediaQuery('mobile')} {
                  padding: 0 16px;
                }
              `}
            >
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
            </Wrapper>
          )}
        </QueryErrorResetBoundary>
      </Container>
    </>
  );
};

export default Home;

const queryClient = new QueryClient();

export const getStaticProps: GetStaticProps = async () => {
  await Promise.all([
    queryClient.prefetchQuery(queries.home.magazine(), () =>
      serverFetcher(`${process.env.NEXT_PUBLIC_SERVER_URL}/supercar/v1/main`, {
        method: 'GET',
        query: {
          category: 'magazine',
        },
      }).then((res) => {
        const { ok, status, ...rest } = res;
        return rest;
      })
    ),
    queryClient.prefetchQuery(queries.home.best(), () =>
      serverFetcher(`${process.env.NEXT_PUBLIC_SERVER_URL}/supercar/v1/main`, {
        method: 'GET',
        query: {
          category: 'interestProduct',
        },
      }).then((res) => {
        const { ok, status, ...rest } = res;
        return rest;
      })
    ),
    queryClient.prefetchQuery(queries.home.new(), () =>
      serverFetcher(`${process.env.NEXT_PUBLIC_SERVER_URL}/supercar/v1/main`, {
        method: 'GET',
        query: {
          category: 'latestProduct',
        },
      }).then((res) => {
        const { ok, status, ...rest } = res;
        return rest;
      })
    ),
    queryClient.prefetchQuery(queries.home.community(), () =>
      serverFetcher(`${process.env.NEXT_PUBLIC_SERVER_URL}/supercar/v1/main`, {
        method: 'GET',
        query: {
          category: 'community',
        },
      }).then((res) => {
        const { ok, status, ...rest } = res;
        return rest;
      })
    ),
  ]);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 60,
  };
};

Home.Layout = Layout;
