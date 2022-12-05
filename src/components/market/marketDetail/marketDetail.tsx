import Typography from 'components/common/typography';
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
      <Typography fontSize="header-24" fontWeight="bold">
        딜러정보
      </Typography>
      <MarketDetailDealer dealer={dealer} />
      <Typography fontSize="header-24" fontWeight="bold">
        차량정보
      </Typography>
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
      <Typography fontSize="header-24" fontWeight="bold">
        차량소개
      </Typography>
      <MarketDetailIntroduction introduction={introduction} />
      <Typography fontSize="header-24" fontWeight="bold">
        첨부파일
      </Typography>
      <MarketDetailAttached registration={registration} />
      <MarketLike isLike={false} />
    </>
  );
};

export default MarketDetail;
