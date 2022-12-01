import Typography from 'components/common/typography';
import { FUEL_KIND } from 'constants/market';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import { WithBlurredImage } from 'types/magazine';
import { MarketDto } from 'types/market';
import {
  convertMileageToKilometers,
  convertPriceToWon,
} from 'utils/market/marketList';

import * as Styled from './marketRow.styled';

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
  const { push } = useRouter();

  const onClick = (id: string) => {
    push(`/market/detail/${id}`);
  };

  return (
    <Styled.MarketTableRow key={id} onClick={() => onClick(id)}>
      <Styled.MarketTableData>
        <Image
          width={196}
          height={124}
          placeholder="blur"
          blurDataURL={base64}
          src={imgSrc}
          alt="thumbnail"
          style={{ borderRadius: '4px' }}
        />
      </Styled.MarketTableData>
      <Styled.MarketTableData>
        <Styled.CarInformation>
          <Typography fontSize="body-24" fontWeight="bold">
            {carName}
          </Typography>
          <Typography fontSize="body-14" color="greyScale-5">
            {description}
          </Typography>
        </Styled.CarInformation>
      </Styled.MarketTableData>
      <Styled.MarketTableData>
        <Typography fontSize="body-14">{year}</Typography>
      </Styled.MarketTableData>
      <Styled.MarketTableData>
        <Typography fontSize="body-14">{FUEL_KIND[fuel]}</Typography>
      </Styled.MarketTableData>
      <Styled.MarketTableData>
        <Typography fontSize="body-14">
          {convertMileageToKilometers(mileage)}
        </Typography>
      </Styled.MarketTableData>
      <Styled.MarketTableData>
        <Typography fontSize="body-14" fontWeight="bold" color="system-1">
          {price ? convertPriceToWon(price) : '상담'}
        </Typography>
      </Styled.MarketTableData>
      <Styled.MarketTableData
        style={{ width: '120px', wordBreak: 'break-all', padding: '15px' }}
      >
        <Typography fontSize="body-14">{dealer}</Typography>
      </Styled.MarketTableData>
    </Styled.MarketTableRow>
  );
};

export default MarketRow;
