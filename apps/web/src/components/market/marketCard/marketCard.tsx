import {
  Container,
  Typography,
  Wrapper,
  applyMediaQuery,
} from '@supercarmarket/ui';
import Link from 'next/link';
import Image from 'next/image';
import Skeleton from 'react-loading-skeleton';
import styled, { css } from 'styled-components';
import { useSearchParams } from 'next/navigation';
import useBase64 from 'hooks/queries/useBase64';
import MarketRow from '../marketRow';
import { MarketDto } from '@supercarmarket/types/market';
import { WithBlurredImage } from '@supercarmarket/types/magazine';

interface MarketCardProps extends WithBlurredImage<MarketDto> {
  variant?: string;
  ranking?: number;
}

const MarketCard = (props: MarketCardProps) => {
  const { variant = 'column', ...rest } = props;
  const { data: base64 } = useBase64(
    rest.imgSrc,
    {
      id: rest.id,
      category: 'market',
    },
    {
      staleTime: 1000 * 60 * 60 * 24,
      cacheTime: Infinity,
    }
  );

  return (
    <>
      {
        {
          column: <MarketColumn {...rest} base64={base64?.data.base64} />,
          row: <MarketRow {...rest} base64={base64?.data.base64} />,
        }[variant]
      }
    </>
  );
};

const MarketColumn = (
  props: WithBlurredImage<MarketDto> & { ranking?: number }
) => {
  const {
    id,
    carName,
    description,
    fuel,
    base64,
    imgSrc,
    mileage,
    price,
    year,
    category,
    ranking,
  } = props;
  const searchParams = useSearchParams().toString();
  const formatter = Intl.NumberFormat('ko-KR', { notation: 'compact' }).format;

  return (
    <Link href={`/market/${category}/${id}?${searchParams}`}>
      <Container
        width="100%"
        display="flex"
        flexDirection="column"
        key={id}
        margin="0 0 10px 0"
      >
        <Wrapper
          css={css`
            margin-bottom: 20px;
            cursor: pointer;

            ${applyMediaQuery('mobile')} {
              margin-bottom: 8px;
            }
          `}
        >
          <Wrapper.Item
            css={css`
              width: 285px;
              position: relative;
              aspect-ratio: 4/3;
              overflow: hidden;

              .react-loading-skeleton {
                width: 285px;
                aspect-ratio: 4/3;
                border-radius: 4px;
              }
              ${applyMediaQuery('mobile')} {
                width: 160px;

                .react-loading-skeleton {
                  width: 160px;
                }
              }
            `}
          >
            {ranking && (
              <Wrapper.Item
                css={css`
                  ${({ theme }) => css`
                    position: absolute;
                    left: 0;
                    z-index: 1;
                    border-top-left-radius: 4px;
                    overflow: hidden;

                    .ranking {
                      position: absolute;
                      left: 12px;
                      top: 7px;
                      color: ${theme.color.white};
                      font-size: ${theme.fontSize['body-16']};
                      font-weight: ${theme.fontWeight.regular};
                    }

                    ${applyMediaQuery('mobile')} {
                      display: none;
                    }
                  `}
                `}
              >
                <p className="ranking">{ranking}</p>
                <svg
                  width="32"
                  height="44"
                  viewBox="0 0 32 44"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M0 44V0H32V44L16 30.0759L0 44Z" fill="#1E1E20" />
                </svg>
              </Wrapper.Item>
            )}
            {base64 ? (
              <Image
                fill
                placeholder="blur"
                blurDataURL={base64}
                src={imgSrc}
                alt="thumbnail"
                style={{ borderRadius: '4px', objectFit: 'cover' }}
                sizes={`${applyMediaQuery('desktop')} 285px, ${applyMediaQuery(
                  'mobile'
                )} 167.5px`}
              />
            ) : (
              <Skeleton />
            )}
          </Wrapper.Item>
        </Wrapper>
        <Typography
          fontSize="header-16"
          fontWeight="bold"
          style={{ marginBottom: '4px' }}
        >
          {carName}
        </Typography>
        <Typography
          fontSize="body-14"
          lineHeight="150%"
          color="greyScale-5"
          style={{ marginBottom: '12.5px' }}
        >
          {description}
        </Typography>
        <Wrapper
          css={css`
            display: flex;
            align-items: center;
            gap: 8px;
            margin-bottom: 12.5px;
          `}
        >
          <Typography fontSize="body-14">{`${year}`}</Typography>
          <Divider />
          <Typography fontSize="body-14">{fuel}</Typography>
          <Divider />
          <Typography fontSize="body-14">{`${formatter(
            mileage
          )}km`}</Typography>
        </Wrapper>
        <Typography fontSize="body-14" fontWeight="bold" color="system-1">
          {price && price === 1
            ? '판매 완료'
            : price !== 1
            ? `${formatter(price * 10000)}원`
            : '상담'}
        </Typography>
      </Container>
    </Link>
  );
};

const Divider = styled.div`
  display: inline-block;
  width: 1px;
  height: 16px;
  background: ${({ theme }) => theme.color['greyScale-4']};
`;

export default MarketCard;
