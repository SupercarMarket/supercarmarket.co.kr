import { type PageProps } from 'pages/_app';
import Footer from './footer/footer';
import Header from './header';
import * as Styled from './layout.styled';
import Navbar from './navbar';
import Toggle from './toggle';

interface LayoutProps extends PageProps {
  children?: React.ReactNode;
}

const Layout = ({ children, ...rest }: LayoutProps) => {
  return (
    <>
      <Styled.Container>
        <Header />
        <Navbar />
        <main role="main">{children}</main>
      </Styled.Container>
      <Footer />
      <Toggle />
    </>
  );
};

export default Layout;
