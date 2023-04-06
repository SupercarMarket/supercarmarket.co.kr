import { Container, Wrapper } from '@supercarmarket/ui';
import type { Params, NextPageWithLayout } from '@supercarmarket/types/base';
import { AccountCategoryList, Profile } from 'components/account';
import AccountLayout from 'components/layout/accountLayout';
import * as style from 'components/layout/layout.styled';
import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next';
import type { Session } from 'next-auth';
import {
  dehydrate,
  QueryClient,
  QueryErrorResetBoundary,
} from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from 'components/fallback';
import HeadSeo from 'components/common/headSeo/headSeo';
import { prefetchAccount, QUERY_KEYS } from 'http/server/account';
import {
  accountCategory,
  links,
  type AccountCategory,
} from 'constants/link/account';
import { getSession } from 'http/server/next';

type AccountParams = Params & {
  tab: AccountCategory | null;
};

const Account: NextPageWithLayout = ({
  isMyAccountPage,
  accountRoutes,
  tab,
  sub,
  profile,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <>
      <HeadSeo
        title={profile.nickname}
        description={`${profile.nickname}님의 프로필`}
      />
      <Container margin="20px 0 0 0">
        <QueryErrorResetBoundary>
          {({ reset }) => (
            <>
              <ErrorBoundary
                onReset={reset}
                fallbackRender={(props) => <ErrorFallback {...props} />}
              >
                <Profile
                  isMyAccountPage={isMyAccountPage}
                  sub={sub}
                  profile={profile}
                />
              </ErrorBoundary>
              <Wrapper css={style.account}>
                <ErrorBoundary
                  onReset={reset}
                  fallbackRender={(props) => (
                    <ErrorFallback {...props} margin="100px 0" />
                  )}
                >
                  <Wrapper>
                    <AccountCategoryList
                      sub={sub}
                      tab={tab}
                      isMyAccountPage={isMyAccountPage}
                      accountRoutes={accountRoutes}
                      profile={profile}
                    />
                  </Wrapper>
                </ErrorBoundary>
              </Wrapper>
            </>
          )}
        </QueryErrorResetBoundary>
      </Container>
    </>
  );
};

Account.Layout = AccountLayout;

export const getUserPageProps = async (
  ctx: GetServerSidePropsContext,
  session: Session | null
) => {
  const { query } = ctx;
  const { sub, tab } = query as AccountParams;

  const isMyAccountPage = session && session.sub == sub;
  const isCorrectTab = tab && accountCategory.includes(tab);

  const queryClient = new QueryClient();

  const user = await prefetchAccount({ id: sub, token: session?.accessToken });

  if (!user) {
    return {
      notFound: true,
    };
  }

  const accountRoutes = isMyAccountPage
    ? user.data.role == 'user'
      ? links.myAccount(sub)
      : links.dealerAccount(sub)
    : links.someoneAccount(sub);

  await queryClient.prefetchQuery(QUERY_KEYS.id(sub), async () => {
    return user;
  });

  /**
   * 타유저인 경우 작성글과 댓글단 글만 볼 수 있다.
   * 딜러가 아닌 경우 제한 처리
   * 이에 따라 쿼리 접근 제한 처리
   */
  if (isMyAccountPage && !isCorrectTab) {
    return {
      redirect: {
        destination: `/account/${sub}?tab=${accountCategory[1]}`,
        permanent: false,
      },
    };
  }
  if (
    !isMyAccountPage &&
    (!tab || !(tab === 'community' || tab === 'comment'))
  ) {
    return {
      redirect: {
        destination: `/account/${sub}?tab=${accountCategory[4]}`,
        permanent: false,
      },
    };
  }

  if (user.data.role !== 'dealer' && tab === 'dealer-product') {
    return {
      redirect: {
        destination: `/account/${sub}?tab=${accountCategory[1]}`,
        permanent: false,
      },
    };
  }

  if ((isMyAccountPage && isCorrectTab) || (!isMyAccountPage && isCorrectTab))
    return {
      props: {
        isMyAccountPage,
        accountRoutes,
        tab,
        sub,
        profile: user.data,
        dehydratedState: dehydrate(queryClient),
      },
    };

  return {
    notFound: true,
  };
};

export const getServerSideProps: GetServerSideProps = async (
  ctx
): Promise<any> => {
  const { req } = ctx;
  const session = await getSession({ req });

  return await getUserPageProps(ctx, session);
};

export default Account;
