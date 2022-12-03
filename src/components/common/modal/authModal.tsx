import type { ModalContextProps } from 'feature/modalContext';
import { ModalProvider } from 'feature/modalContext';

import Button from '../button';
import Container from '../container';
import Typography from '../typography';
import Wrapper from '../wrapper';
import * as style from './modal.styled';

const AuthModal = ({ onClose }: ModalContextProps) => {
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
          로그인 후 상담 신청이 가능합니다
        </Typography>
        <Wrapper css={style.modalButtonWrapper}>
          <Button variant="Primary-Line" width="160px">
            <Typography
              as="span"
              fontSize="body-16"
              fontWeight="regular"
              color="primary"
              lineHeight="150%"
            >
              회원 가입
            </Typography>
          </Button>
          <Button variant="Primary" width="116px">
            <Typography
              as="span"
              fontSize="body-16"
              fontWeight="regular"
              color="white"
              lineHeight="150%"
            >
              로그인
            </Typography>
          </Button>
        </Wrapper>
      </Container>
    </ModalProvider>
  );
};

export default AuthModal;
