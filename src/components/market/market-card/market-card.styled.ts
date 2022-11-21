import styled from 'styled-components';

export const MarketCard = styled.div`
  width: 285px;
  height: 302px;
`;

export const DivideArea = styled.div`
  cursor: pointer;
`;

export const Divider = styled.div`
  display: inline-block;
  width: 1px;
  height: 16px;
  background: ${({ theme }) => theme.color['greyScale-4']};
`;
