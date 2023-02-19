'use client';

import styled, { css } from 'styled-components';

const TableRow = styled.tr`
  border-bottom: 1px solid ${({ theme }) => theme.color['greyScale-3']};
`;

interface TableHeadProps {
  width?: string;
}

const TableHead = styled.th<TableHeadProps>`
  vertical-align: middle;
  ${({ width }) =>
    width &&
    css`
      width: ${width}px;
    `}
`;

const TableData = styled.td`
  box-sizing: border-box;
  height: 136px;
  padding: 6px 0;
  vertical-align: middle;
  text-align: center;
`;

const Description = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  padding: 0 30px;
`;

export { Description, TableData, TableHead, TableRow };
