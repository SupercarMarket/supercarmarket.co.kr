import Button from 'components/common/button';
import Logo from 'components/common/logo';
import Searchbar from 'components/common/searchbar';
import Typography from 'components/common/typography';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';

import * as Styled from './header.styled';

const Header = () => {
  const { status, data: session } = useSession();

  return (
    <Styled.Container>
      <Logo />
      <Searchbar
        variant="Grey"
        border="rounded"
        placeholder="검색어를 입력해주세요."
        width="507px"
      />
      <Styled.Buttons>
        {status === 'loading' ? (
          'loading...'
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
            <Link href="/auth/singinup">
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
      </Styled.Buttons>
    </Styled.Container>
  );
};

export default Header;
