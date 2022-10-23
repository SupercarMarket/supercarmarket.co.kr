import Container from 'components/common/container';
import Pagination from 'components/common/pagination';
import Searchbar from 'components/common/searchbar';
import { useMemo } from 'react';
import {
  MagazineDto,
  MagazineResponse,
  WithBlurredImage,
} from 'types/magazine';

import MagazineCard from './magazineCard';
import * as Styled from './magazineList.styled';

interface MagazineListProps {
  data: MagazineResponse<WithBlurredImage<MagazineDto>>;
  page: number;
}

const MagazineList = ({ data, page }: MagazineListProps) => {
  const magazine = useMemo(() => data.data, [data.data]);

  return (
    <Container
      display="flex"
      flexDirection="column"
      alignItems="center"
      margin="80px 0"
    >
      <Searchbar width="880px" variant="Line" border="normal" />
      <Styled.CardPack>
        {magazine.map((m) => (
          <MagazineCard key={m.id} {...m} />
        ))}
      </Styled.CardPack>
      <Pagination
        page={page}
        pageSize={data.pageSize}
        totalCount={data.totalCount}
        totalPages={data.totalPages}
      />
    </Container>
  );
};

export default MagazineList;
