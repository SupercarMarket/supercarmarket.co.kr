import { Container, Pagination, Searchbar, Wrapper } from '@supercarmarket/ui';
import { useUrlQuery } from '@supercarmarket/hooks';
import useMagazine from 'hooks/queries/useMagazine';

import MagazineCard from './magazineCard';
import { css } from 'styled-components';

const MagazineList = () => {
  const { page } = useUrlQuery();
  const { data: magazine } = useMagazine(page);

  return (
    <Container
      display="flex"
      flexDirection="column"
      alignItems="center"
      margin="80px 0"
    >
      <Searchbar width="880px" variant="Line" border="normal" />
      {magazine && (
        <>
          <Wrapper
            css={css`
              margin: 80px 0;
              width: 100%;
              display: grid;
              grid-template-columns: 1fr 1fr 1fr;
              row-gap: 40px;
              column-gap: 19.5px;
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
      )}
    </Container>
  );
};

export default MagazineList;
