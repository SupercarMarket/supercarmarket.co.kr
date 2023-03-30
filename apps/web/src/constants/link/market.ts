import { Links } from '.';

export const linsk = [
  {
    title: '전체',
    href: {
      pathname: '/market',
      query: {
        category: 'all',
      },
    },
    category: 'all',
  },
  {
    title: '스포츠카',
    href: {
      pathname: '/market',
      query: {
        category: 'sports-car',
      },
    },
    category: 'sports-car',
  },
  {
    title: '세단',
    href: {
      pathname: '/market',
      query: {
        category: 'saloon',
      },
    },
    category: 'saloon',
  },
  {
    title: 'SUV',
    href: {
      pathname: '/market',
      query: {
        category: 'suv',
      },
    },
    category: 'suv',
  },
  {
    title: '픽업트럭',
    href: {
      pathname: '/market',
      query: {
        category: 'pickup-truck',
      },
    },
    category: 'pickup-truck',
  },
  {
    title: '클래식카&올드카',
    href: {
      pathname: '/market',
      query: {
        category: 'classic-car',
      },
    },
    category: 'classic-car',
  },
] as (Links & { category: string })[];
