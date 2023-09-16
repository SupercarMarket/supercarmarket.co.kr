import { applyMediaQuery } from '@supercarmarket/ui';
import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${reset}
  html, body ,#__next  {
    width: 100%;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    overflow-x: hidden;

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
  
  .toastui-editor-contents p{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    align-content: center;
  }

  .toastui-editor-contents img{
    border-radius: 1%;
  }
`;

export default GlobalStyle;
