import Footer from './footer/footer';
import Header from './header';
import * as Styled from './layout.styled';
import Navbar from './navbar';
import Toggle from './toggle';

interface LayoutProps {
  children?: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
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
