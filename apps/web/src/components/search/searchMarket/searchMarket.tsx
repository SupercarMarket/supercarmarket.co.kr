import { PaginationResponse } from '@supercarmarket/types/base';
import type { MarketDto } from '@supercarmarket/types/market';
import {
  Alert,
  Container,
  Pagination,
  Table,
  Wrapper,
} from '@supercarmarket/ui';
import MarketCard from 'components/market/marketCard';
import { css } from 'styled-components';

type SearchMarketProps = PaginationResponse<MarketDto[]>;

const SearchMarket = ({ data, totalCount, totalPages }: SearchMarketProps) => {
  const isProduct = data && data.length > 0;

  return (
    <Container display="flex" flexDirection="column" gap="80px">
      <Wrapper
        css={css`
          padding-top: 20px;
          display: flex;
          flex-direction: column;
          gap: 6px;
        `}
      >
        <Table tab="product" hidden={false} />
        {isProduct ? (
          data.map((m) => <MarketCard key={m.id} variant="row" {...m} />)
        ) : (
          <Alert severity="info" title="검색 결과가 존재하지 않습니다." />
        )}
      </Wrapper>
      <Pagination
        pageSize={20}
        totalCount={totalCount}
        totalPages={totalPages}
      />
    </Container>
  );
};

export default SearchMarket;
