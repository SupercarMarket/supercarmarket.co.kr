import { useUrlQuery } from '@supercarmarket/hooks';
import {
  applyMediaQuery,
  Container,
  Pagination,
  Table,
  Wrapper,
} from '@supercarmarket/ui';
import { css } from 'styled-components';
import MarketCard from '../marketCard';
import { useMarket } from 'http/server/market';

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
              flex-wrap: wrap;
              margin-bottom: 80px;
              ${applyMediaQuery('mobile')} {
                column-gap: 8px;
                row-gap: 16px;
              }
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
