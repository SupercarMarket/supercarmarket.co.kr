import { applyMediaQuery } from '@supercarmarket/ui';
import { css } from 'styled-components';

const label = css`
  width: 660px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  gap: 6px;
  ${applyMediaQuery('mobile')} {
    width: 100%;
  }
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

export { item, label, wrapper };
