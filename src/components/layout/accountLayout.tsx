import { AccountNavbar } from 'components/account';
import Container from 'components/common/container';
import type { AccountRoute } from 'constants/account';
import { PropsWithChildren } from 'react';

import Layout from './layout';

interface AccountLayoutProps extends PropsWithChildren {
  user: string;
  profileSrc: string;
  backgroundSrc: string;
  isMyAccountPage: boolean;
  accountRoutes: AccountRoute[];
}

const AccountLayout = (props: AccountLayoutProps) => {
  const { children, isMyAccountPage, accountRoutes } = props;

  return (
    <Layout>
      <Container>
        <h1></h1>
      </Container>
      <AccountNavbar accountRoutes={accountRoutes} />
      {children}
    </Layout>
  );
};

export default AccountLayout;
