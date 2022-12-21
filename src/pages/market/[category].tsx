import { dehydrate, QueryClient } from '@tanstack/react-query';
import Container from 'components/common/container';
import Searchbar from 'components/common/searchbar';
import layout from 'components/layout';
import MarketBanner from 'components/market/marketBanner';
import MarketCarKind from 'components/market/marketCarCategory';
import MarketCarList from 'components/market/marketCarList';
import MarketFilter from 'components/market/marketFilter';
import { CATEGORY_VALUES } from 'constants/market';
import queries from 'constants/queries';
import useMarket from 'hooks/queries/useMarket';
import { useRouter } from 'next/router';
import { NextPageContext } from 'next/types';
import React, { useMemo } from 'react';
import { makeQuery } from 'utils/market/marketFilter';

const MarketFilterPage = () => {
  const { query } = useRouter();
  const page = useMemo(
    () => (query.page && query.page ? +query.page : 0),
    [query.page]
  );

  const { data: markets } = useMarket(
    makeQuery(query as { [key: string]: string }),
    { keepPreviousData: true }
  );

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
        />
      </Container>
      <MarketCarKind />
      <MarketFilter />
      {markets && <MarketCarList data={markets} page={page} />}
    </Container>
  );
};

MarketFilterPage.Layout = layout;

const queryClient = new QueryClient();

export const getServerSideProps = async (ctx: NextPageContext) => {
  const { category } = ctx.query;

  if (!category || !CATEGORY_VALUES.includes(category as string))
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
