import styled from 'styled-components';

export const MarketFilterContainer = styled.div`
  width: calc(1200px - 48px);
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding: 28px 24px;
  background: ${({ theme }) => theme.color['greyScale-2']};
  border-radius: 12px; ;
`;

export const MarketFilterBox = styled.div`
  display: flex;
  gap: 24px;
`;
