import clsx from 'clsx';
import Typography from 'components/common/typography';
import { useRouter } from 'next/router';
import { memo, useState } from 'react';

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

const NavLink = memo(function NavLink({ title, subMenu, link }: NavbarLinks) {
  const [active, setActive] = useState<boolean>(false);
  const { pathname } = useRouter();
  return (
    <div
      className={clsx('navlink')}
      onMouseOver={() => setActive(true)}
      onMouseOut={() => setActive(false)}
    >
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
      <Styled.Divider data-active={pathname.includes(link)} />
      <NavbarItem subMenu={subMenu} link={link} active={active} />
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
