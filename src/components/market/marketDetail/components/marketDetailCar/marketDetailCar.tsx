import Container from 'components/common/container/container';
import Typography from 'components/common/typography';
import { FUEL_KIND } from 'constants/market';
import React, { ReactNode } from 'react';
import { convertMileageToKilometers } from 'utils/market/marketList';

import * as Styled from './marketDetailCar.styled';

interface MarketDetailCarProps {
  year: string;
  mileage: number;
  fuel: string;
  color: string;
  accident: boolean;
  cc: number;
  transmissionType: string;
}

const MarketDetailCar = ({
  year,
  mileage,
  fuel,
  color,
  accident,
  cc,
  transmissionType,
}: MarketDetailCarProps) => {
  const [y, m] = year.split('/');
  return (
    <Container margin="0 0 80px 0">
      <Typography fontSize="header-24" fontWeight="bold">
        차량정보
      </Typography>
      <Styled.CarInfoCard>
        <CarInfo subject="연식">{`${y}년형 ${m}월식`}</CarInfo>
        <CarInfo subject="주행거리">{convertMileageToKilometers(mileage)}</CarInfo>
        <CarInfo subject="연료">{FUEL_KIND[fuel]}</CarInfo>
        <CarInfo subject="색상">{color}</CarInfo>
        <CarInfo subject="사고여부">{accident ? '유' : '무'}</CarInfo>
        <CarInfo subject="형식연도">{`${y}년형`}</CarInfo>
        <CarInfo subject="배기량">{`${cc}cc`}</CarInfo>
        <CarInfo subject="트랜스미션">{transmissionType}</CarInfo>
      </Styled.CarInfoCard>
    </Container>
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
