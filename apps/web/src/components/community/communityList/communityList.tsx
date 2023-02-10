import Container from 'components/common/container';
import Pagination from 'components/common/pagination';
import Table from 'components/common/table';
import useUrlQuery from 'hooks/useUrlQuery';

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
