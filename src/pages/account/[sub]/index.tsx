import AccountLayout from 'components/layout/accountLayout';
import account from 'constants/account';
import type { GetServerSideProps, GetServerSidePropsContext } from 'next';
import type { Session } from 'next-auth';
import type { Params } from 'types/base';
import { getSession } from 'utils/api/auth/user';

const Account = () => {
  return (
    <div>
      <h1>Account Page</h1>
    </div>
  );
};

Account.Layout = AccountLayout;

const getUserPageProps = async (
  ctx: GetServerSidePropsContext,
  session: Session
) => {
  const { sub } = ctx.query as Params;
  const isMyAccountPage = session.sub === sub;
  const accountRoutes = isMyAccountPage
    ? account.accountRoutes.myAccount(sub)
    : account.accountRoutes.someoneAccount(sub);

  return {
    props: {
      isMyAccountPage,
      accountRoutes,
    },
  };
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
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
