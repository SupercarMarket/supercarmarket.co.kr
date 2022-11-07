import Button from 'components/common/button';
import Logo from 'components/common/logo';
import Searchbar from 'components/common/searchbar';
import Typography from 'components/common/typography';
import Link from 'next/link';

import * as Styled from './header.styled';

const Header = () => {
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
        <Link href="">
          <Typography
            color="black"
            fontSize="body-16"
            fontWeight="regular"
            lineHeight="150%"
          >
            로그인
          </Typography>
        </Link>
        <Link href="">
          <Typography
            color="black"
            fontSize="body-16"
            fontWeight="regular"
            lineHeight="150%"
          >
            회원가입
          </Typography>
        </Link>
        <Button variant="Line">문의하기</Button>
      </Styled.Buttons>
    </Styled.Container>
  );
};

export default Header;
