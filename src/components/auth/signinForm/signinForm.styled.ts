'use client';

import { css } from 'styled-components';

const form = css`
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

const kakao = css`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  box-sizing: border-box;
  background: #fee500;
  border-radius: 4px;
  padding: 10px;
  height: 50px;
  cursor: pointer;
`;

const google = css`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  box-sizing: border-box;
  background: #ffffff;
  border: 1px solid #8e8e95;
  border-radius: 4px;
  padding: 10px;
  height: 50px;
  cursor: pointer;
`;

export { form, google, kakao, wrapper };
