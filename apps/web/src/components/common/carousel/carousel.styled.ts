import { applyMediaQuery } from '@supercarmarket/ui';
('use client');

import styled, { css } from 'styled-components';
import { popping } from 'styles/keyframes';

const top = css`
  width: 100%;
  display: flex;
  gap: 20px;
  margin-bottom: 10px;
`;

const bottom = css`
  width: 100%;
  display: flex;
  position: relative;
`;

const CarouselArea = styled.div`
  width: 100%;
  height: 90px;
  overflow: hidden;
  position: relative;
  ${applyMediaQuery('mobile')} {
    height: 60px;
  }
`;

const CarouselBox = styled.div<{ page: number }>`
  position: absolute;
  display: flex;
  gap: 10.5px;
  ${({ page }) => css`
    transform: translateX(${(page - 1) * -1212}px);
  `}
  transition: transform 0.75s ease-in-out;
`;

interface ArrowButtonProps {
  position: 'left' | 'right';
}

const ArrowButton = styled.button<ArrowButtonProps>`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  background: none;
  border: none;
  cursor: pointer;
  ${({ position }) => position}: -50px;

  svg {
    fill: ${({ theme }) => theme.color['greyScale-6']};
  }
  :hover {
    animation: ${popping(-5)} 0.5s ease-in-out infinite;
  }
  :disabled {
    animation: none;
    cursor: default;
    svg {
      fill: ${({ theme }) => theme.color['greyScale-4']};
    }
  }
`;

const CarouselImageWrapper = styled.div`
  width: 141px;
  height: 89px;
  position: relative;
  cursor: pointer;
  transition: filter 0.2s ease-in-out;

  :hover {
    filter: brightness(70%);
  }

  ${applyMediaQuery('mobile')} {
    width: 80px;
    height: 60px;
  }
`;

const CheckBox = styled(CarouselImageWrapper)`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.7);
`;

export {
  ArrowButton,
  bottom,
  CarouselArea,
  CarouselBox,
  CarouselImageWrapper,
  CheckBox,
  top,
};
