import { dehydrate, QueryClient } from '@tanstack/react-query';
import Container from 'components/common/container';
import Searchbar from 'components/common/searchbar';
import layout from 'components/layout';
import MarketBanner from 'components/market/marketBanner';
import MarketCarKind from 'components/market/marketCarCategory';
import MarketList from 'components/market/marketCarList';
import MarketFilter from 'components/market/marketFilter';
import { CATEGORY_VALUES } from 'constants/market';
import queries from 'constants/queries';
import useMarketFilter from 'hooks/market/useMarketFilter';
import useMarket from 'hooks/queries/useMarket';
import { useRouter } from 'next/router';
import { NextPageContext } from 'next/types';
import React, { useMemo } from 'react';
import makeMarketQueries from 'utils/market/makeMarketQuery';

interface MarketFilterPageProps {
  category: string;
}

const MarketFilterPage = ({ category }: MarketFilterPageProps) => {
  const { query } = useRouter();
  const page = useMemo(
    () => (query.page && query.page ? +query.page : 0),
    [query.page]
  );

  const [states, actions] = useMarketFilter();
  // const { data: markets } = useMarket(
  //   makeMarketQueries({ states, category, page }),
  //   { keepPreviousData: true }
  // );

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
      <MarketCarKind category={category} />
      <MarketFilter />
      {/* {markets && (
        <MarketList
          data={markets}
          states={states}
          actions={actions}
          page={page}
        />
      )} */}
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
    fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/supercar/v1/shop?category=슈퍼카`,
      {
        method: 'GET',
      }
    ).then((res) => res.json())
  );

  return {
    props: {
      category,
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default MarketFilterPage;
