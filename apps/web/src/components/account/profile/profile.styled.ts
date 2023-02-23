import { account } from 'components/layout/layout.styled';
import { css } from 'styled-components';

const background = css`
  position: relative;
  width: 100%;
  height: 400px;
`;

const wrapper = css`
  ${account};
  padding: 0;
  padding-top: 200px;
  display: flex;
  align-items: flex-end;
  gap: 50px;
`;

const nickname = css`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 13px;
`;

const svg = css`
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const detail = css`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

export { background, detail, nickname, svg, wrapper };
