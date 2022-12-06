'use client';

import styled, { css } from 'styled-components';

const Form = styled.form`
  width: 340px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

const wrapper = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export { Form, wrapper };
