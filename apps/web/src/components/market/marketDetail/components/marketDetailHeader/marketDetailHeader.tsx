import { css } from 'styled-components';

import { applyMediaQuery, Typography, Wrapper } from '@supercarmarket/ui';
import EyeIcon from '../../../../../assets/svg/eye.svg';
import FavoriteBorderIcon from '../../../../../assets/svg/favorite-border.svg';

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
    <Wrapper
      css={css`
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 40px;

        ${applyMediaQuery('mobile')} {
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
          margin-bottom: 35px;
        }
      `}
    >
      <Wrapper.Left
        css={css`
          ${({ theme }) => css`
            h1 {
              font-size: ${theme.fontSize['header-36']};
              font-weight: ${theme.fontWeight['bold']};
              line-height: 150%;
              margin-bottom: 8px;
            }

            .market_description {
              font-size: ${theme.fontSize['body-14']};
            }

            ${applyMediaQuery('mobile')} {
              h1 {
                font-size: ${theme.fontSize['header-20']};
                margin-bottom: 6px;
              }

              .market_description {
                display: none;
              }
            }
          `}
        `}
      >
        <h1>{carName}</h1>
        <p className="market_description">
          {`${year}년형 | ${fuel} | ${formatter(mileage)}km`}
        </p>
      </Wrapper.Left>

      <Wrapper.Right
        css={css`
          ${({ theme }) => css`
            text-align: right;

            .market_price {
              font-size: ${theme.fontSize['header-24']};
              font-weight: ${theme.fontWeight['bold']};
              color: ${theme.color['system-1']};
              line-height: 150%;
              margin-bottom: 15px;
            }

            ${applyMediaQuery('mobile')} {
              .market_price {
                font-size: ${theme.fontSize['header-20']};
                text-align: left;
                margin-bottom: 6px;
              }
            }
          `}
        `}
      >
        <p className="market_price">
          {price && price === 1
            ? '판매 완료'
            : price !== 0
            ? `${formatter(price * 10000)}원`
            : '상담'}
        </p>
        <Wrapper.Bottom
          css={css`
            ${({ theme }) => css`
              display: flex;
              align-items: center;
              gap: 10px;
              color: ${theme.color['greyScale-5']};
              font-size: ${theme.fontSize['body-16']};

              svg {
                fill: ${theme.color['greyScale-5']};
              }

              ${applyMediaQuery('mobile')} {
                align-items: flex-start;
                flex-direction: column;
                font-size: ${theme.fontSize['body-12']};

                svg {
                  width: 14px;
                }
              }
            `}
          `}
        >
          <Wrapper
            css={css`
              display: flex;
              align-items: center;
              gap: 5px;
            `}
          >
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
            <Wrapper
              css={css`
                display: flex;
                align-items: center;
                gap: 5px;
              `}
            >
              <EyeIcon width={20} />
              <Typography>{viewCount}</Typography>
            </Wrapper>
            <Wrapper
              css={css`
                display: flex;
                align-items: center;
                gap: 5px;
              `}
            >
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
