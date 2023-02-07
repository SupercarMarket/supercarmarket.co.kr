import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

import { applyMediaQuery } from './mediaQuery';

const GlobalStyle = createGlobalStyle`
  ${reset}

  html, body ,#__next  {
    width: 100%;
    font-family: var("--pretendard");
    
    * {
      box-sizing: "border-box";
    }

    ${applyMediaQuery('tablet')} {}

    ${applyMediaQuery('mobile')} {
      font-size: 87.5%;
    }
  }

  a {
    all: unset;
    cursor: pointer;
  }
`;

export default GlobalStyle;
