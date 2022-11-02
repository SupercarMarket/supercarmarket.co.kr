import { dehydrate, QueryClient } from '@tanstack/react-query';
import Container from 'components/common/container';
import layout from 'components/layout';
import MarketCarKind from 'components/market/market-car-category/market-car-category';
import MarketFilter from 'components/market/market-filter/market-filter';
import MarketList from 'components/market/market-list';
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
  const { data: markets } = useMarket(
    makeMarketQueries(states, category, +page)
  );

  return (
    <Container
      display="flex"
      flexDirection="column"
      alignItems="center"
      margin="20px 0 0 0"
      position="relative"
    >
      <div style={{ width: '1200px' }}>
        <MarketCarKind category={category} />
        <MarketFilter
          filterList={states.filterList}
          changeFilters={actions.changeFilters}
        />
        {markets && (
          <MarketList
            data={markets}
            states={states}
            actions={actions}
            page={page}
          />
        )}
      </div>
    </Container>
  );
};

MarketFilterPage.Layout = layout;

const queryClient = new QueryClient();

export const getServerSideProps = async (ctx: NextPageContext) => {
  const { category } = ctx.query;

  if (!category || !CATEGORY_VALUES.includes(category as string)) {
    return {
      redirect: {
        destination: '/market/all',
        permanent: false,
      },
    };
  }

  queryClient.prefetchQuery(queries.market.lists([]), () =>
    fetch('http://localhost:3000/api/magazine', {
      method: 'GET',
    }).then((res) => res.json())
  );

  return {
    props: {
      category,
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default MarketFilterPage;
