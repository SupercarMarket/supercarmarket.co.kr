import MarketDetailCarousel from 'components/market/market-detail/market-detail-carousel/market-detail-carousel';
import MarketDetailDealer from 'components/market/market-detail/market-detail-dealer/market-detail-dealer';
import MarketDetailHeader from 'components/market/market-detail/market-detail-header/market-detail-header';
import React from 'react';
import { MarketDetailDto, WithBlurredImage } from 'types/market';

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
    dealer,
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
      <MarketDetailDealer dealer={dealer} />
    </>
  );
};

export default MarketDetail;
