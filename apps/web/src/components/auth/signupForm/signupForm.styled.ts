import { applyMediaQuery } from '@supercarmarket/ui';
import { css } from 'styled-components';

const form = css`
  width: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 26px;
  ${applyMediaQuery('mobile')} {
    width: 375px;
    gap: 16px;
    & > button[type='submit'] {
      width: 100% !important;
    }
  }
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
