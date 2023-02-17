import { Container, Typography, Wrapper } from '@supercarmarket/ui';
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
}: WithBlurredImage<MarketDto>) => {
  const { query } = useRouter();
  const queryString = new URLSearchParams(query as Params).toString();

  const formatter = Intl.NumberFormat('ko-KR', { notation: 'compact' }).format;

  return (
    <Link href={`/market/detail/${id}?${queryString}`}>
      <Container width="100%" display="flex" alignItems="center">
        <Image
          width={196}
          height={124}
          placeholder={base64 ? 'blur' : undefined}
          blurDataURL={base64 ? base64 : undefined}
          src={imgSrc}
          alt="thumbnail"
          style={{ borderRadius: '4px' }}
          sizes="100%"
        />
        <Wrapper.Item
          css={css`
            flex: 1;
            width: 504px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            gap: 8px;
          `}
        >
          <Typography
            fontSize="body-24"
            fontWeight="bold"
            style={{
              padding: '0 30px',
            }}
          >
            {carName}
          </Typography>
          <Typography
            fontSize="body-14"
            color="greyScale-5"
            style={{
              padding: '0 30px',
            }}
          >
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
          `}
        >
          <Typography fontSize="body-14">{year}</Typography>
          <Typography fontSize="body-14">{fuel}</Typography>
          <Typography fontSize="body-14">{`${formatter(
            mileage
          )}km`}</Typography>
          <Typography fontSize="body-14" fontWeight="bold" color="system-1">
            {price ? `${formatter(price * 10000)}원` : '상담'}
          </Typography>
          <Typography fontSize="body-14">{dealer}</Typography>
        </Wrapper.Item>
      </Container>
    </Link>
  );
};

export default MarketRow;
