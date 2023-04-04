import * as React from 'react';
import { applyMediaQuery, Container, Wrapper } from '@supercarmarket/ui';
import { css } from 'styled-components';

interface PartnershipArrowProps {
  children?: React.ReactNode;
  direction: 'left' | 'right';
  onClick?: () => void;
}

const PartnershipArrow = (props: PartnershipArrowProps) => {
  const { direction, children, onClick } = props;
  return (
    <Container
      width="fit-content"
      position="absolute"
      handleClick={onClick}
      left={direction === 'left' ? '-56px' : undefined}
      right={direction === 'right' ? '-56px' : undefined}
      top="50%"
      style={{
        transform: 'translateY(-50%)',
      }}
      zIndex={999}
    >
      <Wrapper
        css={css`
          width: 40px;
          height: 40px;
          display: flex;
          cursor: pointer;
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
    </Container>
  );
};

export default PartnershipArrow;
