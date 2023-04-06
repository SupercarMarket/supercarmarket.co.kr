import { PaginationResponse } from '@supercarmarket/types/base';
import type { MagazineDto } from '@supercarmarket/types/magazine';
import {
  Alert,
  applyMediaQuery,
  Container,
  Pagination,
  Wrapper,
} from '@supercarmarket/ui';
import MagazineCard from 'components/magazine/magazineCard/magazineCard';
import { css } from 'styled-components';

type SearchMagazineProps = PaginationResponse<MagazineDto[]>;

const SearchMagazine = ({
  data,
  totalCount,
  totalPages,
}: SearchMagazineProps) => {
  const isMagazine = data && data.length > 0;

  return (
    <Container display="flex" flexDirection="column" width="100%" gap="80px">
      {isMagazine ? (
        <Wrapper
          css={css`
            display: grid;
            grid-template-columns: 1fr 1fr 1fr 1fr;
            gap: 20px;
            padding-top: 30px;

            ${applyMediaQuery('tablet')} {
              grid-template-columns: 1fr 1fr 1fr;
            }

            ${applyMediaQuery('mobile')} {
              grid-template-columns: 1fr 1fr;
              column-gap: 8px;
              row-gap: 16px;
            }
          `}
        >
          {data.map((m) => (
            <MagazineCard key={m.id} type="small" {...m} />
          ))}
        </Wrapper>
      ) : (
        <Wrapper
          css={css`
            display: flex;
            flex-direction: column;
            padding-top: 80px;
          `}
        >
          <Alert severity="info" title="검색 결과가 존재하지 않습니다." />
        </Wrapper>
      )}
      <Pagination
        pageSize={20}
        totalCount={totalCount}
        totalPages={totalPages}
      />
    </Container>
  );
};

export default SearchMagazine;
