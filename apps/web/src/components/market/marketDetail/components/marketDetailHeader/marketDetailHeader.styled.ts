'use client';
import { applyMediaQuery } from '@supercarmarket/ui';

import { css } from 'styled-components';

const wrapper = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 40px;

  ${applyMediaQuery('mobile')} {
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    margin-bottom: 35px;
  }
`;

const wrapperLeft = css`
  ${({ theme }) => css`
    h1 {
      font-size: ${theme.fontSize['header-36']};
      font-weight: ${theme.fontWeight['bold']};
      line-height: 150%;
      margin-bottom: 8px;
    }

    .market_description {
      font-size: ${theme.fontSize['body-14']};
    }

    ${applyMediaQuery('mobile')} {
      h1 {
        font-size: ${theme.fontSize['header-20']};
        margin-bottom: 6px;
      }

      .market_description {
        display: none;
      }
    }
  `}
`;

const right = css`
  ${({ theme }) => css`
    text-align: right;

    .market_price {
      font-size: ${theme.fontSize['header-24']};
      font-weight: ${theme.fontWeight['bold']};
      color: ${theme.color['system-1']};
      line-height: 150%;
      margin-bottom: 15px;
    }

    ${applyMediaQuery('mobile')} {
      .market_price {
        font-size: ${theme.fontSize['header-20']};
        text-align: left;
        margin-bottom: 6px;
      }
    }
  `}
`;

const rightBottom = css`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    gap: 10px;
    color: ${theme.color['greyScale-5']};
    font-size: ${theme.fontSize['body-16']};

    svg {
      fill: ${theme.color['greyScale-5']};
    }

    ${applyMediaQuery('mobile')} {
      align-items: flex-start;
      flex-direction: column;
      font-size: ${theme.fontSize['body-12']};

      svg {
        width: 14px;
      }
    }
  `}
`;

const iconWrapper = css`
  display: flex;
  align-items: center;
  gap: 5px;
`;

export { iconWrapper, right, rightBottom, wrapper, wrapperLeft };
