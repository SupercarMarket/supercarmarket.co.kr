import * as React from 'react';
import { css } from 'styled-components';
import { applyMediaQuery, Typography, Wrapper } from '@supercarmarket/ui';

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
  const formatter = Intl.NumberFormat('ko').format;

  return (
    <Wrapper
      css={css`
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        margin-top: 20px;
        margin-bottom: 80px;
        padding: 30px 40px 20px 40px;
        border: 1px solid ${({ theme }) => theme.color['greyScale-3']};
        border-radius: 4px;
        box-sizing: border-box;

        ${applyMediaQuery('mobile')} {
          margin-bottom: 32px;
          padding: 16px;
          gap: 16px;
        }
      `}
    >
      <CarInfo subject="연식">{`${year}년형`}</CarInfo>
      <CarInfo subject="주행거리">{`${formatter(mileage)}km`}</CarInfo>
      <CarInfo subject="연료">{fuel}</CarInfo>
      <CarInfo subject="색상">{color}</CarInfo>
      <CarInfo subject="사고여부">{accident ? '유' : '무'}</CarInfo>
      <CarInfo subject="배기량">{`${formatter(cc)}cc`}</CarInfo>
      <CarInfo subject="트랜스미션">{transmissionType}</CarInfo>
    </Wrapper>
  );
};

interface CarInfoProps {
  subject: string;
  children: React.ReactNode;
}

const CarInfo = ({ subject, children }: CarInfoProps) => {
  return (
    <Wrapper
      css={css`
        display: flex;
        align-items: center;
        margin-bottom: 20px;

        ${applyMediaQuery('mobile')} {
          margin-bottom: 0;
        }
      `}
    >
      <Wrapper.Left
        css={css`
          width: 90px;
        `}
      >
        <Typography fontSize="body-16" fontWeight="bold" color="greyScale-5">
          {subject}
        </Typography>
      </Wrapper.Left>
      <Wrapper.Right
        css={css`
          ${({ theme }) => css`
            width: 270px;
            font-weight: ${theme.fontWeight['bold']};
          `}
        `}
      >
        <Typography fontSize="body-16" color="greyScale-6">
          {children}
        </Typography>
      </Wrapper.Right>
    </Wrapper>
  );
};

export default MarketDetailCar;
