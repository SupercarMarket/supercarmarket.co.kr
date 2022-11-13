import styled, { css } from 'styled-components';
import { fadeIn, popping } from 'styles/keyframes';

const MainImageWrapper = styled.div`
  width: 100%;
  height: 757px;
  margin-bottom: 10px;
  opacity: 0;
  animation: ${fadeIn} 0.5s ease-in-out forwards;
`;

const CarouselWrapper = styled.div`
  width: 100%;
  display: flex;
  position: relative;
`;

const CarouselArea = styled.div`
  width: 100%;
  height: 89px;
  overflow: hidden;
  position: relative;
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
  :hover {
    filter: brightness(70%);
    transition: filter 0.2s ease-in-out;
  }
`;

const CheckBox = styled(CarouselImageWrapper)`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 0;
  top: 0;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7));
`;

export {
  ArrowButton,
  CarouselArea,
  CarouselBox,
  CarouselImageWrapper,
  CarouselWrapper,
  CheckBox,
  MainImageWrapper,
};
