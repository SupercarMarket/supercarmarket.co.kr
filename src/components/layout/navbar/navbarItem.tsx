import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { memo } from 'react';

import { NavbarLinks } from './navbar';

const NavbarItem = memo(function NavbarItem({
  subMenu,
  active,
  link,
}: Pick<NavbarLinks, 'subMenu'> & { active: boolean; link: string }) {
  const { pathname } = useRouter();

  return (
    <>
      {subMenu?.length && (
        <ul data-active={active} className={clsx('navbarItem')}>
          {subMenu.map((s) => (
            <Link
              key={s.title}
              style={{
                width: '100%',
              }}
              href={'/' + link + '/' + s.link}
            >
              <li
                data-active={pathname.includes(s.link)}
                className={clsx('navbarItem-li')}
              >
                {s.title}
              </li>
            </Link>
          ))}
        </ul>
      )}
      <style jsx>{`
        .navbarItem {
          box-sizing: border-box;
          position: absolute;
          width: 255px;
          margin-top: 15px;
          border: 1px solid #eaeaec;
          border-radius: 4px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 9999;
        }
        .navbarItem[data-active='false'] {
          display: none;
        }
        .navbarItem-li {
          padding: 11.5px 24px;
          background-color: #fff;
          font-weight: 400;
          font-size: 14px;
          line-height: 150%;
          cursor: pointer;
        }
        .navbarItem-li[data-active='true'] {
          color: #b79f7b;
          background-color: #f7f7f8;
          font-weight: 700;
        }
        .navbarItem-li:hover {
          color: #b79f7b;
          background-color: #f7f7f8;
          font-weight: 700;
        }
      `}</style>
    </>
  );
});

export default NavbarItem;
