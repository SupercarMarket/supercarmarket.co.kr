type AccountTab =
  | 'scraped-sale'
  | 'scraped-post'
  | 'my-counseling'
  | 'my-post'
  | 'my-commented-post';

interface AccountRoute {
  title: string;
  route: string;
}

const account = {
  accountTab: [
    'scraped-sale',
    'scraped-post',
    'my-counseling',
    'my-post',
    'my-commented-post',
  ],
  accountRoutes: {
    myAccount: (sub: string) => [
      {
        title: '스크랩 매물',
        route: `/account/${sub}?tab=scraped-sale`,
      },
      {
        title: '스크랩 글',
        route: `/account/${sub}?tab=scraped-post`,
      },
      ...account.accountRoutes.someoneAccount(sub),
      {
        title: '문의신청내역',
        route: `/account/${sub}?tab=my-counseling`,
      },
    ],
    someoneAccount: (sub: string) => [
      {
        title: '작성한 글',
        route: `/account/${sub}?tab=my-post`,
      },
      {
        title: '댓글단 글',
        route: `/account/${sub}?tab=my-commented-post`,
      },
    ],
  },
} as const;

export type { AccountRoute, AccountTab };
export default account;
