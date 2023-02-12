import { keyframes } from 'styled-components';

const fadeIn = keyframes`
  0% {
    opacity: 0.25;
  }
  100% {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

const popping = (frame: number) => keyframes`
  0% {
    transform: translateY(0);
  }
  25%{ 
    transform: translateY(${frame}px);
  }
  70% {
    transform: translateY(${frame}px);
  }
  100% {
    transform: translateY(0);
  }
`;

export { fadeIn, fadeOut, popping };
