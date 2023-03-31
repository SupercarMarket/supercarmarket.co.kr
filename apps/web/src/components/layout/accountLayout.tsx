import { Container, Wrapper } from '@supercarmarket/ui';
import { PropsWithChildren } from 'react';
import Footer from './footer';

import Header from './header';
import * as style from './layout.styled';
import Navbar from './navbar';

interface AccountLayoutProps extends PropsWithChildren {
  user: string;
  profileSrc: string;
  backgroundSrc: string;
  isMyAccountPage: boolean;
}

const AccountLayout = (props: AccountLayoutProps) => {
  const { children } = props;

  return (
    <>
      <Container
        padding="0 0 85px 0"
        style={{
          minHeight: 'calc(100vh - 17.5rem)',
        }}
      >
        <Wrapper css={style.account}>
          <Header />
          <Navbar />
        </Wrapper>
        <Wrapper role="main">{children}</Wrapper>
      </Container>
      <Footer />
    </>
  );
};

export default AccountLayout;
