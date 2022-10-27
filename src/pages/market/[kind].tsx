import MarketFilter from 'components/market/market-filter/market-filter';
import { NextPageContext } from 'next';
import React from 'react';

interface MarketFilterPageProps {
  kind: string;
}

const MarketFilterPage = ({ kind }: MarketFilterPageProps) => {
  return (
    <div>
      <MarketFilter />
    </div>
  );
};

export const getServerSideProps = (ctx: NextPageContext) => {
  const { kind } = ctx.query;
  const category = [
    'all',
    'sports-car',
    'saloon',
    'suv',
    'pickup-truck',
    'classic-car&old-car',
  ];

  if (!kind || !category.includes(kind as string)) {
    return { notFound: true };
  }

  return {
    props: {
      kind,
    },
  };
};

export default MarketFilterPage;
