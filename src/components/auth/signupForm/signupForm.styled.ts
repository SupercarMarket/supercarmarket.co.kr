import { css } from 'styled-components';

const form = css`
  width: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 26px;
`;

const label = css`
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

const wrapper = css`
  width: 660px;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const item = css`
  width: 100%;
  box-sizing: border-box;
  display: flex;
  gap: 20px;
`;

export { form, item, label, wrapper };
