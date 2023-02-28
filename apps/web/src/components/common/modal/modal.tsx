import { Button, Container, Typography, Wrapper } from '@supercarmarket/ui';
import { ModalProvider } from 'feature/modalContext';
import { css } from 'styled-components';

import * as style from './modal.styled';

const Modal = ({
  title = '로그인이 필요합니다',
  description = '로그인이 필요한 서비스입니다.',
  closeText,
  clickText,
  onClose,
  onClick,
}: {
  title?: string;
  description?: string;
  closeText?: string;
  clickText?: string;
  onClose: () => void;
  onClick: () => void;
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
        <Wrapper
          css={css`
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: ${!(closeText && clickText)
              ? 'center'
              : 'space-between'};
          `}
        >
          {closeText && (
            <Button variant="Primary-Line" width="160px" onClick={onClose}>
              {closeText}
            </Button>
          )}
          {clickText && (
            <Button variant="Primary" width="160px" onClick={onClick}>
              {clickText}
            </Button>
          )}
        </Wrapper>
      </Container>
    </ModalProvider>
  );
};

export default Modal;
