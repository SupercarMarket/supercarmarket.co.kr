import Header from './header';
import * as Styled from './layout.styled';
import Navbar from './navbar';
import type { NavbarLinks } from './navbar/navbar';

interface LayoutProps {
  children?: React.ReactNode;
}

const navlinks: NavbarLinks[] = [
  {
    title: '매장',
    link: 'shops',
    subMenu: [
      {
        title: '스포츠카',
        link: '스포츠카',
      },
      {
        title: '세단',
        link: '세단',
      },
      {
        title: 'SUV',
        link: 'SUV',
      },
      {
        title: '픽업트럭',
        link: '픽업트럭',
      },
      {
        title: '클래식카&올드카',
        link: '클래식카&올드카',
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
        link: '파파라치',
      },
      {
        title: '자료실',
        link: '자료실',
      },
    ],
  },
  {
    title: '제휴업체',
    link: 'partnership',
    subMenu: [
      {
        title: '자동차매장',
        link: '자동차매장',
      },
      {
        title: '공업사',
        link: '공업사',
      },
      {
        title: '디테일링',
        link: '디테일링',
      },
      {
        title: '도색',
        link: '도색',
      },
      {
        title: '기타',
        link: '기타',
      },
    ],
  },
];

const Layout = ({ children }: LayoutProps) => {
  return (
    <Styled.Container>
      <Header />
      <Navbar navlinks={navlinks} />
      <Styled.Main>{children}</Styled.Main>
    </Styled.Container>
  );
};

export default Layout;
