import {
  MarketDetailAttached,
  MarketDetailCar,
  MarketDetailCarousel,
  MarketDetailDealer,
  MarketDetailHeader,
  MarketDetailIntroduction,
  MarketLike,
} from 'components/market/marketDetail/components';
import React from 'react';
import { MarketDetailDto, WithBlurredImage } from 'types/market';

interface MarketDetailProps {
  data: MarketDetailDto<WithBlurredImage<{ imgSrc: string }>>;
}

const MarketDetail = ({ data }: MarketDetailProps) => {
  console.log(data);

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
        regDate={regDate}
        mileage={mileage}
        fuel={fuel}
        color={color}
        accident={accident}
        cc={cc}
        transmissionType={trasmissionType}
      />
      <MarketDetailIntroduction introduction={introduction} />
      <MarketDetailAttached registration={registration} />
      <MarketLike isLike={false} />
    </>
  );
};

export default MarketDetail;
