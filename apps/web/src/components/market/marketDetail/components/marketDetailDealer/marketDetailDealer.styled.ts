import { applyMediaQuery } from '@supercarmarket/ui';
('use client');

import { css } from 'styled-components';

const wrapper = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 140px;
  margin-top: 20px;
  margin-bottom: 80px;
  padding: 30px 40px;
  border: 1px solid ${({ theme }) => theme.color['greyScale-3']};
  border-radius: 4px;
  box-sizing: border-box;

  ${applyMediaQuery('mobile')} {
    height: 130px;
    padding: 20px 16px;
    margin-bottom: 32px;
    flex-direction: column;
    align-items: flex-start;
  }
`;

const profile = css`
  ${({ theme }) => css`
    margin-bottom: 6px;
    line-height: 150%;
    font-size: ${theme.fontSize['body-20']};

    ${applyMediaQuery('mobile')} {
      font-size: ${theme.fontSize['body-16']};
    }
  `}
`;

const innerProfile = css`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    gap: 10px;

    .bold {
      font-weight: ${theme.fontWeight['bold']};
    }

    .gray {
      color: ${theme.color['greyScale-5']};
    }
  `}
`;

const left = css`
  display: flex;
  align-items: center;
  gap: 40px;

  ${applyMediaQuery('mobile')} {
    gap: 16px;
  }
`;

const right = css`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    margin-left: 5px;

    p {
      font-size: ${theme.fontSize['body-24']};
      font-weight: ${theme.fontWeight['bold']};
      color: ${theme.color['system-1']};
      padding-bottom: 5px;
    }

    svg {
      width: 20px;
      fill: ${theme.color['system-1']};
      margin-right: 12px;
    }

    ${applyMediaQuery('mobile')} {
      p {
        font-size: ${theme.fontSize['body-16']};
        padding-bottom: 4px;
      }

      svg {
        width: 16px;
        margin-right: 8px;
      }
    }
  `}
`;

export { left, profile, innerProfile, right, wrapper };
