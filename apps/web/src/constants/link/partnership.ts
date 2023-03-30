import { Links } from '.';

export const links = [
  {
    title: '전체',
    href: {
      pathname: '/partnership',
      query: {
        category: 'all',
      },
    },
    category: 'all',
  },
  {
    title: '자동차매장',
    href: {
      pathname: '/partnership',
      query: {
        category: 'dealer_shop',
      },
    },
    category: 'dealer_shop',
  },
  {
    title: '공업사',
    href: {
      pathname: '/partnership',
      query: {
        category: 'car_center',
      },
    },
    category: 'car_center',
  },
  {
    title: '디테일링',
    href: {
      pathname: '/partnership',
      query: {
        category: 'detailing',
      },
    },
    category: 'detailing',
  },
  {
    title: '도색',
    href: {
      pathname: '/partnership',
      query: {
        category: 'painting',
      },
    },
    category: 'painting',
  },
  {
    title: '기타',
    href: {
      pathname: '/partnership',
      query: {
        category: 'etc',
      },
    },
    category: 'etc',
  },
] as (Links & { category: string })[];
