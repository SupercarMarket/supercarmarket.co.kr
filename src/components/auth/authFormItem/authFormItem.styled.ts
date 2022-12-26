import { css } from 'styled-components';

const label = css`
<<<<<<< HEAD
  width: 660px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  gap: 6px;
=======
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
>>>>>>> 45c355dfdce16a4132d1d52bd9d7eabb4caf0864
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
