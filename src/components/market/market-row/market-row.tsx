import Typography from 'components/common/typography';
import { FUEL_KIND } from 'constants/market';
import Image from 'next/image';
import React from 'react';
import { WithBlurredImage } from 'types/magazine';
import { MarketDto } from 'types/market';
import {
  convertMileageToKilometers,
  convertPriceToWon,
} from 'utils/market/market-list';

import * as S from './market-row.styled';

const MarketRow = ({
  id,
  base64,
  carName,
  description,
  fuel,
  imgSrc,
  mileage,
  price,
  dealer,
  year,
}: WithBlurredImage<MarketDto>) => {
  return (
    <S.MarketTableRow key={id}>
      <S.MarketTableData>
        <Image
          width={196}
          height={124}
          placeholder="blur"
          blurDataURL={base64}
          layout="fixed"
          src={imgSrc}
          alt="thumbnail"
          style={{ borderRadius: '4px' }}
        />
      </S.MarketTableData>
      <S.MarketTableData>
        <S.CarInformation>
          <Typography fontSize="body-24" fontWeight="bold">
            {carName}
          </Typography>
          <Typography fontSize="body-14" color="greyScale-5">
            {description}
          </Typography>
        </S.CarInformation>
      </S.MarketTableData>
      <S.MarketTableData>
        <Typography fontSize="body-14">{year}</Typography>
      </S.MarketTableData>
      <S.MarketTableData>
        <Typography fontSize="body-14">{FUEL_KIND[fuel]}</Typography>
      </S.MarketTableData>
      <S.MarketTableData>
        <Typography fontSize="body-14">
          {convertMileageToKilometers(mileage)}
        </Typography>
      </S.MarketTableData>
      <S.MarketTableData>
        <Typography fontSize="body-14" fontWeight="bold" color="system-1">
          {price ? convertPriceToWon(price) : '상담'}
        </Typography>
      </S.MarketTableData>
      <S.MarketTableData
        style={{ width: '120px', wordBreak: 'break-all', padding: '15px' }}
      >
        <Typography fontSize="body-14">{dealer}</Typography>
      </S.MarketTableData>
    </S.MarketTableRow>
  );
};

export default MarketRow;
