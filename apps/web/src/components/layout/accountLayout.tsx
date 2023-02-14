import { Container, Wrapper } from '@supercarmarket/ui';
import type { AccountRoute } from 'constants/account';
import { PropsWithChildren } from 'react';

import Header from './header';
import { navlinks } from './layout';
import * as style from './layout.styled';
import Navbar from './navbar';

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
    <Container padding="1.25rem 0 0 0">
      <Wrapper css={style.account}>
        <Header />
        <Navbar navlinks={navlinks} />
      </Wrapper>
      <Wrapper>{children}</Wrapper>
    </Container>
  );
};

export default AccountLayout;
