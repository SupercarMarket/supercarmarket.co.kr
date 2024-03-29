import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { Container, Wrapper, Title } from '@supercarmarket/ui';
import type { NextPageWithLayout } from '@supercarmarket/types/base';
import { ErrorFallback } from 'components/fallback';
import Community from 'components/home/community';
import Magazine from 'components/home/magazine';
import { MarketBest, MarketNew } from 'components/home/market';
import Layout from 'components/layout';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import * as React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import HeadSeo from 'components/common/headSeo';
import { isMobile } from 'utils/misc';
import Partnership from 'components/home/partnership';

const Home: NextPageWithLayout = ({
  isMobile,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const marginTop = isMobile ? '40px' : '80px';
  const marginBottom = isMobile ? '16px' : '20px';

  return (
    <>
      <HeadSeo title="슈퍼카마켓" description="안녕하세요 슈퍼카마켓입니다." />
      <Container>
        <QueryErrorResetBoundary>
          {({ reset }) => (
            <Wrapper>
              <Title marginBottom={marginBottom}>슈마매거진</Title>
              <ErrorBoundary
                onReset={reset}
                fallbackRender={(props) => <ErrorFallback {...props} />}
              >
                <Magazine isMobile={isMobile} />
              </ErrorBoundary>
              <Title marginTop={marginTop} marginBottom={marginBottom}>
                매물 관심 베스트
              </Title>
              <ErrorBoundary
                onReset={reset}
                fallbackRender={(props) => <ErrorFallback {...props} />}
              >
                <MarketBest isMobile={isMobile} />
              </ErrorBoundary>
              <Title marginTop={marginTop} marginBottom={marginBottom}>
                최신 매물
              </Title>
              <ErrorBoundary
                onReset={reset}
                fallbackRender={(props) => <ErrorFallback {...props} />}
              >
                <MarketNew isMobile={isMobile} />
              </ErrorBoundary>
              <Title marginTop={marginTop} marginBottom={marginBottom}>
                커뮤니티 인기글
              </Title>
              <ErrorBoundary
                onReset={reset}
                fallbackRender={(props) => <ErrorFallback {...props} />}
              >
                <Community isMobile={isMobile} />
              </ErrorBoundary>
              <Title marginTop={marginTop} marginBottom={marginBottom}>
                제휴업체
              </Title>
              <ErrorBoundary
                onReset={reset}
                fallbackRender={(props) => <ErrorFallback {...props} />}
              >
                <Partnership />
              </ErrorBoundary>
            </Wrapper>
          )}
        </QueryErrorResetBoundary>
      </Container>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { req } = ctx;

  const userAgent = req.headers['user-agent'];

  return {
    props: {
      isMobile: isMobile(userAgent),
    },
  };
};

Home.Layout = Layout;

export default Home;
