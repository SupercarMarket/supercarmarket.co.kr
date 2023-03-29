import {
  Alert,
  applyMediaQuery,
  Container,
  Pagination,
  Searchbar,
  Wrapper,
} from '@supercarmarket/ui';
import { useUrlQuery } from '@supercarmarket/hooks';
import { useRouter } from 'next/navigation';
import MagazineCard from './magazineCard';
import { css } from 'styled-components';
import { useMagazine } from 'http/server/magazine';
import MagazineBanner from '../magazineBanner';

const MagazineList = () => {
  const { page = 0, keyword } = useUrlQuery();
  const { data: magazine } = useMagazine({ page, keyword });
  const { push } = useRouter();

  return (
    <Container display="flex" flexDirection="column" alignItems="center">
      <MagazineBanner initialData={magazine} />
      <Wrapper
        css={css`
          width: 880px;
          margin-top: 80px;
          ${applyMediaQuery('mobile')} {
            width: 100%;
            margin-top: 32px;
          }
        `}
      >
        <Searchbar
          variant="Line"
          border="normal"
          placeholder="검색어를 입력해주세요."
          handleClick={(query) => push(`/magazine?keyword=${query}`)}
        />
      </Wrapper>
      {magazine ? (
        <>
          <Wrapper
            css={css`
              margin: 80px 0;
              width: 100%;
              display: grid;
              grid-template-columns: 1fr 1fr 1fr;
              row-gap: 40px;
              column-gap: 19.5px;

              ${applyMediaQuery('mobile')} {
                margin-top: 32px;
                column-gap: 8px;
                row-gap: 16px;
                grid-template-columns: 1fr 1fr;
              }
            `}
          >
            {magazine.data.map((m) => (
              <MagazineCard key={m.id} {...m} />
            ))}
          </Wrapper>
          <Pagination
            pageSize={magazine.pageSize}
            totalCount={magazine.totalCount}
            totalPages={magazine.totalPages}
          />
        </>
      ) : (
        <Alert severity="info" title="매거진이 존재하지 않습니다." />
      )}
    </Container>
  );
};

export default MagazineList;
