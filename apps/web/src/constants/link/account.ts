export type AccountCategory =
  | 'dealer-product'
  | 'product'
  | 'magazine'
  | 'inquiry'
  | 'community'
  | 'comment';

export const accountCategory = [
  'dealer-product',
  'product',
  'magazine',
  'inquiry',
  'community',
  'comment',
];

export const links = {
  myAccount: (sub: string) => [
    {
      title: '스크랩 매물',
      href: {
        pathname: `/account/${sub}`,
        query: {
          tab: 'product',
        },
      },
      category: 'product',
    },
    {
      title: '스크랩 글',
      href: {
        pathname: `/account/${sub}`,
        query: {
          tab: 'magazine',
        },
      },
      category: 'magazine',
    },
    ...links.someoneAccount(sub),
    {
      title: '문의신청내역',
      href: {
        pathname: `/account/${sub}`,
        query: {
          tab: 'inquiry',
        },
      },
      category: 'inquiry',
    },
  ],
  someoneAccount: (sub: string) => [
    {
      title: '작성한 글',
      href: {
        pathname: `/account/${sub}`,
        query: {
          tab: 'community',
        },
      },
      category: 'community',
    },
    {
      title: '댓글단 글',
      href: {
        pathname: `/account/${sub}`,
        query: {
          tab: 'comment',
        },
      },
      category: 'comment',
    },
  ],
  dealerAccount: (sub: string) => [
    {
      title: '업로드 매물',
      href: {
        pathname: `/account/${sub}`,
        query: {
          tab: 'dealer-product',
        },
      },
      category: 'dealer-product',
    },
    ...links.myAccount(sub),
  ],
};
