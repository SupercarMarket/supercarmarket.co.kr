import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

import { applyMediaQuery } from './mediaQuery';

const GlobalStyle = createGlobalStyle`
  ${reset}
  html, body ,#__next  {
    width: 100%;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;

    ${applyMediaQuery('tablet')} {}

    ${applyMediaQuery('mobile')} {
      font-size: 87.5%;
    }

    ${applyMediaQuery('tablet')} {}

    ${applyMediaQuery('mobile')} {
      font-size: 87.5%;
    }
  }

  * {
    box-sizing: "border-box";
  }

  a {
    all: unset;
    cursor: pointer;
  }
`;

export default GlobalStyle;
