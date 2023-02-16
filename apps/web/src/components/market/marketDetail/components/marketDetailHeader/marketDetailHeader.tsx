import { Typography, Wrapper } from '@supercarmarket/ui';

import EyeIcon from '../../../../../assets/svg/eye.svg';
import FavoriteBorderIcon from '../../../../../assets/svg/favorite-border.svg';
import * as style from './marketDetailHeader.styled';

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
      <Wrapper.Left>
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
          {`${year}년형 | ${fuel} | ${formatter(mileage)}km`}
        </Typography>
      </Wrapper.Left>

      <Wrapper.Right css={style.right}>
        <Typography
          fontSize="header-24"
          fontWeight="bold"
          color="system-1"
          lineHeight="150%"
          style={{ marginBottom: '15px' }}
        >
          {price ? `${formatter(price * 10000)}원` : '상담'}
        </Typography>
        <Wrapper.Bottom css={style.rightBottom}>
          <Wrapper css={style.iconWrapper}>
            <Typography>
              {new Date(createdDate).toLocaleDateString('us')}
            </Typography>
          </Wrapper>
          <Wrapper css={style.iconWrapper}>
            <EyeIcon width={20} />
            <Typography>{viewCount}</Typography>
          </Wrapper>
          <Wrapper css={style.iconWrapper}>
            <FavoriteBorderIcon width={20} />
            <Typography>{likeCount}</Typography>
          </Wrapper>
        </Wrapper.Bottom>
      </Wrapper.Right>
    </Wrapper>
  );
};

export default MarketDetailHeader;
