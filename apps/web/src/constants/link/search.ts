export const links = (keyword: string) => [
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
  {
    title: '제휴업체',
    href: {
      pathname: '/search',
      query: {
        category: 'partnership',
        keyword,
      },
    },
    category: 'partnership',
  },
];
