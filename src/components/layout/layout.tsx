import Header from './header';
import * as Styled from './layout.styled';

interface LayoutProps {
  children?: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <Styled.Container>
      <Header />
      <Styled.Main>{children}</Styled.Main>
    </Styled.Container>
  );
};

export default Layout;
