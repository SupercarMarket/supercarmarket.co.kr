import { type PageProps } from 'pages/_app';
import Footer from './footer/footer';
import Header from './header';
import * as Styled from './layout.styled';
import Navbar from './navbar';
import Toggle from './toggle';
import Advertisements from 'components/common/advertisements';
import { useRecoilState } from 'recoil';
import { layoutPropsRecoil } from 'src/recoil/atom';
import { ModalProvider } from 'feature/ModalProvider';

interface LayoutProps extends PageProps {
  children?: React.ReactNode;
}

const Layout = ({ children, ...rest }: LayoutProps) => {
  const [layoutRecoil] = useRecoilState(layoutPropsRecoil);
  return (
    <>
      <Styled.Container>
        <Header />
        <Navbar />
        <main role="main">
          {layoutRecoil.isFooter && <Advertisements {...rest} />}
          {children}
        </main>
      </Styled.Container>
      {layoutRecoil.isFooter && (
        <ModalProvider>
          <Footer />
        </ModalProvider>
      )}
      {layoutRecoil.isFooter && <Toggle />}
    </>
  );
};

export default Layout;
