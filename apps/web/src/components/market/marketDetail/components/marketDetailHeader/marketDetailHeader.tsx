import { Typography, Wrapper } from '@supercarmarket/ui';

import EyeIcon from '../../../../../assets/svg/eye.svg';
import FavoriteBorderIcon from '../../../../../assets/svg/favorite-border.svg';
import * as style from './marketDetailHeader.styled';
import { css } from 'styled-components';

interface MarketDetailHeaderProps {
  year: string;
  regDate: string;
  carName: string;
  fuel: string;
  mileage: number;
  price: number;
  viewCount: number;
  likeCount: number;
  createdDate: string;
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
  createdDate,
}: MarketDetailHeaderProps) => {
  const formatter = Intl.NumberFormat('ko-KR', { notation: 'compact' }).format;

  return (
    <Wrapper css={style.wrapper}>
      <Wrapper.Left css={style.wrapperLeft}>
        <h1>{carName}</h1>
        <p className="market_description">
          {`${year}년형 | ${fuel} | ${formatter(mileage)}km`}
        </p>
      </Wrapper.Left>

      <Wrapper.Right css={style.right}>
        <p className="market_price">
          {price && price === 1
            ? '판매 완료'
            : price !== 1
            ? `${formatter(price * 10000)}원`
            : '상담'}
        </p>
        <Wrapper.Bottom css={style.rightBottom}>
          <Wrapper css={style.iconWrapper}>
            <Typography>
              {new Date(createdDate).toLocaleDateString('us')}
            </Typography>
          </Wrapper>
          <Wrapper
            css={css`
              display: flex;
              gap: 10px;
            `}
          >
            <Wrapper css={style.iconWrapper}>
              <EyeIcon width={20} />
              <Typography>{viewCount}</Typography>
            </Wrapper>
            <Wrapper css={style.iconWrapper}>
              <FavoriteBorderIcon width={20} />
              <Typography>{likeCount}</Typography>
            </Wrapper>
          </Wrapper>
        </Wrapper.Bottom>
      </Wrapper.Right>
    </Wrapper>
  );
};

export default MarketDetailHeader;
