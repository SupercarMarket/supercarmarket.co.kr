import MarketCarKind from 'components/market/market-car-kind/market-car-kind';
import MarketFilter from 'components/market/market-filter/market-filter';
import { CATEGORY_VALUES } from 'constants/market';
import { GetStaticPropsContext } from 'next';
import React from 'react';

interface MarketFilterPageProps {
  kind: string;
}

const MarketFilterPage = ({ kind }: MarketFilterPageProps) => {
  return (
    <div style={{ width: '1200px' }}>
      <MarketCarKind kind={kind} />
      <MarketFilter />
    </div>
  );
};

export const getStaticPaths = async () => {
  const paths = CATEGORY_VALUES.map((kind) => ({ params: { kind } }));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({
  params,
}: GetStaticPropsContext<{ kind: string }>) => {
  const kind = params?.kind;

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
