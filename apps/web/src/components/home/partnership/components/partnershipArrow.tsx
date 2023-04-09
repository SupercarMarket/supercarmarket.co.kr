import * as React from 'react';
import { applyMediaQuery, Button, Wrapper } from '@supercarmarket/ui';
import { css } from 'styled-components';

interface PartnershipArrowProps {
  direction: 'left' | 'right';
  isMobile?: boolean;
  disabled?: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
}

const PartnershipArrow = (props: PartnershipArrowProps) => {
  const { direction, disabled, children, onClick } = props;
  return (
    <Button
      variant="Init"
      type="button"
      style={{
        width: 'fit-content',
        position: 'absolute',
        left: direction === 'left' ? '-56px' : undefined,
        right: direction === 'right' ? '-56px' : undefined,
        top: '50%',
        transform: 'translateY(-50%)',
        cursor: disabled ? 'no-drop' : 'pointer',
      }}
      disabled={disabled}
      onClick={onClick}
    >
      <Wrapper
        css={css`
          width: 40px;
          height: 40px;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 50%;
          font-size: ${({ theme }) => theme.fontSize['body-20']};
          background-color: ${({ theme }) => theme.color['greyScale-2']};
          ${applyMediaQuery('mobile')} {
            display: none;
            width: 24px;
            height: 24px;
            font-size: ${({ theme }) => theme.fontSize['body-16']};
          }
        `}
      >
        {children}
      </Wrapper>
    </Button>
  );
};

export default PartnershipArrow;
