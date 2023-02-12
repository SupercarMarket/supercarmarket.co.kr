import clsx from 'clsx';
import Container from 'components/common/container';
import Typography from 'components/common/typography';
import Wrapper from 'components/common/wrapper';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { memo, useState } from 'react';
import { css } from 'styled-components';

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
        {subMenu ? (
          <Typography
            as="a"
            fontSize="header-16"
            fontWeight="bold"
            lineHeight="120%"
            color="black"
          >
            {title}
          </Typography>
        ) : (
          <Link href={'/' + link}>
            <Typography
              as="span"
              fontSize="header-16"
              fontWeight="bold"
              lineHeight="120%"
              color="black"
            >
              {title}
            </Typography>
          </Link>
        )}
      </button>
      <Wrapper.Item
        data-active={pathname.includes(link)}
        css={css`
          display: none;
          ${pathname.includes(link) && 'display: block'}
          width: 255px;
          height: 3px;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          margin-top: 12px;
          background-color: ${({ theme }) => theme.color['greyScale-6']};
        `}
      />
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
    <Container
      className="navbar"
      width="100%"
      position="relative"
      display="flex"
      alignItems="center"
      justifyContent="space-around"
    >
      {navlinks.map((navlink) => (
        <NavLink key={navlink.title} {...navlink} />
      ))}
    </Container>
  );
};

export default Navbar;
