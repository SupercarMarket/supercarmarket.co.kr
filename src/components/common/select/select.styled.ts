import styled, { css } from 'styled-components';

interface SelectProps {
  width: string;
}

export const SelectContainer = styled.div<SelectProps>`
  box-sizing: border-box;
  position: relative;
  width: ${({ width }) => width}px;
`;

export const Backdrop = styled.div<{ toggle: boolean }>`
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 10;

  ${({ toggle }) =>
    toggle &&
    css`
      display: block;
    `}
`;

export const SelectCurrentButton = styled.button`
  box-sizing: border-box;
  position: relative;
  width: 100%;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 12px;
  background: ${({ theme }) => theme.color.white};
  border: 1px solid ${({ theme }) => theme.color['greyScale-4']};
  border-radius: 4px;
  cursor: pointer;
`;

interface SelectOptionListProps {
  width?: string;
  toggle: boolean;
}

export const SelectOptionList = styled.ul<SelectOptionListProps>`
  box-sizing: border-box;
  width: ${({ width }) => width}px;
  max-height: 200px;
  display: none;
  position: absolute;
  overflow: scroll;
  background: ${({ theme }) => theme.color.white};
  border: 1px solid ${({ theme }) => theme.color['greyScale-4']};
  border-radius: 4px;
  cursor: pointer;
  z-index: 20;

  ${({ toggle }) =>
    toggle &&
    css`
      display: block;
    `}
`;

export const SelectOptionItem = styled.li``;

export const SelectOptionButton = styled(SelectCurrentButton)`
  border: none;
  border-radius: 0px;
  :hover {
    color: #b79f7b;
    background: ${({ theme }) => theme.color['greyScale-2']};
  }
`;
