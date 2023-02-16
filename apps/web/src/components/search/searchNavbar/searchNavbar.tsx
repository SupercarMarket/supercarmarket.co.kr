import Link from 'next/link';
import { Button, Container, Wrapper } from '@supercarmarket/ui';
import type { UrlObject } from 'url';
import { Params } from '@supercarmarket/types/base';
import { css } from 'styled-components';

interface SearchNavbarProps {
  category: string;
  keyword: string;
}

interface SearchNavbarItemProps {
  title: string;
  href: UrlObject;
  keyword: string;
  category: string;
}

const searchLinks: Pick<SearchNavbarItemProps, 'href' | 'title'>[] = [
  {
    title: '전체',
    href: {
      pathname: '/search',
      query: {
        category: 'null',
      },
    },
  },
  {
    title: '매장',
    href: {
      pathname: '/search',
      query: {
        category: 'product',
        filter: 'created_date',
        orderBy: 'DESC',
      },
    },
  },
  {
    title: '슈마매거진',
    href: {
      pathname: '/search',
      query: {
        category: 'magazine',
      },
    },
  },
  {
    title: '커뮤니티',
    href: {
      pathname: '/search',
      query: {
        category: 'paparazzi',
      },
    },
  },
];

const SearchNavbarItem = ({
  title,
  href,
  keyword,
  category,
}: SearchNavbarItemProps) => {
  const query = href.query as Params;
  const isCurrentCategory = category === query.category;

  return (
    <Link
      href={{
        pathname: href.pathname,
        query: {
          ...query,
          keyword,
        },
      }}
    >
      <Button variant={isCurrentCategory ? 'Primary' : 'Line'} border="rounded">
        {title}
      </Button>
    </Link>
  );
};

const SearchNavbar = ({ keyword, category }: SearchNavbarProps) => {
  return (
    <Container>
      <Wrapper
        css={css`
          width: 100%;
          display: flex;
          gap: 9px;
        `}
      >
        {searchLinks.map((link) => (
          <SearchNavbarItem
            key={link.title}
            keyword={keyword}
            category={category}
            {...link}
          />
        ))}
      </Wrapper>
    </Container>
  );
};

export default SearchNavbar;
