'use client';

import styled from 'styled-components';

const MarketCard = styled.div`
  width: 285px;
  height: 302px;
`;

const DivideArea = styled.div`
  cursor: pointer;
`;

const Divider = styled.div`
  display: inline-block;
  width: 1px;
  height: 16px;
  background: ${({ theme }) => theme.color['greyScale-4']};
`;

export { DivideArea, Divider,MarketCard };
