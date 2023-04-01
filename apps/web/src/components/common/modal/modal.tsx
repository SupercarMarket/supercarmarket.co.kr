import * as React from 'react';
import { Button, Typography, Wrapper } from '@supercarmarket/ui';
import { ModalProvider } from 'feature/ModalProvider';
import { css } from 'styled-components';

const Modal = ({
  title = '로그인이 필요합니다',
  description,
  node,
  closeText,
  clickText,
  background = 'none',
  onClose,
  onClick,
  onCancel,
}: {
  title?: React.ReactNode;
  description?: React.ReactNode;
  node?: React.ReactNode;
  closeText?: string;
  clickText?: string;
  background?: string;
  onClose?: () => void;
  onClick?: () => void;
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
          background,
        }}
        onClick={(e) => {
          if (e.currentTarget !== e.target) return;
          onCancel();
        }}
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
            {title}
          </Typography>
          {node}
          {description && (
            <Typography
              as="p"
              fontSize="body-16"
              fontWeight="regular"
              color="greyScale-5"
              lineHeight="150%"
              space
              style={{
                textAlign: 'center',
                marginBottom: '38px',
              }}
            >
              {description}
            </Typography>
          )}
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
