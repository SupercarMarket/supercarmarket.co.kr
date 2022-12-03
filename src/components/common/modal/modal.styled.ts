'use client';

import { css } from 'styled-components';

const modalButtonWrapper = css`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const modalCallWrapper = css`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.color['primary-lighten']};
  padding: 10px 22px;
  margin-bottom: 8px;
  border-radius: 4px;
`;

export { modalButtonWrapper, modalCallWrapper };
