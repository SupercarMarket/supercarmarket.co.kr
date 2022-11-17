import styled, { css } from 'styled-components';

const MarketTable = styled.table`
  width: 100%;
  margin-bottom: 80px;
`;

const MarketTHead = styled.thead`
  height: 41px;
  background: ${({ theme }) => theme.color['greyScale-2']};
`;

const MarketTBody = styled.tbody``;

interface TableHeadProps {
  width?: string;
}

const MarketTableRow = styled.tr`
  border-bottom: 1px solid ${({ theme }) => theme.color['greyScale-3']};
`;

const MarketTableHead = styled.th<TableHeadProps>`
  vertical-align: middle;
  ${({ width }) =>
    width &&
    css`
      width: ${width}px;
    `}
`;
export {
  MarketTable,
  MarketTableHead,
  MarketTableRow,
  MarketTBody,
  MarketTHead,
};
