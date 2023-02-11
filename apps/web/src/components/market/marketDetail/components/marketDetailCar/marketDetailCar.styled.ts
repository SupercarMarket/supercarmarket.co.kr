'use client';

import styled, { css } from 'styled-components';

const wrapper = css`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 20px;
  margin-bottom: 80px;
  padding: 30px 40px 20px 40px;
  border: 1px solid ${({ theme }) => theme.color['greyScale-3']};
  border-radius: 4px;
  box-sizing: border-box;
`;

const Info = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

const Subject = styled.div`
  width: 90px;
`;
const Content = styled.div`
  width: 270px;
`;

export { Content, Info, Subject, wrapper };
