import { useUrlQuery } from '@supercarmarket/hooks';
import type { SearchAll as SearchAllType } from '@supercarmarket/types/search';
import { Container } from '@supercarmarket/ui';
import { useSearch } from 'utils/api/search';
import {
  SearchAll,
  SearchCommunity,
  SearchMagazine,
  SearchMarket,
  SearchNavbar,
} from '..';
import SearchNotify from '../searchNotify';

interface SearchListProps {
  keyword: string;
}

const SearchList = (props: SearchListProps) => {
  const { keyword } = props;
  const { category = 'all', keyword: _keyword, filter, page } = useUrlQuery();
  const { data } = useSearch(
    {
      keyword: keyword ?? _keyword,
      filter: filter,
      category: category,
      page,
    },
    {
      staleTime: 1000 * 60,
    }
  );

  return (
    <Container>
      {data && (
        <>
          <SearchNotify keyword={keyword} totalCount={data.totalCount} />
          <SearchNavbar keyword={keyword} category={category} />
          {
            {
              all: (
                <SearchAll
                  keyword={keyword}
                  data={data.data as SearchAllType}
                />
              ),
              product: <SearchMarket {...data} />,
              community: <SearchCommunity {...data} />,
              magazine: <SearchMagazine {...data} />,
            }[category]
          }
        </>
      )}
    </Container>
  );
};

export default SearchList;
