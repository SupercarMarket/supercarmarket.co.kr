import { css } from 'styled-components';

const rowLeft = css`
  width: 760px;
  display: flex;
  align-items: center;
  gap: 30px;
`;

const rowRight = css`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  gap: 38px;
  flex: 1;
`;

const rowTitle = css`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 12px;
`;

const rowUser = css`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export { rowLeft, rowRight, rowTitle, rowUser };
