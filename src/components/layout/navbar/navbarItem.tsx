import clsx from 'clsx';
import Link from 'components/common/link';
import css from 'styled-jsx/css';

import { NavbarLinks } from './navbar';

const NavbarItem = ({ subMenu }: Pick<NavbarLinks, 'subMenu'>) => {
  return (
    <>
      {subMenu?.length && (
        <ul className={clsx('navbarItem')}>
          {subMenu.map((s) => (
            <li key={s.title} className={clsx('navbarItem-li')}>
              <Link href={s.link}>{s.title}</Link>
            </li>
          ))}
        </ul>
      )}
      <style jsx>{`
        .navbarItem {
          box-sizing: border-box;
          position: absolute;
          width: 255px;
          border: 1px solid #eaeaec;
          border-radius: 4px;
          left: 50%;
          transform: translateX(-50%);
        }
        .navbarItem-li {
          padding: 11.5px 24px;
          background-color: #fff;
          font-weight: 400;
          font-size: 14px;
          line-height: 150%;
        }
        .navbarItem-li:hover {
          color: #b79f7b;
          background-color: #f7f7f8;
          font-weight: 700;
          font-size: 14px;
        }
      `}</style>
    </>
  );
};

export default NavbarItem;
