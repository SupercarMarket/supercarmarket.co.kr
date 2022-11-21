import styled, { css } from 'styled-components';

export const MarketTableRow = styled.tr`
  border-bottom: 1px solid ${({ theme }) => theme.color['greyScale-3']};
  cursor: pointer;
`;

interface TableHeadProps {
  width?: string;
}

export const MarketTableHead = styled.th<TableHeadProps>`
  vertical-align: middle;
  ${({ width }) =>
    width &&
    css`
      width: ${width}px;
    `}
`;

export const MarketTableData = styled.td`
  box-sizing: border-box;
  height: 136px;
  padding: 6px 0;
  vertical-align: middle;
  text-align: center;
`;

export const CarInformation = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  padding: 0 30px;
`;
