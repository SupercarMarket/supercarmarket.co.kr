import * as React from 'react';
import {
  Alert,
  applyMediaQuery,
  Container,
  Pagination,
  Searchbar,
  Wrapper,
} from '@supercarmarket/ui';
import Link from 'next/link';
import { useUrlQuery } from '@supercarmarket/hooks';
import { useRouter } from 'next/navigation';
import MagazineCard from '../magazineCard';
import { css } from 'styled-components';
import { useMagazine } from 'http/server/magazine';
import MagazineBanner from '../magazineBanner';

const MagazineList = () => {
  const { page = 0, keyword } = useUrlQuery();
  const { data: magazine } = useMagazine({ page, keyword });
  const { push } = useRouter();
  const isMagazine = magazine && magazine.data.length > 0;
  // const newMagainze = React.useMemo(() => {
  //   if (isMagazine) return magazine.data[0];
  //   return null;
  // }, []);

  return (
    <Container display="flex" flexDirection="column" alignItems="center">
      {isMagazine ? (
        <>
          <Link
            href={`/magazine/${magazine.data[0].id}`}
            style={{
              cursor: 'pointer',
            }}
          >
            <MagazineBanner initialData={magazine.data[0]} />
          </Link>

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
              handleClick={(query) => {
                if (query.length <= 1) return;
                push(`/magazine?keyword=${query}`);
              }}
            />
          </Wrapper>
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
            {magazine.data.map((m, idx) => {
              if (idx === 0 && typeof keyword === 'undefined') {
                return null;
              }
              return <MagazineCard key={m.id} {...m} />;
            })}
          </Wrapper>
          <Pagination
            pageSize={magazine.pageSize}
            totalCount={magazine.totalCount}
            totalPages={magazine.totalPages}
          />
        </>
      ) : (
        <Wrapper
          css={css`
            width: 100%;
            margin-top: 80px;
            ${applyMediaQuery('mobile')} {
              margin-top: 32px;
            }
          `}
        >
          <Alert severity="info" title="매거진이 존재하지 않습니다." />
        </Wrapper>
      )}
    </Container>
  );
};

export default MagazineList;
