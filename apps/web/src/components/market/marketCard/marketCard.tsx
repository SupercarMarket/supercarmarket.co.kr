import {
  Container,
  Typography,
  Wrapper,
  applyMediaQuery,
} from '@supercarmarket/ui';
import { MarketDto } from '@supercarmarket/types/market';
import { WithBlurredImage } from '@supercarmarket/types/magazine';
import Image from 'next/image';
import Link from 'next/link';
import { css } from 'styled-components';

import MarketRow from '../marketRow';
import * as Styled from './marketCard.styled';
import { useRouter } from 'next/router';
import { Params } from '@supercarmarket/types/base';
import useBase64 from 'hooks/queries/useBase64';
import Skeleton from 'react-loading-skeleton';

interface MarketCardProps extends WithBlurredImage<MarketDto> {
  variant?: string;
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

const MarketColumn = (props: WithBlurredImage<MarketDto>) => {
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
  } = props;
  const { query } = useRouter();
  const queryString = new URLSearchParams(query as Params).toString();

  const formatter = Intl.NumberFormat('ko-KR', { notation: 'compact' }).format;

  return (
    <Link href={`/market/${category}/${id}?${queryString}`}>
      <Container width="100%" display="flex" flexDirection="column" key={id}>
        <Styled.DivideArea style={{ marginBottom: '20px' }}>
          <Wrapper.Item
            css={css`
              position: relative;
              width: 285px;
              height: 180px;
              .react-loading-skeleton {
                width: 285px;
                height: 180px;
                border-radius: 4px;
              }
              ${applyMediaQuery('mobile')} {
                width: 167.5px;
                height: 106px;
                .react-loading-skeleton {
                  width: 167.5px;
                  height: 106px;
                }
              }
            `}
          >
            {base64 ? (
              <Image
                fill
                placeholder="blur"
                blurDataURL={base64}
                src={imgSrc}
                alt="thumbnail"
                style={{ borderRadius: '4px' }}
                sizes="100%"
              />
            ) : (
              <Skeleton />
            )}
          </Wrapper.Item>
        </Styled.DivideArea>
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
        <Styled.DivideArea
          style={{
            display: 'flex',
            alignContent: 'center',
            gap: '8px',
            marginBottom: '12.5px',
          }}
        >
          <Typography fontSize="body-14">{`${year}`}</Typography>
          <Styled.Divider />
          <Typography fontSize="body-14">{fuel}</Typography>
          <Styled.Divider />
          <Typography fontSize="body-14">{`${formatter(
            mileage
          )}km`}</Typography>
        </Styled.DivideArea>
        <Typography fontSize="body-14" fontWeight="bold" color="system-1">
          {price ? `${formatter(price * 10000)}원` : '상담'}
        </Typography>
      </Container>
    </Link>
  );
};

export default MarketCard;
