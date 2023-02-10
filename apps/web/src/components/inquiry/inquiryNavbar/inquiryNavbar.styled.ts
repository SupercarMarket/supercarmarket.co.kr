import { css } from 'styled-components';

const left = css`
  display: flex;
  align-items: center;
  gap: 40px;
`;

const leftItem = css`
  position: relative;
`;

const right = css`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export { left, leftItem, right };
