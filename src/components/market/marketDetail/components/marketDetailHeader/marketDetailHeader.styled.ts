'use client';

import { css } from 'styled-components';

const wrapper = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 40px;
`;

const right = css`
  text-align: right;
`;

const rightBottom = css`
  display: flex;
  align-items: center;
  gap: 5px;
  color: ${({ theme }) => theme.color['greyScale-5']};

  svg {
    fill: ${({ theme }) => theme.color['greyScale-5']};
  }
`;

export { right, rightBottom, wrapper };
