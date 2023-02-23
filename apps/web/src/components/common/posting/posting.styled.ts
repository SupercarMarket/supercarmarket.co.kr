import { css } from 'styled-components';

const title = css`
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 40px;
`;

const bottom = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const magazineHeadLeft = css`
  bottom: 40px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const magazineHeadRight = css`
  display: flex;
  bottom: 40px;
  right: 40px;
  align-items: center;
  gap: 12px;
`;

const left = css`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
`;

const right = css`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const wrapper = css`
  display: flex;
  align-items: center;
  gap: 4px;
  & > svg {
    width: 16px;
    height: 16px;
    fill: ${({ theme }) => theme.color['greyScale-5']};
  }
`;

export {
  bottom,
  left,
  magazineHeadLeft,
  magazineHeadRight,
  right,
  title,
  wrapper,
};
