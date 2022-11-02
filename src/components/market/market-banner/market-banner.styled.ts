import styled from 'styled-components';

export const MarketBannerContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 122px;
  padding: 34px 40px;
  background: ${({ theme }) => theme.color['greyScale-2']};
  border-radius: 4px;
`;

export const Paragraph = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const BannerButtonArea = styled.div`
  display: flex;
  align-items: center;
`;
