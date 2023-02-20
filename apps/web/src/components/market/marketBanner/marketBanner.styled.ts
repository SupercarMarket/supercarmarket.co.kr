'use client';

import { applyMediaQuery } from '@supercarmarket/ui';
import styled from 'styled-components';

const MarketBannerContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 34px 40px;
  background: ${({ theme }) => theme.color['greyScale-2']};
  border-radius: 4px;
  ${applyMediaQuery('mobile')} {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
`;

const Paragraph = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const BannerButtonArea = styled.div`
  display: flex;
  align-items: center;
`;

export { BannerButtonArea, MarketBannerContainer, Paragraph };
