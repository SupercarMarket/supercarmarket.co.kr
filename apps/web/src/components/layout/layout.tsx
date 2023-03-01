import type { Links } from '@supercarmarket/types/base';
import Footer from './footer/footer';
import Header from './header';
import * as Styled from './layout.styled';
import Navbar from './navbar';
import Toggle from './toggle';

interface LayoutProps {
  children?: React.ReactNode;
}

export const navlinks: Links[] = [
  {
    title: '매장',
    href: 'market',
    children: [
      {
        title: '스포츠카',
        href: 'sports-car',
      },
      {
        title: '세단',
        href: 'saloon',
      },
      {
        title: 'SUV',
        href: 'suv',
      },
      {
        title: '픽업트럭',
        href: 'pickup-truck',
      },
      {
        title: '클래식카&올드카',
        href: 'classic-car',
      },
    ],
  },
  {
    title: '슈마매거진',
    href: 'magazine',
  },
  {
    title: '커뮤니티',
    href: 'community',
    children: [
      {
        title: '파파라치',
        href: 'paparazzi?category=report',
      },
      {
        title: '자료실',
        href: 'library?category=information',
      },
    ],
  },
  {
    title: '제휴업체',
    href: 'partnership',
    children: [
      {
        title: '자동차매장',
        href: 'automobile-store',
      },
      {
        title: '공업사',
        href: 'industries',
      },
      {
        title: '디테일링',
        href: 'detailing',
      },
      {
        title: '도색',
        href: 'painting',
      },
      {
        title: '기타',
        href: 'misc',
      },
    ],
  },
];

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Styled.Container>
        <Header navlinks={navlinks} />
        <Navbar navlinks={navlinks} />
        <main>{children}</main>
      </Styled.Container>
      <Footer />
      <Toggle />
    </>
  );
};

export default Layout;
