import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${reset}

  @font-face {
    font-family: 'Pretendard';
    src: url('/fonts/Pretendard-Bold.otf') format('opentype'), url('/font/Pretendard-Bold.ttf') format('ttf');
    font-weight: 700;
    font-display: swap;
  }
  @font-face {
    font-family: 'Pretendard';
    src: url('/fonts/Pretendard-Regular.otf') format('opentype'), url('/font/Pretendard-Regular.ttf') format('ttf');
    font-weight: 400;
    font-display: swap;
  }

  html, body ,#__next  {
    width: 100%;

    * {
      box-sizing: "border-box";
      font-family: 'Pretendard';
    }
  }

  a {
    all: unset;
  }
`;

export default GlobalStyle;
