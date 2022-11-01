import styled, { css } from 'styled-components';

export const MarketListContainer = styled.div``;

export const ButtonBox = styled.div`
  display: flex;
  gap: 9px;
`;

export const ViewButton = styled.button`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  background: none;
  border: 1px solid ${({ theme }) => theme.color['greyScale-4']};
  cursor: pointer;

  svg {
    fill: ${({ theme }) => theme.color.black};
  }
  :disabled {
    svg {
      fill: ${({ theme }) => theme.color['greyScale-4']};
    }
  }
`;

export const ListFilter = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
`;

export const MarketTable = styled.table`
  width: 100%;
`;

export const MarketTHead = styled.thead`
  height: 41px;
  background: ${({ theme }) => theme.color['greyScale-2']};
`;

export const MarketTBody = styled.tbody``;

export const MarketTableRow = styled.tr`
  border-bottom: 1px solid ${({ theme }) => theme.color['greyScale-3']};
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
