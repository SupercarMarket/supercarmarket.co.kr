import { css } from 'styled-components';

const content = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const desc = css`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const id = css`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 30px 30px;
  border: 1px solid ${({ theme }) => theme.color['primary-lighten']};
  border-radius: 4px;
`;

const button = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export { button, content, desc, id };
