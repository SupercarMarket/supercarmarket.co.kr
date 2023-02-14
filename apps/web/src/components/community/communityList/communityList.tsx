import { Container, Pagination, Table } from '@supercarmarket/ui';
import { useUrlQuery } from '@supercarmarket/hooks';
import useCommunity from 'hooks/queries/useCommunity';

const CommunityList = () => {
  const { variant, category, page, popular, searchType } = useUrlQuery();
  const { data } = useCommunity({
    category: category || 'report',
    page,
    filter: popular === 'true' ? 'popular' : null,
    searchType: searchType ?? null,
  });

  return (
    <Container>
      <Table tab="community" hidden={false} />
      <Pagination pageSize={12} totalCount={1} totalPages={1} />
    </Container>
  );
};

export default CommunityList;
