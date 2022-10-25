import styled, { css } from 'styled-components';

interface ContainerAttributes {
  width: string | undefined;
}

export const SelectContainer = styled.div<ContainerAttributes>`
  ${({ width }) =>
    width &&
    css`
      width: ${width}px;
    `};
`;

export const SelectCurrent = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 44px;
  padding: 10px 18px;
  background: ${({ theme }) => theme.color.white};
  border: 1px solid ${({ theme }) => theme.color['greyScale-6']};
  border-radius: 4px;
  cursor: pointer;
`;

interface ToggleProps {
  toggle: boolean;
  width?: string;
}

export const Backdrop = styled.div<ToggleProps>`
  display: none;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: transparent;
  z-index: 500;

  ${({ toggle }) =>
    toggle &&
    css`
      display: block;
    `}
`;

export const SelectOptionList = styled.ul<ToggleProps>`
  max-height: 200px;
  display: none;
  position: absolute;
  background: ${({ theme }) => theme.color.white};
  border: 1px solid ${({ theme }) => theme.color['greyScale-6']};
  border-radius: 4px;
  z-index: 1000;
  overflow: scroll;
  ${({ width }) =>
    width &&
    css`
      width: ${+width - 2}px;
    `};

  ${({ toggle }) =>
    toggle &&
    css`
      display: block;
    `};
`;

export const SelectOptionItem = styled.li``;

export const SelectOption = styled(SelectCurrent)`
  background: none;
  border: none;
  :hover {
    background: ${({ theme }) => theme.color['greyScale-2']};
    color: #b79f7b;
    cursor: pointer;
  }
`;
