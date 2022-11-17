import {
  MarketDetailAttached,
  MarketDetailCar,
  MarketDetailCarousel,
  MarketDetailDealer,
  MarketDetailHeader,
  MarketDetailIntroduction,
} from 'components/market/market-detail/components';
import React from 'react';
import { MarketDetailDto, WithBlurredImage } from 'types/market';

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
    color,
    accident,
    cc,
    trasmissionType,
    introduction,
    registration,
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
      <MarketDetailCar
        year={year}
        mileage={mileage}
        fuel={fuel}
        color={color}
        accident={accident}
        cc={cc}
        transmissionType={trasmissionType}
      />
      <MarketDetailIntroduction introduction={introduction} />
      <MarketDetailAttached registration={registration} />
    </>
  );
};

export default MarketDetail;
