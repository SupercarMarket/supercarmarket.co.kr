'use client';

import styled, { css } from 'styled-components';

const Table = styled.table<{ marginBottom: string }>`
  width: 100%;
  margin-bottom: ${({ marginBottom }) => marginBottom};
`;

const THead = styled.thead`
  height: 41px;
  background: ${({ theme }) => theme.color['greyScale-2']};
`;

const TBody = styled.tbody``;

interface TableHeadProps {
  width?: string;
}

const TableRow = styled.tr`
  border-bottom: 1px solid ${({ theme }) => theme.color['greyScale-3']};
`;

const TableHead = styled.th<TableHeadProps>`
  vertical-align: middle;
  ${({ width }) =>
    width &&
    css`
      width: ${width}px;
    `}
`;
export {
  Table,
  TableHead,
  TableRow,
  TBody,
  THead,
};
