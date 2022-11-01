import styled from 'styled-components';

export const MarketSelectContainer = styled.div``;

export const FilterBox = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const Hyphen = styled.div`
  width: 8px;
  height: 1px;
  background: ${({ theme }) => theme.color['greyScale-6']};
`;
