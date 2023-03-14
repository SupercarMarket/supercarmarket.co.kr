import { Button, Container, Typography, Wrapper } from '@supercarmarket/ui';
import { ModalProvider } from 'feature/modalContext';
import { css } from 'styled-components';

const Modal = ({
  title = '로그인이 필요합니다',
  description = '로그인이 필요한 서비스입니다.',
  closeText,
  clickText,
  onClose,
  onClick,
  onCancel,
}: {
  title?: string;
  description?: string;
  closeText?: string;
  clickText?: string;
  onClose: () => void;
  onClick: () => void;
  onCancel: () => void;
}) => {
  return (
    <ModalProvider>
      <div
        style={{
          position: 'fixed',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          top: '0',
          bottom: '0',
          left: '0',
          right: '0',
          zIndex: 99999,
        }}
        onClick={onCancel}
      >
        <Wrapper
          css={css`
            width: 390px;
            padding: 34px 24px 24px 24px;
            border: 1px solid #c3c3c7;
            border-radius: 4px;
            box-sizing: border-box;
            background: #fff;
            display: flex;
            flex-direction: column;
            align-items: center;
          `}
        >
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
          <Wrapper.Item
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
          </Wrapper.Item>
        </Wrapper>
      </div>
    </ModalProvider>
  );
};

export default Modal;
