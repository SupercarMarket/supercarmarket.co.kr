import { Container, Pagination, Table } from '@supercarmarket/ui';
import { useUrlQuery } from '@supercarmarket/hooks';

const CommunityList = () => {
  const { variant } = useUrlQuery();
  return (
    <Container>
      <Table tab="community" hidden={false} />
      <Pagination pageSize={12} totalCount={1} totalPages={1} />
    </Container>
  );
};

export default CommunityList;
