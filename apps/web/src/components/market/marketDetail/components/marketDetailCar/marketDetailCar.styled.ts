'use client';
import { applyMediaQuery } from '@supercarmarket/ui';
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

  ${applyMediaQuery('mobile')} {
    margin-bottom: 32px;
    padding: 16px;
    gap: 16px;
  }
`;

const Info = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;

  ${applyMediaQuery('mobile')} {
    margin-bottom: 0;
  }
`;

const Subject = styled.div`
  width: 90px;
`;

const Content = styled.div`
  ${({ theme }) => css`
    width: 270px;
    font-weight: ${theme.fontWeight['bold']};
  `}
`;

export { Content, Info, Subject, wrapper };
