import Container from 'components/common/container/container';
import Typography from 'components/common/typography';
import { useRouter } from 'next/dist/client/router';
import Image from 'next/image';
import React from 'react';
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
    <Container width="285px" display="flex" flexDirection="column" key={id}>
      <Styled.DivideArea
        style={{ marginBottom: '20px' }}
        onClick={() => onClick(id)}
      >
        <Image
          width={285}
          height={180}
          placeholder="blur"
          blurDataURL={base64}
          src={imgSrc}
          alt="thumbnail"
          style={{ borderRadius: '4px' }}
        />
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
