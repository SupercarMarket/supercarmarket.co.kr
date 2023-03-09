import { Button, Typography } from '@supercarmarket/ui';
import { CATEGORY } from 'constants/market';
import * as React from 'react';

import ArrowRight from '../../../assets/svg/arrow-right.svg';
import * as Styled from './marketBanner.styled';

const MarketBanner = () => {
  CATEGORY;
  return (
    <Styled.MarketBannerContainer>
      <Styled.Paragraph>
        <Typography fontSize="header-24" fontWeight="bold" display="block">
          판매차량 등록을 원하시나요?
        </Typography>
        <Typography fontSize="body-14" color="greyScale-5" lineHeight="150%">
          판매차량 등록 문의는 딜러 등록을 완료한 후에 가능합니다.
        </Typography>
      </Styled.Paragraph>
      <Styled.BannerButtonArea>
        <Button
          variant="Black"
          border="rounded"
          suffix={<ArrowRight fill="white" />}
        >
          등록 문의하기
        </Button>
      </Styled.BannerButtonArea>
    </Styled.MarketBannerContainer>
  );
};

export default React.memo(MarketBanner);
