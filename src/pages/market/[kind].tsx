import MarketCarKind from 'components/market/market-car-kind/market-car-kind';
import MarketFilter from 'components/market/market-filter/market-filter';
import MarketList from 'components/market/market-list';
import { CATEGORY_VALUES } from 'constants/market';
import { NextPageContext } from 'next';
import React from 'react';

interface MarketFilterPageProps {
  kind: string;
}

const MarketFilterPage = ({ kind }: MarketFilterPageProps) => {
  return (
    <div style={{ width: '1200px' }}>
      <MarketCarKind kind={kind} />
      <MarketFilter />
      <MarketList />
    </div>
  );
};

export const getServerSideProps = (ctx: NextPageContext) => {
  const { kind } = ctx.query;

  if (!kind || !CATEGORY_VALUES.includes(kind as string)) {
    return { notFound: true };
  }

  return {
    props: {
      kind,
    },
  };
};

export default MarketFilterPage;
