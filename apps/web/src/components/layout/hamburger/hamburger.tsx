import * as React from 'react';
import clsx from 'clsx';
import { css } from 'styled-components';
import { theme } from '@supercarmarket/ui/styles';
import { Button } from '@supercarmarket/ui/components/button';
import { Typography } from '@supercarmarket/ui/components/typography';
import { Wrapper } from '@supercarmarket/ui/components/wrapper';
import { Link as SupercarmarketLink } from '@supercarmarket/ui/components/link';
import type { Session } from 'next-auth';
import { Container } from '@supercarmarket/ui/components/container';
import type { Links } from '@supercarmarket/types/base';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

import arrowRightSrc from '../../../../public/images/arrow-right.png';
import closeSrc from '../../../../public/images/close.png';

interface ISession extends Session {
  sub: string;
}

interface HamburgerProps {
  session: ISession | null;
  navlinks: Links[];
  hamburger?: boolean;
  className?: string;
  handleClose: () => void;
  signOut: () => void;
}

const HamburgerLinkItem = React.memo(function HamburgerLinkItem({
  title,
  href,
  children,
  handleClick,
}: Links & {
  handleClick: (href: string) => void;
}) {
  const [drop, setDrop] = React.useState(false);

  function handleShow() {
    setDrop((prev) => !prev);
  }
  return (
    <Container
      as="menu"
      role="menu"
      width="100%"
      display="flex"
      flexDirection="column"
      padding="24px 0"
    >
      <Wrapper.Top
        className={clsx({
          drop: drop,
        })}
        css={css`
          display: flex;
          align-items: center;
          justify-content: space-between;
          & > img {
            transition: all 0.1s ease-in-out;
          }
          &.drop {
            img {
              transform: rotate(0.25turn);
            }
          }
        `}
      >
        <SupercarmarketLink
          href={href}
          disabled={!!children}
          callback={() => handleClick(`/${href}`)}
        >
          <Typography
            as="b"
            fontSize="header-16"
            fontWeight="bold"
            lineHeight="120%"
            color="white"
          >
            {title}
          </Typography>
        </SupercarmarketLink>
        {children && children.length > 0 && (
          <Button type="button" variant="Init" onClick={handleShow}>
            <Image src={arrowRightSrc} alt="arrow" />
          </Button>
        )}
      </Wrapper.Top>
      <Wrapper.Bottom
        className={clsx({
          drop: drop,
        })}
        css={css`
          flex-direction: column;
          gap: 8px;
          padding-top: 16px;
          display: none;
          &.drop {
            display: flex;
          }
        `}
      >
        {children?.map((link) => (
          <Wrapper.Item key={link.title}>
            <SupercarmarketLink
              href={`/${href}/${link.href}`}
              callback={() => handleClick(`/${href}/${link.href}`)}
            >
              <Typography
                fontSize="body-14"
                fontWeight="regular"
                color="greyScale-4"
                lineHeight="150%"
              >
                {link.title}
              </Typography>
            </SupercarmarketLink>
          </Wrapper.Item>
        ))}
      </Wrapper.Bottom>
    </Container>
  );
});

const Hamburger = React.memo(function Hamburger({
  navlinks,
  session,
  hamburger,
  className = 'hambuger',
  signOut,
  handleClose,
}: HamburgerProps) {
  const { push } = useRouter();
  const [rendered, setRendered] = React.useState(false);

  const handleSignOut = React.useCallback(() => {
    handleClose();
    signOut();
  }, [handleClose, signOut]);

  const handleClick = React.useCallback(
    (href: string) => {
      handleClose();
      push(href);
    },
    [handleClose, push]
  );

  React.useEffect(() => {
    setRendered(true);
  }, []);

  return rendered ? (
    <Wrapper
      className={clsx(className, {
        show: !!hamburger,
      })}
      css={css`
        position: fixed;
        top: 0;
        bottom: 0;
        right: -100%;
        left: -100%;
        z-index: 9999;
        display: flex;
        flex-direction: column;
        align-items: center;
        transition: all 0.5s ease-in-out;
        ${!!hamburger && ' transition-delay: 0.2s;'}
        background-color: ${theme.color['greyScale-6']};
        padding: 0 16px;
        visibility: hidden;
        opacity: 0;
        &.show {
          visibility: visible;
          opacity: 1;
          left: 0%;
          right: 0%;
        }
      `}
    >
      <Wrapper.Item
        css={css`
          width: 100%;
          height: 56px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        `}
      >
        <Wrapper.Left>
          <Button variant="Init" type="button" onClick={handleClose}>
            <Image src={closeSrc} alt="arrow" />
          </Button>
        </Wrapper.Left>
        <Wrapper.Right
          css={css`
            display: flex;
            align-items: center;
            gap: 16px;
          `}
        >
          {session ? (
            <>
              <Button
                variant="Init"
                style={{
                  cursor: 'pointer',
                }}
                onClick={handleSignOut}
              >
                <Typography
                  as="b"
                  color="white"
                  fontSize="header-14"
                  fontWeight="bold"
                  lineHeight="120%"
                >
                  로그아웃
                </Typography>
              </Button>
              <SupercarmarketLink
                href={`/account/${session.sub}`}
                callback={() => handleClick(`/account/${session.sub}`)}
              >
                <Typography
                  as="b"
                  color="white"
                  fontSize="header-14"
                  fontWeight="bold"
                  lineHeight="120%"
                >
                  마이페이지
                </Typography>
              </SupercarmarketLink>
            </>
          ) : (
            <>
              <SupercarmarketLink
                href="/auth/signin"
                callback={() => handleClick('/auth/signin')}
              >
                <Typography
                  as="b"
                  color="white"
                  fontSize="header-14"
                  fontWeight="bold"
                  lineHeight="120%"
                >
                  로그인
                </Typography>
              </SupercarmarketLink>
              <SupercarmarketLink
                href="/auth/signup"
                callback={() => handleClick('/auth/signup')}
              >
                <Typography
                  as="b"
                  color="white"
                  fontSize="header-14"
                  fontWeight="bold"
                  lineHeight="120%"
                >
                  회원가입
                </Typography>
              </SupercarmarketLink>
            </>
          )}
        </Wrapper.Right>
      </Wrapper.Item>
      <Wrapper.Item
        css={css`
          width: 100%;
        `}
      >
        {navlinks.map((navLink) => (
          <HamburgerLinkItem
            key={navLink.title}
            handleClick={handleClick}
            {...navLink}
          />
        ))}
      </Wrapper.Item>
    </Wrapper>
  ) : (
    <></>
  );
});

export default Hamburger;
export type { HamburgerProps };
