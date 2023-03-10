import type { CommunityDto } from '@supercarmarket/types/community';
import {
  Alert,
  Container,
  Pagination,
  Table,
  Wrapper,
} from '@supercarmarket/ui';
import { CommunityCard } from 'components/community';
import { css } from 'styled-components';

interface SearchAllProps {
  data: CommunityDto[];
}

const SearchCommunity = ({ data }: SearchAllProps) => {
  const isPaparazzi = data && data.length > 0;

  return (
    <Container width="100%" display="flex" flexDirection="column" gap="80px">
      <Wrapper
        css={css`
          width: 100%;
          padding-top: 20px;
          display: flex;
          flex-direction: column;
          gap: 6px;
        `}
      >
        <Table tab="product" hidden={false} />
        {isPaparazzi ? (
          data.map((m) => <CommunityCard key={m.id} variant="row" {...m} />)
        ) : (
          <Alert severity="info" title="검색 결과가 존재하지 않습니다." />
        )}
      </Wrapper>
      <Pagination pageSize={20} totalCount={4} totalPages={1} />
    </Container>
  );
};

export default SearchCommunity;
