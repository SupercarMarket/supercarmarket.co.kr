'use client';

import { Container, Searchbar } from '@supercarmarket/ui';
import type { NextPageWithLayout, Params } from '@supercarmarket/types/base';
import {
  dehydrate,
  QueryClient,
  QueryErrorResetBoundary,
} from '@tanstack/react-query';
import { ErrorFallback } from 'components/fallback';
import layout from 'components/layout';
import MarketBanner from 'components/market/marketBanner';
import MarketCarKind from 'components/market/marketCarKind';
import MarketCarList from 'components/market/marketCarList';
import MarketFilter from 'components/market/marketFilter';
import { CATEGORY_VALUES } from 'constants/market';
import queries from 'constants/queries';
import useMarket from 'hooks/queries/useMarket';
import useMarketUrlQuery from '@supercarmarket/hooks/useMarketUrlQuery';
import { useRouter } from 'next/router';
import type { NextPageContext } from 'next/types';
import * as React from 'react';
import { ErrorBoundary } from 'react-error-boundary';

const MarketFilterPage: NextPageWithLayout = () => {
  const { push, query } = useRouter();
  const marketQuery = useMarketUrlQuery();
  const keywordRef = React.useRef<HTMLInputElement>(null);

  const { data: markets } = useMarket(marketQuery, { keepPreviousData: true });

  const keydownHandler = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && keywordRef.current !== null) {
      const queries = { ...query };

      queries.keyword = keywordRef.current.value;
      keywordRef.current.value = '';

      const queryString = Object.entries(queries)
        .map(([key, value]) => `${key}=${value}`)
        .join('&');
      push(`/market/${query.category}?${queryString}`);
    }
  };

  return (
    <Container display="flex" flexDirection="column" margin="20px 0 0 0">
      <MarketBanner />
      <Container
        height="212px"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Searchbar
          variant="Line"
          width="880px"
          placeholder="원하는 차량을 검색하세요"
          onKeyDown={keydownHandler}
          ref={keywordRef}
        />
      </Container>
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary
            onReset={reset}
            fallbackRender={(props) => <ErrorFallback {...props} />}
          >
            <MarketCarKind />
            <MarketFilter />
            {markets && (
              <MarketCarList data={markets} page={marketQuery.page} />
            )}
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    </Container>
  );
};

MarketFilterPage.Layout = layout;

const queryClient = new QueryClient();

export const getServerSideProps = async (ctx: NextPageContext) => {
  const { category } = ctx.query as Params;

  if (!category || !CATEGORY_VALUES.includes(category))
    return {
      redirect: {
        destination: '/market/all',
        permanent: false,
      },
    };

  queryClient.prefetchQuery(queries.market.lists([]), () =>
    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/supercar/v1/shop`, {
      method: 'GET',
    }).then((res) => res.json())
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default MarketFilterPage;
