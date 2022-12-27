interface AccountRoute {
  title: string;
  route: string;
}

const account = {
  accountRoutes: {
    myAccount: (sub: string) => [
      {
        title: '스크랩 매물',
        route: `/account/${sub}/scraped-sale`,
      },
      {
        title: '스크랩 글',
        route: `/account/${sub}/scraped-post`,
      },
      ...account.accountRoutes.someoneAccount(sub),
      {
        title: '문의신청내역',
        route: `/account/${sub}/my-counseling`,
      },
    ],
    someoneAccount: (sub: string) => [
      {
        title: '작성한 글',
        route: `/account/${sub}/my-post`,
      },
      {
        title: '댓글단 글',
        route: `/account/${sub}/my-commented-post`,
      },
    ],
  },
} as const;

export type { AccountRoute };
export default account;
