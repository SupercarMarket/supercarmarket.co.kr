import Footer from './footer/footer';
import Header from './header';
import * as Styled from './layout.styled';
import Navbar from './navbar';
import type { NavbarLinks } from './navbar/navbar';

interface LayoutProps {
  children?: React.ReactNode;
}

export const navlinks: NavbarLinks[] = [
  {
    title: '매장',
    link: 'market',
    subMenu: [
      {
        title: '스포츠카',
        link: 'sports-car',
      },
      {
        title: '세단',
        link: 'saloon',
      },
      {
        title: 'SUV',
        link: 'suv',
      },
      {
        title: '픽업트럭',
        link: 'pickup-truck',
      },
      {
        title: '클래식카&올드카',
        link: 'classic-car',
      },
    ],
  },
  {
    title: '슈마매거진',
    link: 'magazine',
  },
  {
    title: '커뮤니티',
    link: 'community',
    subMenu: [
      {
        title: '파파라치',
        link: 'paparazzo',
      },
      {
        title: '자료실',
        link: 'reference-room',
      },
    ],
  },
  {
    title: '제휴업체',
    link: 'partnership',
    subMenu: [
      {
        title: '자동차매장',
        link: 'automobile-store',
      },
      {
        title: '공업사',
        link: 'industries',
      },
      {
        title: '디테일링',
        link: 'detail-ring',
      },
      {
        title: '도색',
        link: 'painting',
      },
      {
        title: '기타',
        link: 'misc',
      },
    ],
  },
];

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Styled.Container>
        <Header />
        <Navbar navlinks={navlinks} />
        <main>{children}</main>
      </Styled.Container>
      <Footer />
    </>
  );
};

export default Layout;
