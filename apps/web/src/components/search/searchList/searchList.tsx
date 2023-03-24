import { useUrlQuery } from '@supercarmarket/hooks';
import type { SearchAll as SearchAllType } from '@supercarmarket/types/search';
import { Container } from '@supercarmarket/ui';
import useSearch from 'hooks/queries/useSearch';
import {
  SearchAll,
  SearchCommunity,
  SearchMagazine,
  SearchMarket,
  SearchNavbar,
} from '..';
import SearchNotify from '../searchNotify';

const SearchList = () => {
  const {
    category = 'null',
    keyword = '',
    orderBy,
    filter,
    page,
  } = useUrlQuery();
  const { data } = useSearch({
    keyword: keyword ?? 'null',
    orderBy: orderBy,
    filter: filter,
    category: category,
    page,
  });

  console.log(data, category);

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
              product: <SearchMarket data={data.data.product} />,
              paparazzi: <SearchCommunity data={data.data.paparazzi} />,
              magazine: <SearchMagazine data={data.data} />,
            }[category]
          }
        </>
      )}
    </Container>
  );
};

export default SearchList;
