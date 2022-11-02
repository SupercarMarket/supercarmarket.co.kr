import { dehydrate, QueryClient } from '@tanstack/react-query';
import Container from 'components/common/container';
import layout from 'components/layout';
import MarketCarKind from 'components/market/market-car-kind/market-car-kind';
import MarketFilter from 'components/market/market-filter/market-filter';
import MarketList from 'components/market/market-list';
import { CATEGORY_VALUES } from 'constants/market';
import queries from 'constants/queries';
import useMarket from 'hooks/queries/useMarket';
import { NextPageContext } from 'next/types';
import React, { useState } from 'react';
import { FilterType } from 'types/market';

interface MarketFilterPageProps {
  kind: string;
}

const MarketFilterPage = ({ kind }: MarketFilterPageProps) => {
  const { data: markets } = useMarket();
  const [filterList, setFilterList] = useState<FilterType[]>([]);
  const changeFilters = (f: FilterType[]) => {
    setFilterList(f);
  };

  return (
    <Container
      display="flex"
      flexDirection="column"
      alignItems="center"
      margin="20px 0 0 0"
    >
      <div style={{ width: '1200px' }}>
        <MarketCarKind kind={kind} />
        <MarketFilter filterList={filterList} changeFilters={changeFilters} />
        {markets && <MarketList data={markets} />}
      </div>
    </Container>
  );
};

MarketFilterPage.Layout = layout;

const queryClient = new QueryClient();

export const getServerSideProps = async (ctx: NextPageContext) => {
  const { kind } = ctx.query;

  if (!kind || !CATEGORY_VALUES.includes(kind as string)) {
    return {
      redirect: {
        destination: '/market/all',
        permanent: false,
      },
    };
  }

  queryClient.prefetchQuery(queries.market.lists(), () =>
    fetch('http://localhost:3000/api/magazine', {
      method: 'GET',
    }).then((res) => res.json())
  );

  return {
    props: {
      kind,
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default MarketFilterPage;
