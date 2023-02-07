import Container from 'components/common/container/container';
import Typography from 'components/common/typography';
import Wrapper from 'components/common/wrapper';
import { useRouter } from 'next/dist/client/router';
import Image from 'next/image';
import React from 'react';
import { css } from 'styled-components';
import { applyMediaQuery } from 'styles/mediaQuery';
import { WithBlurredImage } from 'types/magazine';
import { MarketDto } from 'types/market';

import * as Styled from './marketCard.styled';

const MarketCard = ({
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
  const { push, asPath } = useRouter();
  const formatter = Intl.NumberFormat('ko-KR', { notation: 'compact' }).format;

  const onClick = (id: string) => {
    const query = asPath.split('?')[1];
    push(`/market/detail/${id}?${query}`);
  };

  return (
    <Container width="100%" display="flex" flexDirection="column" key={id}>
      <Styled.DivideArea
        style={{ marginBottom: '20px' }}
        onClick={() => onClick(id)}
      >
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
        <Typography fontSize="body-14">{`${formatter(mileage)}km`}</Typography>
      </Styled.DivideArea>
      <Typography fontSize="body-14" fontWeight="bold" color="system-1">
        {price ? `${formatter(price * 10000)}원` : '상담'}
      </Typography>
    </Container>
  );
};

export default MarketCard;
