import Container from 'components/common/container';
import MarketCarKind from 'components/market/market-car-kind/market-car-kind';
import MarketFilter from 'components/market/market-filter/market-filter';
import MarketList from 'components/market/market-list';
import { CATEGORY_VALUES } from 'constants/market';
import { GetStaticPropsContext } from 'next';
import React from 'react';

interface MarketFilterPageProps {
  kind: string;
}

const MarketFilterPage = ({ kind }: MarketFilterPageProps) => {
  return (
    <Container
      display="flex"
      flexDirection="column"
      alignItems="center"
      margin="20px 0 0 0"
    >
      <div style={{ width: '1200px' }}>
        <MarketCarKind kind={kind} />
        <MarketFilter />
        <MarketList />
      </div>
    </Container>
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
