import { AccountCategory, AccountNavbar, Profile } from 'components/account';
import Container from 'components/common/container';
import Wrapper from 'components/common/wrapper';
import AccountLayout from 'components/layout/accountLayout';
import * as style from 'components/layout/layout.styled';
import type { AccountTab } from 'constants/account';
import account from 'constants/account';
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next';
import type { Session } from 'next-auth';
import type { Params } from 'types/base';
import { getSession } from 'utils/api/auth/user';

type AccountParams = Params & {
  tab: AccountTab | null;
};

const Account = ({
  isMyAccountPage,
  accountRoutes,
  tab,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <Container margin="20px 0 0 0">
      <Profile isMyAccountPage={isMyAccountPage} />
      <Wrapper css={style.account}>
        <AccountNavbar tab={tab} accountRoutes={accountRoutes} />
        <AccountCategory tab={tab} />
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
    (!tab || !(tab === 'my-post' || tab === 'my-commented-post'))
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
      },
    };

  return {
    notFound: true,
  };
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
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
