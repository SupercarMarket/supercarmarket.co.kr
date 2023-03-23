'use client';
import { applyMediaQuery } from '@supercarmarket/ui';
import styled from 'styled-components';

const AttachedCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
  min-height: 140px;
  margin-top: 20px;
  padding: 30px 40px;
  border: 1px solid ${({ theme }) => theme.color['greyScale-3']};
  border-radius: 4px;
  box-sizing: border-box;

  ${applyMediaQuery('mobile')} {
    padding: 16px;
    min-height: initial;
  }
`;

const File = styled.div`
  a {
    display: inline-flex;
    align-items: center;
    gap: 10px;

    :hover {
      text-decoration: underline;
      cursor: pointer;
    }
  }
`;

export { AttachedCard, File };
