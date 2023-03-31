import { Typography, Wrapper, applyMediaQuery } from '@supercarmarket/ui';
import Image from 'next/image';
import Link from 'next/link';
import { css } from 'styled-components';
import type { WithBlurredImage } from '@supercarmarket/types/magazine';
import type { MarketDto } from '@supercarmarket/types/market';
import { useRouter } from 'next/router';
import { Params } from '@supercarmarket/types/base';
import Skeleton from 'react-loading-skeleton';

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
  category,
}: WithBlurredImage<MarketDto>) => {
  const { query } = useRouter();
  const queryString = new URLSearchParams(query as Params).toString();

  const formatter = Intl.NumberFormat('ko-KR', { notation: 'compact' }).format;

  return (
    <Link href={`/market/${category}/${id}?${queryString}`}>
      <Wrapper
        css={css`
          width: 100%;
          display: flex;
          align-items: center;
          ${applyMediaQuery('mobile')} {
            align-items: flex-start;
          }
        `}
      >
        <Wrapper.Item
          css={css`
            position: relative;
            overflow: hidden;
            width: 196px;
            height: 124px;
            .react-loading-skeleton {
              width: 196px;
              height: 124px;
              border-radius: 4px;
            }
            ${applyMediaQuery('mobile')} {
              width: 126px;
              height: 126px;
              & > img {
                object-fit: cover;
              }
              .react-loading-skeleton {
                width: 126px;
                height: 126px;
              }
            }
          `}
        >
          {base64 ? (
            <Image
              placeholder="blur"
              blurDataURL={base64}
              src={imgSrc}
              alt="thumbnail"
              style={{ borderRadius: '4px' }}
              fill
              sizes={`${applyMediaQuery('desktop')} 196px, ${applyMediaQuery(
                'mobile'
              )} 126px`}
            />
          ) : (
            <Skeleton />
          )}
        </Wrapper.Item>
        <Wrapper.Item
          css={css`
            flex: 1;
            display: flex;
            align-items: center;
            ${applyMediaQuery('mobile')} {
              width: auto;
              flex-direction: column;
              align-items: flex-start;
              gap: 8px;
            }
          `}
        >
          <Wrapper.Item
            css={css`
              ${({ theme }) => css`
                width: 504px;
                display: flex;
                flex-direction: column;
                box-sizing: border-box;
                padding-left: 30px;
                gap: 8px;

                .car-name {
                  font-size: ${theme.fontSize['body-24']};
                  font-weight: ${theme.fontWeight.bold};
                  line-height: 150%;
                  text-overflow: ellipsis;
                  overflow: hidden;
                  white-space: nowrap;
                }

                .car-description {
                  font-size: ${theme.fontSize['body-14']};
                  color: ${theme.color['greyScale-5']};
                }

                ${applyMediaQuery('mobile')} {
                  width: 100%;
                  padding-left: 12px;

                  .car-name {
                    font-size: ${theme.fontSize['body-14']};
                    max-height: 50px;
                    display: -webkit-box;
                    white-space: initial;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                  }

                  .car-description {
                    font-size: ${theme.fontSize['body-12']};
                  }
                }
              `}
            `}
          >
            <p className="car-name">{carName}</p>
            <p className="car-description">{description}</p>
          </Wrapper.Item>
          <Wrapper.Item
            css={css`
              display: flex;
              & > span {
                width: 100px;
                text-align: center;
              }
              ${applyMediaQuery('mobile')} {
                flex-direction: column;
                padding-left: 12px;
                gap: 8px;

                & > span {
                  width: auto;
                }
              }
            `}
          >
            <Wrapper.Item
              css={css`
                display: flex;
                .dealer-info {
                  width: 100px;
                  text-align: center;
                }
                .vertical-bar {
                  display: none;
                }
                ${applyMediaQuery('mobile')} {
                  gap: 8px;
                  .dealer-info {
                    width: auto;
                    text-align: center;
                  }
                  .vertical-bar {
                    display: inline;
                  }
                }
              `}
            >
              <Typography className="dealer-info" fontSize="body-14">
                {year}
              </Typography>
              <Wrapper className="vertical-bar">|</Wrapper>
              <Typography className="dealer-info" fontSize="body-14">
                {fuel}
              </Typography>
              <Wrapper className="vertical-bar">|</Wrapper>
              <Typography
                className="dealer-info"
                fontSize="body-14"
              >{`${formatter(mileage)}km`}</Typography>
            </Wrapper.Item>
            <Wrapper.Item
              css={css`
                width: 100px;
                text-align: center;
                ${applyMediaQuery('mobile')} {
                  text-align: initial;
                }
              `}
            >
              <Typography fontSize="body-14" fontWeight="bold" color="system-1">
                {price && price === 1
                  ? '판매 완료'
                  : price !== 1
                  ? `${formatter(price * 10000)}원`
                  : '상담'}
              </Typography>
            </Wrapper.Item>
            <Wrapper.Item
              css={css`
                width: 100px;
                text-align: center;
                ${applyMediaQuery('mobile')} {
                  display: none;
                }
              `}
            >
              <Typography fontSize="body-14">{dealer}</Typography>
            </Wrapper.Item>
          </Wrapper.Item>
        </Wrapper.Item>
      </Wrapper>
    </Link>
  );
};

export default MarketRow;
