import Typography from 'components/common/typography';
import Wrapper from 'components/common/wrapper';
import { FUEL_KIND } from 'constants/market';
import React, { ReactNode } from 'react';

import * as Styled from './marketDetailCar.styled';

interface MarketDetailCarProps {
  year: string;
  regDate: string;
  mileage: number;
  fuel: string;
  color: string;
  accident: boolean;
  cc: number;
  transmissionType: string;
}

const MarketDetailCar = ({
  year,
  regDate,
  mileage,
  fuel,
  color,
  accident,
  cc,
  transmissionType,
}: MarketDetailCarProps) => {
  const [ry, rm] = regDate.split('/');
  const formatter = Intl.NumberFormat('ko');

  return (
    <Wrapper css={Styled.wrapper}>
      <CarInfo subject="연식">{`${ry}년형 ${rm}월식`}</CarInfo>
      <CarInfo subject="주행거리">{`${formatter.format(mileage)}km`}</CarInfo>
      <CarInfo subject="연료">{FUEL_KIND[fuel]}</CarInfo>
      <CarInfo subject="색상">{color}</CarInfo>
      <CarInfo subject="사고여부">{accident ? '유' : '무'}</CarInfo>
      <CarInfo subject="형식연도">{`${year}년형`}</CarInfo>
      <CarInfo subject="배기량">{`${formatter.format(cc)}cc`}</CarInfo>
      <CarInfo subject="트랜스미션">{transmissionType}</CarInfo>
    </Wrapper>
  );
};

interface CarInfoProps {
  subject: string;
  children: ReactNode;
}

const CarInfo = ({ subject, children }: CarInfoProps) => {
  return (
    <Styled.Info>
      <Styled.Subject>
        <Typography fontSize="body-16" fontWeight="bold" color="greyScale-5">
          {subject}
        </Typography>
      </Styled.Subject>
      <Styled.Content>
        <Typography fontSize="body-16" color="greyScale-6">
          {children}
        </Typography>
      </Styled.Content>
    </Styled.Info>
  );
};

export default MarketDetailCar;
