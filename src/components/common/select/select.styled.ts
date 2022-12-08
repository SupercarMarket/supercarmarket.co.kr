'use client';

import styled, { css } from 'styled-components';

interface SelectProps {
  width: string;
}

const SelectContainer = styled.div<SelectProps>`
  box-sizing: border-box;
  position: relative;
  width: ${({ width }) => width}px;
`;

const Backdrop = styled.div<{ toggle: boolean }>`
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

interface AlignProps {
  align?: 'left' | 'center' | 'right';
  active?: boolean;
}

const SelectCurrentButton = styled.button<AlignProps>`
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

  ${({ align }) =>
    align &&
    css`
      justify-content: ${align === 'left'
        ? 'space-between'
        : align === 'center'
        ? 'center'
        : 'flex-end'};
    `};

  svg {
    margin-left: 5px;
  }
`;

interface SelectOptionListProps {
  width?: string;
  toggle: boolean;
  over?: boolean;
}

const SelectOptionList = styled.ul<SelectOptionListProps>`
  box-sizing: border-box;
  width: ${({ width }) => width}px;
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

  ${({ over }) =>
    over &&
    css`
      max-height: 200px;
      overflow: scroll;
    `}
`;

const SelectOptionItem = styled.li``;

const SelectOptionButton = styled(SelectCurrentButton)`
  border: none;
  border-radius: 0px;

  :hover {
    color: #b79f7b;
    background: ${({ theme }) => theme.color['greyScale-2']};
  }

  ${({ active }) =>
    active &&
    css`
      color: #b79f7b;
      background: ${({ theme }) => theme.color['greyScale-2']};
    `}

  ${({ align }) =>
    align &&
    css`
      justify-content: ${align === 'left'
        ? 'space-between'
        : align === 'center'
        ? 'center'
        : 'flex-end'};
    `};
`;

export {
  Backdrop,
  SelectContainer,
  SelectCurrentButton,
  SelectOptionButton,
  SelectOptionItem,
  SelectOptionList,
};
