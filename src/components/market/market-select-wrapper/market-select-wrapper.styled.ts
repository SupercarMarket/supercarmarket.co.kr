import styled from 'styled-components';

export const MarketSelectWrapperContainer = styled.div``;

export const SelectWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const Hyphen = styled.div`
  width: 8px;
  height: 1px;
  background: ${({ theme }) => theme.color['greyScale-6']};
`;
