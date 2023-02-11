import { AccountCategory, AccountNavbar, Profile } from 'components/account';
import Container from 'components/common/container';
import Wrapper from 'components/common/wrapper';
import AccountLayout from 'components/layout/accountLayout';
import * as style from 'components/layout/layout.styled';
import type { AccountTab } from 'constants/account';
import account from 'constants/account';
import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next';
import type { Session } from 'next-auth';
import type { Profile as ProfileType } from 'types/account';
import type { Params } from 'types/base';
import { NextPageWithLayout } from 'types/base';
import { getSession } from 'utils/api/auth/user';
import { BaseApiHandlerResponse, serverFetcher } from 'utils/api/fetcher';

type AccountParams = Params & {
  tab: AccountTab | null;
};

const Account: NextPageWithLayout = ({
  isMyAccountPage,
  accountRoutes,
  tab,
  sub,
  profile,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <Container margin="20px 0 0 0">
      <Profile isMyAccountPage={isMyAccountPage} profile={profile} />
      <Wrapper css={style.account}>
        <AccountNavbar tab={tab} accountRoutes={accountRoutes} />
        <AccountCategory
          sub={sub}
          tab={tab}
          isMyAccountPage={isMyAccountPage}
        />
      </Wrapper>
    </Container>
  );
};

Account.Layout = AccountLayout;

export const getUserPageProps = async (
  ctx: GetServerSidePropsContext,
  session: Session
) => {
  const { query } = ctx;
  const { sub, tab } = query as AccountParams;
  const isMyAccountPage = session.sub === sub;
  const isCorrectTab = tab && account.accountTab.includes(tab);
  const accountRoutes = isMyAccountPage
    ? account.accountRoutes.myAccount(sub)
    : account.accountRoutes.someoneAccount(sub);

  const user: BaseApiHandlerResponse<{ data: ProfileType }> =
    await serverFetcher(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/supercar/v1/userpage`,
      {
        method: 'GET',
        headers: {
          ACCESS_TOKEN: session.accessToken,
        },
        query: {
          id: session.sub,
        },
      }
    );

  if (!user.ok) {
    return {
      notFound: true,
    };
  }

  /**
   * 타유저인 경우 작성글과 댓글단 글만 볼 수 있다.
   * 이에 따라 쿼리 접근 제한 처리
   */
  if (isMyAccountPage && !isCorrectTab) {
    return {
      redirect: {
        destination: `/account/${sub}?tab=${account.accountTab[0]}`,
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
        destination: `/account/${sub}?tab=${account.accountTab[3]}`,
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

  if (!session)
    return {
      redirect: {
        destination: '/auth/signin',
        permanent: false,
      },
    };

  return await getUserPageProps(ctx, session);
};

export default Account;