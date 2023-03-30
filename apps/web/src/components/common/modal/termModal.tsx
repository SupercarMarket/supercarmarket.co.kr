import { Button, theme, Typography, Wrapper } from '@supercarmarket/ui';
import { FormState } from 'constants/form/signup';
import * as terms from 'constants/terms';
import { ModalProvider } from 'feature/modalContext';
import { css } from 'styled-components';

const TermModal = ({
  title,
  htmlFor,
  onClose,
}: {
  htmlFor: keyof FormState;
  title?: string;
  onClose: () => void;
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
          background: theme.color['greyScale-6'],
        }}
        onClick={(e) => {
          if (e.currentTarget !== e.target) return;
          onClose();
        }}
      >
        <Wrapper
          css={css`
            width: 648px;
            padding: 34px 24px 24px 24px;
            border: 1px solid #c3c3c7;
            border-radius: 4px;
            box-sizing: border-box;
            background: #fff;
            display: flex;
            flex-direction: column;
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
          <Wrapper.Item
            css={css`
              div {
                max-height: 447px;
                overflow-y: scroll;
              }
              p {
                white-space: pre-wrap;
                font-size: ${theme.fontSize['body-14']};
                font-weight: ${theme.fontWeight.regular};
                color: ${theme.color['greyScale-5']};
                line-height: 150%;
              }
              b {
                font-size: ${theme.fontSize['header-16']};
                font-weight: ${theme.fontWeight.bold};
                color: ${theme.color['greyScale-6']};
                line-height: 120%;
              }
              br {
              }
            `}
          >
            <div
              dangerouslySetInnerHTML={{
                __html: htmlFor === 'service' ? terms.service : terms.service,
              }}
            />
          </Wrapper.Item>
          <Wrapper.Item
            css={css`
              width: 100%;
              display: flex;
              align-items: center;
              justify-content: flex-end;
              padding-top: 16px;
            `}
          >
            <Button variant="Primary" width="160px" onClick={onClose}>
              확인
            </Button>
          </Wrapper.Item>
        </Wrapper>
      </div>
    </ModalProvider>
  );
};

export default TermModal;
