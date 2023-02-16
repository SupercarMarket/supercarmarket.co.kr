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

interface MarketCardProps extends WithBlurredImage<MarketDto> {
  variant?: 'row' | 'column';
}

const MarketCard = (props: MarketCardProps) => {
  const { variant = 'column', ...rest } = props;
  return {
    column: <MarketColumn {...rest} />,
    row: <MarketRow {...rest} />,
  }[variant];
};

const MarketColumn = ({
  id,
  carName,
  description,
  fuel,
  base64,
  imgSrc,
  mileage,
  price,
  year,
}: WithBlurredImage<MarketDto>) => {
  const { query } = useRouter();
  const queryString = new URLSearchParams(query as Params).toString();

  const formatter = Intl.NumberFormat('ko-KR', { notation: 'compact' }).format;

  return (
    <Link href={`/market/detail/${id}?${queryString}`}>
      <Container width="100%" display="flex" flexDirection="column" key={id}>
        <Styled.DivideArea style={{ marginBottom: '20px' }}>
          <Wrapper.Item
            css={css`
              position: relative;
              width: 285px;
              height: 180px;
              ${applyMediaQuery('mobile')} {
                width: 178px;
                height: 120px;
              }
            `}
          >
            <Image
              fill
              placeholder={base64 ? 'blur' : undefined}
              blurDataURL={base64 ? base64 : undefined}
              src={imgSrc}
              alt="thumbnail"
              style={{ borderRadius: '4px' }}
              sizes="100%"
            />
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
