import Typography from 'components/common/typography';
import MarketDetailCarousel from 'components/market/market-detail/market-detail-carousel/market-detail-carousel';
import MarketDetailHeader from 'components/market/market-detail/market-detail-header/market-detail-header';
import { FUEL_KIND } from 'constants/market';
import theme from 'constants/theme';
import React from 'react';
import { MarketDetailDto, WithBlurredImage } from 'types/market';
import {
  convertMileageToKilometers,
  convertPriceToWon,
} from 'utils/market/market-list';

import * as S from './market-detail.styled';

interface MarketDetailProps {
  data: MarketDetailDto<WithBlurredImage<{ imgSrc: string }>>;
}

const MarketDetail = ({ data }: MarketDetailProps) => {
  const {
    carName,
    year,
    fuel,
    mileage,
    price,
    regDate,
    viewCount,
    likeCount,
    imgSrc,
  } = data;

  return (
    <>
      <MarketDetailHeader
        carName={carName}
        year={year}
        fuel={fuel}
        likeCount={likeCount}
        mileage={mileage}
        price={price}
        regDate={regDate}
        viewCount={viewCount}
      />
      <MarketDetailCarousel imgSrc={imgSrc} />
    </>
  );
};

export default MarketDetail;
