import { useUrlQuery } from '@supercarmarket/hooks';
import { type SearchAll as SearchAllType } from '@supercarmarket/types/search';
import { Category, Container } from '@supercarmarket/ui';
import { links } from 'constants/link/search';
import { useSearch } from 'http/server/search';
import {
  SearchAll,
  SearchCommunity,
  SearchMagazine,
  SearchMarket,
  SearchPartnership,
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
          <Category category={category} links={links(keyword)} />
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
              partnership: <SearchPartnership {...data} />,
            }[category]
          }
        </>
      )}
    </Container>
  );
};

export default SearchList;
