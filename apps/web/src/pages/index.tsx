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
import { GetStaticProps } from 'next';
import * as React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import HeadSeo from 'components/common/headSeo';
import { APP_NAME } from 'constants/core';
import { css } from 'styled-components';
import Advertisement from 'components/common/advertisement';
import { prefetchBanner, prefetchHome, QUERY_KEYS } from 'http/server/home';
import Banner from 'components/home/banner';

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
              <ErrorBoundary
                onReset={reset}
                fallbackRender={(props) => <ErrorFallback {...props} />}
              >
                <Wrapper.Item
                  css={css`
                    width: 100vw;
                    margin-left: calc(-50vw + 50%);
                  `}
                >
                  <Banner />
                </Wrapper.Item>
              </ErrorBoundary>
              <Advertisement hidden />
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
    queryClient.prefetchQuery(QUERY_KEYS.banner(), () => prefetchBanner('D')),
    queryClient.prefetchQuery(QUERY_KEYS.magazine(), () =>
      prefetchHome('magazine')
    ),
    queryClient.prefetchQuery(QUERY_KEYS.best(), () => prefetchHome('best')),
    queryClient.prefetchQuery(QUERY_KEYS.new(), () => prefetchHome('new')),
    queryClient.prefetchQuery(QUERY_KEYS.community(), () =>
      prefetchHome('community')
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
