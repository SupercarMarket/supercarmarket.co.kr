'use client';

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
`;

const profile = css`
  display: flex;
  gap: 10px;
  margin-bottom: 6px;
`;

const left = css`
  display: flex;
  align-items: center;
  gap: 40px;
`;

const right = css`
  display: flex;
  align-items: center;
`;

export { left, profile, right, wrapper };
