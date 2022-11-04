import styled, { css } from 'styled-components';

export const MarketCarKindList = styled.ul`
  display: flex;
  gap: 9px;
  margin-bottom: 20px;
`;

export const MarketCarKindItem = styled.li<{ active: boolean }>`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px 22px;
  height: 44px;
  background: ${({ theme }) => theme.color.white};
  border: 1px solid ${({ theme }) => theme.color['greyScale-4']};
  border-radius: 9999px;
  cursor: pointer;

  :hover {
    ${({ theme }) => css`
      color: ${theme.color.white};
      background: ${theme.color.primary};
      border: 1px solid ${theme.color.primary};
    `};
  }

  ${({ theme, active }) =>
    active &&
    css`
      color: ${theme.color.white};
      background: ${theme.color.primary};
      border: 1px solid ${theme.color.primary};
    `}
`;
