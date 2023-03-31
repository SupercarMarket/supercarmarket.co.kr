import { Container, Typography, Wrapper } from '@supercarmarket/ui';
import clsx from 'clsx';
import { type Links } from 'constants/link';
import { links } from 'constants/link/navbar';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { memo, useState } from 'react';
import { css } from 'styled-components';

import NavbarItem from './navbarItem';

const NavLink = memo(function NavLink({
  title,
  children: subMenu,
  href: _href,
}: Links) {
  const [active, setActive] = useState<boolean>(false);
  const { pathname } = useRouter();
  const href = _href.toString();
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
        <Link href={'/' + href}>
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
      </button>
      <Wrapper.Item
        data-active={pathname.includes(href)}
        css={css`
          display: none;
          ${pathname.includes(href) && 'display: block;'}
          width: 240px;
          height: 3px;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          margin-top: 12px;
          background-color: ${({ theme }) => theme.color['greyScale-6']};
        `}
      />
      <NavbarItem subMenu={subMenu} href={href} active={active} />
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

const Navbar = () => {
  return (
    <Container
      as="nav"
      role="navigation"
      className="navbar"
      width="100%"
      position="relative"
      display="flex"
      alignItems="center"
      justifyContent="space-around"
    >
      {links.map((navlink) => (
        <NavLink key={navlink.title} {...navlink} />
      ))}
    </Container>
  );
};

export default Navbar;
