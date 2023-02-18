'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import {
  Button,
  Container,
  Logo,
  Searchbar,
  Typography,
  Wrapper,
  applyMediaQuery,
} from '@supercarmarket/ui';
import { LinkSkeleton } from 'components/fallback/loading';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import { css } from 'styled-components';
import clsx from 'clsx';
import type { Links } from '@supercarmarket/types/base';
import Hamburger from '../hamburger';
import Image from 'next/image';

interface HeaderProps {
  navlinks: Links[];
}

const Header = ({ navlinks }: HeaderProps) => {
  const [search, setSearch] = React.useState(false);
  const [hamburger, setHamburger] = React.useState(false);
  const { status, data: session } = useSession();
  const { push } = useRouter();

  const handleHamburger = React.useCallback(() => {
    setHamburger((prev) => !prev);
  }, []);
  const handleSignOut = React.useCallback(() => {
    signOut({ redirect: false });
  }, []);

  return (
    <Container
      width="100%"
      height="96px"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
    >
      <Wrapper
        className={clsx({
          hidden: search,
        })}
        css={css`
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          transition: all 0.5s;
          ${!search && ' transition-delay: 0.5s;'}
          &.hidden {
            visibility: hidden;
            opacity: 0;
            margin-left: -100%;
          }
        `}
      >
        <Wrapper.Item
          css={css`
            display: flex;
            align-items: center;
            ${applyMediaQuery('desktop', 'tablet')} {
              display: none;
            }
          `}
        >
          <Button variant="Init" type="button" onClick={handleHamburger}>
            <Image
              src="/images/menu.png"
              placeholder="blur"
              blurDataURL="/images/menu-blur.png"
              alt="search"
              width={24}
              height={24}
            />
          </Button>
        </Wrapper.Item>
        <Wrapper.Item
          css={css`
            ${applyMediaQuery('desktop', 'tablet')} {
              padding-right: 80px;
            }
          `}
        >
          <Logo />
        </Wrapper.Item>
        <Wrapper
          css={css`
            flex: 1;
            display: flex;
            align-items: center;
            gap: 52px;
            ${applyMediaQuery('mobile')} {
              display: none;
            }
          `}
        >
          <Searchbar
            variant="Grey"
            border="rounded"
            placeholder="검색어를 입력해주세요."
            width="527px"
            handleClick={(query) =>
              push(`/search?keyword=${query}&category=all`)
            }
          />
          <Wrapper.Item
            css={css`
              width: 100%;
              display: flex;
              align-items: center;
              gap: 32px;
            `}
          >
            {status === 'loading' ? (
              <Wrapper.Item
                css={css`
                  flex: 1;
                  width: 100%;
                  display: flex;
                  gap: 30px;
                  align-items: center;
                  & > span {
                    flex: 1;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                  }
                `}
              >
                <LinkSkeleton />
                <LinkSkeleton />
              </Wrapper.Item>
            ) : status === 'authenticated' ? (
              <>
                <Button
                  variant="Init"
                  style={{
                    cursor: 'pointer',
                  }}
                  onClick={() => signOut({ redirect: false })}
                >
                  <Typography
                    color="black"
                    fontSize="body-16"
                    fontWeight="regular"
                    lineHeight="150%"
                  >
                    로그아웃
                  </Typography>
                </Button>
                <Link href={`/account/${session.sub}`}>
                  <Typography
                    color="black"
                    fontSize="body-16"
                    fontWeight="regular"
                    lineHeight="150%"
                  >
                    마이페이지
                  </Typography>
                </Link>
              </>
            ) : (
              <>
                <Link href="/auth/signin">
                  <Typography
                    color="black"
                    fontSize="body-16"
                    fontWeight="regular"
                    lineHeight="150%"
                  >
                    로그인
                  </Typography>
                </Link>
                <Link href="/auth/signup">
                  <Typography
                    color="black"
                    fontSize="body-16"
                    fontWeight="regular"
                    lineHeight="150%"
                  >
                    회원가입
                  </Typography>
                </Link>
              </>
            )}
            <Button variant="Line">문의하기</Button>
          </Wrapper.Item>
        </Wrapper>
        <Wrapper.Item
          css={css`
            display: flex;
            align-items: center;
            ${applyMediaQuery('desktop', 'tablet')} {
              display: none;
            }
          `}
        >
          <Button
            variant="Init"
            type="button"
            onClick={() => setSearch(true)}
            style={{
              zIndex: '999',
            }}
          >
            <Image
              src="/images/search.png"
              placeholder="blur"
              blurDataURL="/images/search-blur.png"
              alt="search"
              width={24}
              height={24}
            />
          </Button>
        </Wrapper.Item>
      </Wrapper>
      <Wrapper
        className={clsx({
          hidden: !search,
        })}
        css={css`
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          transition: all 0.5s ease-in-out;
          ${search && ' transition-delay: 0.5s;'}
          &.hidden {
            visibility: hidden;
            opacity: 0;
            margin-left: -100%;
          }
        `}
      >
        <Searchbar
          variant="Grey"
          border="rounded"
          placeholder="검색어를 입력해주세요."
          width="340px"
          handleClick={(query) => push(`/search?keyword=${query}&category=all`)}
        />
        <Button variant="Init" onClick={() => setSearch(false)}>
          <svg
            width="1.625rem"
            height="1.625rem"
            viewBox="0 0 24 24"
            fill="#1E1E20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_359_6756)">
              <path
                d="M17.65 6.35C16.2 4.9 14.21 4 12 4C7.58001 4 4.01001 7.58 4.01001 12C4.01001 16.42 7.58001 20 12 20C15.73 20 18.84 17.45 19.73 14H17.65C16.83 16.33 14.61 18 12 18C8.69001 18 6.00001 15.31 6.00001 12C6.00001 8.69 8.69001 6 12 6C13.66 6 15.14 6.69 16.22 7.78L13 11H20V4L17.65 6.35Z"
                fill="#1E1E20"
              />
            </g>
            <defs>
              <clipPath id="clip0_359_6756">
                <rect width="100%" height="100%" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </Button>
      </Wrapper>
      <Hamburger
        navlinks={navlinks}
        session={session}
        hamburger={hamburger}
        signOut={handleSignOut}
        handleClose={handleHamburger}
      />
    </Container>
  );
};

export default Header;
