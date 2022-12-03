import Typography from 'components/common/typography';
import { FUEL_KIND } from 'constants/market';
import theme from 'constants/theme';
import React from 'react';
import { convertPriceToWon } from 'utils/market/marketList';

import EyeIcon from '../../../../../assets/svg/eye.svg';
import FavoriteBorderIcon from '../../../../../assets/svg/favorite-border.svg';
import * as Styled from './marketDetailHeader.styled';

interface MarketDetailHeaderProps {
  year: string;
  regDate: string;
  carName: string;
  fuel: string;
  mileage: number;
  price: number;
  viewCount: number;
  likeCount: number;
}

const MarketDetailHeader = ({
  year,
  regDate,
  carName,
  fuel,
  likeCount,
  mileage,
  price,
  viewCount,
}: MarketDetailHeaderProps) => {
  const [ry, rm] = regDate.split('/');
  const formatter = Intl.NumberFormat('ko', { notation: 'compact' });
  const currencyFormatter = Intl.NumberFormat('ko', {
    currency: 'krw',
    notation: 'compact',
  });
  
  return (
    <Styled.MarketDetailHeaderContainer>
      <div>
        <Typography
          fontSize="header-36"
          fontWeight="bold"
          lineHeight="150%"
          style={{ marginBottom: '8px' }}
        >
          {carName}
        </Typography>
        <br />
        <Typography fontSize="header-14">
          {`${ry}년 ${rm}월식 (${year}년형) | ${
            FUEL_KIND[fuel]
          } | ${formatter.format(mileage)}km`}
        </Typography>
      </div>
      <div style={{ textAlign: 'right' }}>
        <Typography
          fontSize="header-24"
          fontWeight="bold"
          color="system-1"
          lineHeight="150%"
          style={{ marginBottom: '15px' }}
        >
          {price ? `${currencyFormatter.format(price)}만원` : '상담'}
        </Typography>
        <br />
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
          }}
        >
          <Typography color="greyScale-5">
            {new Date(+`20${ry}`, +rm).toLocaleDateString('us')}
          </Typography>
          <EyeIcon width={20} height="100%" fill={theme.color['greyScale-5']} />
          {viewCount}
          <FavoriteBorderIcon
            width={20}
            height="100%"
            fill={theme.color['greyScale-5']}
          />
          {likeCount}
        </div>
      </div>
    </Styled.MarketDetailHeaderContainer>
  );
};

export default MarketDetailHeader;
