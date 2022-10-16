import Button from 'components/common/button';
import Link from 'components/common/link';
import Logo from 'components/common/logo';
import Typography from 'components/common/typography';

import * as Styled from './header.styled';

const Header = () => {
  return (
    <Styled.Container>
      <Logo />
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
