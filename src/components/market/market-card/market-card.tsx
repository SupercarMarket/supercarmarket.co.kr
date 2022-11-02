import Typography from 'components/common/typography';
import { FUEL_KIND } from 'constants/market';
import Image from 'next/image';
import React from 'react';
import { WithBlurredImage } from 'types/magazine';
import { MarketDto } from 'types/market';
import { convertMileagePlusKilometers } from 'utils/market/market-list';

import * as S from './market-card.styled';

const MarketCard = ({
  id,
  carName,
  comment,
  fuel,
  base64,
  imgSrc,
  mileage,
  price,
  year,
}: WithBlurredImage<MarketDto>) => {
  return (
    <S.MarketCard key={id}>
      <S.DivideArea style={{ marginBottom: '20px' }}>
        <Image
          width={285}
          height={180}
          placeholder="blur"
          blurDataURL={base64}
          layout="fixed"
          src={imgSrc}
          alt="thumbnail"
          style={{ borderRadius: '4px' }}
        />
      </S.DivideArea>
      <S.DivideArea style={{ marginBottom: '4px' }}>
        <Typography fontSize="header-16" fontWeight="bold">
          {carName}
        </Typography>
      </S.DivideArea>
      <S.DivideArea style={{ marginBottom: '12.5px' }}>
        <Typography fontSize="body-14" lineHeight="150%" color="greyScale-5">
          {comment}
        </Typography>
      </S.DivideArea>
      <S.DivideArea
        style={{
          display: 'flex',
          alignContent: 'center',
          gap: '8px',
          marginBottom: '12.5px',
        }}
      >
        <Typography fontSize="body-14">{year}</Typography>
        <S.Divider />
        <Typography fontSize="body-14">{FUEL_KIND[fuel]}</Typography>
        <S.Divider />
        <Typography fontSize="body-14">
          {convertMileagePlusKilometers(mileage)}
        </Typography>
      </S.DivideArea>
      <S.DivideArea>
        <Typography fontSize="body-14" color="system-1">
          {price ? price : '상담'}
        </Typography>
      </S.DivideArea>
    </S.MarketCard>
  );
};

export default MarketCard;
