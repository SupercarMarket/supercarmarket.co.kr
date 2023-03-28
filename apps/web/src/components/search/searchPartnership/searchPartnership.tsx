import { type PaginationResponse } from '@supercarmarket/types/base';
import { PartnershipDto } from '@supercarmarket/types/partnership';
import {
  Alert,
  Container,
  Pagination,
  Table,
  Wrapper,
} from '@supercarmarket/ui';
import PartnershipCard from 'components/partnership/partnershipCard';
import { css } from 'styled-components';

type SearchPartnershipProps = PaginationResponse<PartnershipDto[]>;

const SearchPartnership = ({
  data,
  totalCount,
  totalPages,
}: SearchPartnershipProps) => {
  const isPartnership = data && data.length > 0;

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
        <Table tab="partnership" hidden={false} />
        {isPartnership ? (
          data.map((p) => <PartnershipCard key={p.brdSeq} {...p} />)
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

export default SearchPartnership;
