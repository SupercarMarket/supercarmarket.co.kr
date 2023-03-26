import { deviceQuery } from '@supercarmarket/ui';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';

import logoSrc from '../../../../public/images/logo.png';

interface LogoProps {
  variant?: 'horizontal' | 'flat';
  className?: string;
}

const Logo = (props: LogoProps) => {
  const { variant = 'horizontal', className } = props;
  return (
    <>
      <Link href="/">
        <div
          className={clsx(
            'logo',
            {
              [`logo-${variant}`]: variant,
            },
            className
          )}
        >
          <Image src={logoSrc} placeholder="blur" alt="로고" fill />
        </div>
      </Link>
      <style jsx>{`
        .logo {
          position: relative;
          width: 231px;
          height: 56px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-sizing: border-box;
        }
        .logo-horizontal {
          flex-direction: row;
        }
        .logo-flat {
          flex-direction: column;
        }
        .logo-icon {
          display: flex;
          align-items: center;
        }
        .logo-text {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 9.27px;
        }
        @media (${deviceQuery.mobile}) {
          .logo {
            width: 115.5px;
            height: 28px;
          }
        }
      `}</style>
    </>
  );
};

export { Logo };
export type { LogoProps };
