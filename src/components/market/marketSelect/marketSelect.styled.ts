'use client';

import styled from 'styled-components';

const MarketSelectContainer = styled.div``;

const FilterBox = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const Hyphen = styled.div`
  width: 8px;
  height: 1px;
  background: ${({ theme }) => theme.color['greyScale-6']};
`;

export { FilterBox, Hyphen, MarketSelectContainer };
