import Button from 'components/common/button';
import Typography from 'components/common/typography';
import React, { memo } from 'react';

import ArrowRight from '../../../assets/svg/arrow-right.svg';
import * as S from './market-banner.styled';

const MarketBanner = () => {
  return (
    <S.MarketBannerContainer>
      <S.Paragraph>
        <Typography fontSize="header-24" fontWeight="bold" display="block">
          판매차량 등록을 원하시나요?
        </Typography>
        <Typography fontSize="body-14" color="greyScale-5" lineHeight="150%">
          판매차량 등록 문의는 딜러 등록을 완료한 후에 가능합니다.
        </Typography>
      </S.Paragraph>
      <S.BannerButtonArea>
        <Button
          variant="Black"
          border="rounded"
          suffix={<ArrowRight fill="white" />}
        >
          등록 문의하기
        </Button>
      </S.BannerButtonArea>
    </S.MarketBannerContainer>
  );
};

export default memo(MarketBanner);
