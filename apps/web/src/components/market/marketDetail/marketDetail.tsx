import { Typography } from '@supercarmarket/ui';
import type { MarketDetailDto } from '@supercarmarket/types/market';
import {
  MarketDetailAttached,
  MarketDetailCar,
  MarketDetailCarousel,
  MarketDetailDealer,
  MarketDetailHeader,
  MarketDetailIntroduction,
} from 'components/market/marketDetail/components';

interface MarketDetailProps {
  data: MarketDetailDto<string>;
  id: string;
}

const MarketDetail = ({ data, id }: MarketDetailProps) => {
  const {
    carName,
    year,
    fuel,
    mileage,
    price,
    regDate,
    view,
    likeCount,
    imgSrc,
    dealer,
    color,
    accident,
    cc,
    trasmissionType,
    introduction,
    registration,
    attSrc,
    createdDate,
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
        viewCount={view}
        createdDate={createdDate}
      />
      {imgSrc.length > 0 && <MarketDetailCarousel imgSrc={imgSrc} id={id} />}
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
      <MarketDetailAttached registration={registration} attrSrc={attSrc} />
    </>
  );
};

export default MarketDetail;
