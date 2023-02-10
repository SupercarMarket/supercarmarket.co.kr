import Container from 'components/common/container';
import Pagination from 'components/common/pagination';
import Searchbar from 'components/common/searchbar';
import useMagazine from 'hooks/queries/useMagazine';
import useUrlQuery from 'hooks/useUrlQuery';

import MagazineCard from './magazineCard';
import * as Styled from './magazineList.styled';

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
          <Styled.CardPack>
            {magazine.data.map((m) => (
              <MagazineCard key={m.id} {...m} />
            ))}
          </Styled.CardPack>
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
