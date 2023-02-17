import type { MagazineDto } from '@supercarmarket/types/magazine';
import { Alert, applyMediaQuery, Container, Wrapper } from '@supercarmarket/ui';
import MagazineCard from 'components/magazine/magazineList/magazineCard';
import { css } from 'styled-components';

interface SearchAllProps {
  data: MagazineDto[];
}

const SearchMagazine = ({ data }: SearchAllProps) => {
  const isMagazine = data.length > 0;
  return (
    <Container width="100%">
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
    </Container>
  );
};

export default SearchMagazine;
