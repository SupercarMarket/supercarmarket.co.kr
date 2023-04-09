import { applyMediaQuery } from '@supercarmarket/ui';
('use client');

import styled, { css } from 'styled-components';
import { fadeIn, popping } from 'styles/keyframes';

const top = css`
  width: 100%;
  height: 900px;
  margin-bottom: 10px;
  opacity: 0;
  position: relative;
  animation: ${fadeIn} 0.5s ease-in-out forwards;

  ${applyMediaQuery('mobile')} {
    width: 100%;
    height: 257px;
    margin-bottom: 8px;
  }
`;

const bottom = css`
  width: 100%;
  display: flex;
  position: relative;
`;

const CarouselArea = styled.div`
  width: 100%;
  height: 105px;
  overflow: hidden;
  position: relative;

  ${applyMediaQuery('mobile')} {
    height: 60px;
    overflow-x: scroll;
    -ms-overflow-style: none;
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

const CarouselBox = styled.div<{ page: number }>`
  position: absolute;
  display: flex;
  align-items: center;
  gap: 10.5px;
  ${({ page }) => css`
    transform: translateX(${(page - 1) * -1212}px);
  `}
  transition: transform 0.75s ease-in-out;

  ${applyMediaQuery('mobile')} {
    gap: 8px;
  }
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

  ${applyMediaQuery('mobile')} {
    display: none;
  }
`;

const CarouselImageWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 141px;
  aspect-ratio: 4/3;
  position: relative;
  cursor: pointer;
  :hover {
    filter: brightness(70%);
    transition: filter 0.2s ease-in-out;
  }

  ${applyMediaQuery('mobile')} {
    width: 80px;
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
