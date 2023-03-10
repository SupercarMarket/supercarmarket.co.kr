import { useUrlQuery } from '@supercarmarket/hooks';
import { Container, Pagination, Table, Wrapper } from '@supercarmarket/ui';
import useMarket from 'hooks/queries/useMarket';
import { css } from 'styled-components';
import MarketCard from '../marketCard';

interface MarketListProps {
  pagination?: boolean;
}

const MarketList = (props: MarketListProps) => {
  const { pagination = true } = props;

  const query = useUrlQuery();
  const { data: markets } = useMarket(query, { keepPreviousData: true });

  return (
    <Container>
      {markets && (
        <>
          <Wrapper
            css={css`
              width: 100%;
              display: flex;
              flex-direction: column;
              margin-bottom: 80px;
              gap: 13px;
            `}
          >
            {query.variant === 'row' && <Table tab="product" hidden={false} />}
            {markets.data.map((m) => (
              <MarketCard variant={query.variant} key={m.id} {...m} />
            ))}
          </Wrapper>
          {pagination && (
            <Pagination
              pageSize={markets.pageSize}
              totalCount={markets.totalCount}
              totalPages={markets.totalPages}
            />
          )}
        </>
      )}
    </Container>
  );
};

export default MarketList;
