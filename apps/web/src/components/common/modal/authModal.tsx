import { Button, Container, Typography, Wrapper } from '@supercarmarket/ui';
import type { ModalContextProps } from 'feature/modalContext';
import { ModalProvider } from 'feature/modalContext';
import Link from 'next/link';

import * as style from './modal.styled';

const AuthModal = ({
  onClose,
  description = '로그인이 필요한 서비스입니다.',
}: ModalContextProps & {
  description?: string;
}) => {
  return (
    <ModalProvider>
      <Container display="flex" flexDirection="column" alignItems="center">
        <Typography
          as="h4"
          fontSize="header-20"
          fontWeight="bold"
          color="greyScale-6"
          lineHeight="150%"
          style={{
            marginBottom: '16px',
          }}
        >
          로그인이 필요합니다
        </Typography>
        <Typography
          as="p"
          fontSize="body-16"
          fontWeight="regular"
          color="greyScale-5"
          lineHeight="150%"
          style={{
            marginBottom: '38px',
          }}
        >
          {description}
        </Typography>
        <Wrapper css={style.modalButtonWrapper}>
          <Button variant="Primary-Line" width="160px">
            <Link
              href={{
                pathname: '/auth/signup',
              }}
            >
              <Typography
                as="span"
                fontSize="body-16"
                fontWeight="regular"
                color="primary"
                lineHeight="150%"
              >
                회원 가입
              </Typography>
            </Link>
          </Button>
          <Button variant="Primary" width="116px">
            <Link
              href={{
                pathname: '/auth/signin',
              }}
            >
              <Typography
                as="span"
                fontSize="body-16"
                fontWeight="regular"
                color="white"
                lineHeight="150%"
              >
                로그인
              </Typography>
            </Link>
          </Button>
        </Wrapper>
      </Container>
    </ModalProvider>
  );
};

export default AuthModal;
