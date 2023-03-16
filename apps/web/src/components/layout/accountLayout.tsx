import { Container, Wrapper } from '@supercarmarket/ui';
import type { AccountRoute } from 'constants/account';
import { PropsWithChildren } from 'react';
import Footer from './footer';

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
  const { children } = props;

  return (
    <>
      <Container padding="1.25rem 0 85px 0">
        <Wrapper css={style.account}>
          <Header navlinks={navlinks} />
          <Navbar navlinks={navlinks} />
        </Wrapper>
        <Wrapper>{children}</Wrapper>
      </Container>
      <Footer />
    </>
  );
};

export default AccountLayout;
