import {
  Container,
  Typography,
  Wrapper,
  applyMediaQuery,
} from '@supercarmarket/ui';
import Image from 'next/image';
import Link from 'next/link';
import { css } from 'styled-components';
import type { WithBlurredImage } from '@supercarmarket/types/magazine';
import type { MarketDto } from '@supercarmarket/types/market';
import { useRouter } from 'next/router';
import { Params } from '@supercarmarket/types/base';

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
            ${applyMediaQuery('mobile')} {
              width: 126px;
              height: 126px;
              & > img {
                object-fit: cover;
              }
            }
          `}
        >
          <Image
            placeholder={base64 ? 'blur' : undefined}
            blurDataURL={base64 ? base64 : undefined}
            src={imgSrc}
            alt="thumbnail"
            style={{ borderRadius: '4px' }}
            fill
          />
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
              width: 504px;
              display: flex;
              flex-direction: column;
              box-sizing: border-box;
              padding-left: 30px;
              gap: 8px;

              ${applyMediaQuery('mobile')} {
                width: 100%;
                padding: 0 15px;

                & span {
                  width: 200px;
                  display: -webkit-box;
                  overflow: hidden;
                  white-space: normal;
                  text-overflow: ellipsis;
                  -webkit-line-clamp: 2;
                  -webkit-box-orient: vertical;
                  word-break: break-all;
                }
              }
            `}
          >
            <Typography
              className="car-name"
              fontSize="body-24"
              fontWeight="bold"
              lineHeight="120%"
              space
            >
              {carName}
            </Typography>
            <Typography fontSize="body-14" color="greyScale-5">
              {description}
            </Typography>
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
                padding: 0 15px;
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
                & > span {
                  width: 100px;
                  text-align: center;
                }
                ${applyMediaQuery('mobile')} {
                  gap: 8px;
                  & > span {
                    width: auto;
                    :not(:first-child):before {
                    }
                  }
                }
              `}
            >
              <Typography fontSize="body-14">{year}</Typography>
              <Typography fontSize="body-14">{fuel}</Typography>
              <Typography fontSize="body-14">{`${formatter(
                mileage
              )}km`}</Typography>
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
                {price ? `${formatter(price * 10000)}원` : '상담'}
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
