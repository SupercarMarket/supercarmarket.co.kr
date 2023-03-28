import { useUrlQuery } from '@supercarmarket/hooks';
import { type SearchAll as SearchAllType } from '@supercarmarket/types/search';
import { Category, Container } from '@supercarmarket/ui';
import { useSearch } from 'http/server/search';
import { SearchAll, SearchCommunity, SearchMagazine, SearchMarket } from '..';
import SearchNotify from '../searchNotify';

const searchLinks = (keyword: string) => [
  {
    title: '전체',
    href: {
      pathname: '/search',
      query: {
        category: 'all',
        keyword,
      },
    },
    category: 'all',
  },
  {
    title: '매장',
    href: {
      pathname: '/search',
      query: {
        category: 'product',
        filter: 'created_date',
        orderBy: 'DESC',
        keyword,
      },
    },
    category: 'product',
  },
  {
    title: '슈마매거진',
    href: {
      pathname: '/search',
      query: {
        category: 'magazine',
        keyword,
      },
    },
    category: 'magazine',
  },
  {
    title: '커뮤니티',
    href: {
      pathname: '/search',
      query: {
        category: 'community',
        keyword,
      },
    },
    category: 'community',
  },
];

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
          <Category category={category} links={searchLinks(keyword)} />
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
