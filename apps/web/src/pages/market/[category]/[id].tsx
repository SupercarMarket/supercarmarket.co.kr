import { Searchbar, Tab, Wrapper } from '@supercarmarket/ui';
import type { NextPageWithLayout, Params } from '@supercarmarket/types/base';
import {
  dehydrate,
  QueryClient,
  QueryErrorResetBoundary,
} from '@tanstack/react-query';
import layout from 'components/layout';
import MarketContents from 'components/market/marketContents';
import queries from 'constants/queries';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import * as React from 'react';
import { css } from 'styled-components';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from 'components/fallback';
import { serverFetcher } from '@supercarmarket/lib';

const makeQuery = (query: Params) =>
  Object.entries(query)
    .map(([key, value]) => `${key}=${value}`)
    .join('&');

const MarketDetailPage: NextPageWithLayout = ({
  id,
  category,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { push, query } = useRouter();
  const keywordRef = React.useRef<HTMLInputElement>(null);

  const keydownHandler = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && keywordRef.current !== null) {
      delete query.id;

      query.keyword = keywordRef.current.value;
      keywordRef.current.value = '';

      const queryString = makeQuery(query as Params);

      push(`/market/${query.category}?${queryString}`);
    }
  };

  return (
    <Wrapper
      css={css`
        width: 1200px;
        display: flex;
        flex-direction: column;
        margin: 20px 0 0 0;
      `}
    >
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <>
            <ErrorBoundary
              onReset={reset}
              fallbackRender={(props) => <ErrorFallback {...props} />}
            >
              <MarketContents id={id} />
            </ErrorBoundary>
            <Wrapper
              css={css`
                width: 100%;
                margin-bottom: 36px;
              `}
            >
              <Tab list={`/market/${category}`} scroll />
            </Wrapper>
            <Wrapper
              css={css`
                display: flex;
                align-items: center;
                justify-content: center;
                margin-bottom: 160px;
              `}
            >
              <Searchbar
                variant="Line"
                width="540px"
                placeholder="검색어를 입력하세요"
                onKeyDown={keydownHandler}
                ref={keywordRef}
              />
            </Wrapper>
          </>
        )}
      </QueryErrorResetBoundary>
    </Wrapper>
  );
};

MarketDetailPage.Layout = layout;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { id, category = 'sports-car' } = ctx.query as Params;
  const queryClient = new QueryClient();

  queryClient.prefetchQuery(queries.market.detail(id), () =>
    serverFetcher(`${process.env.NEXT_PUBLIC_SERVER_URL}/supercar/v1/shop`, {
      method: 'GET',
      params: id,
    }).then((res) => {
      const { ok, status, ...rest } = res;
      return rest;
    })
  );

  return {
    props: {
      id,
      category,
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default MarketDetailPage;
