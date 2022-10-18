import clsx from 'clsx';
import Typography from 'components/common/typography';
import { memo } from 'react';
import css from 'styled-jsx/css';

import * as Styled from './navbar.styled';
import NavbarItem from './navbarItem';

export interface NavbarLinks {
  title: string;
  link: string;
  subMenu?: undefined | NavbarLinks[];
}

interface NavbarProps {
  navlinks: NavbarLinks[];
}

const NavLink = memo(function NavLink({ title, subMenu }: NavbarLinks) {
  return (
    <div className={clsx('navlink')}>
      <label htmlFor={title} hidden>
        {title}
      </label>
      <button id={title} className={clsx('navlink-button')}>
        <Typography
          as="a"
          fontSize="header-16"
          fontWeight="bold"
          lineHeight="120%"
          color="black"
        >
          {title}
        </Typography>
      </button>
      <NavbarItem subMenu={subMenu} />
      <style jsx>{`
        .navlink {
          padding-top: 20px;
          padding-bottom: 15px;
          position: relative;
        }
        .navlink-button {
          all: unset;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
});

const Navbar = ({ navlinks }: NavbarProps) => {
  return (
    <Styled.Container>
      {navlinks.map((navlink) => (
        <NavLink key={navlink.title} {...navlink} />
      ))}
    </Styled.Container>
  );
};

export default Navbar;
