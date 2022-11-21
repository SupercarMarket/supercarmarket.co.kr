import Container from 'components/common/container/container';
import Typography from 'components/common/typography';
import { FUEL_KIND } from 'constants/market';
import { useRouter } from 'next/dist/client/router';
import Image from 'next/image';
import React from 'react';
import { WithBlurredImage } from 'types/magazine';
import { MarketDto } from 'types/market';
import { convertMileageToKilometers } from 'utils/market/market-list';

import * as S from './market-card.styled';

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
  const { push } = useRouter();

  const onClick = (id: string) => {
    push(`/market/detail/${id}`);
  };

  return (
    <Container width="285px" display="flex" flexDirection="column" key={id}>
      <S.DivideArea
        style={{ marginBottom: '20px' }}
        onClick={() => onClick(id)}
      >
        <Image
          width={285}
          height={180}
          placeholder="blur"
          blurDataURL={base64}
          layout="fixed"
          src={imgSrc}
          alt="thumbnail"
          style={{ borderRadius: '4px' }}
        />
      </S.DivideArea>
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
      <S.DivideArea
        style={{
          display: 'flex',
          alignContent: 'center',
          gap: '8px',
          marginBottom: '12.5px',
        }}
      >
        <Typography fontSize="body-14">{`${year}`}</Typography>
        <S.Divider />
        <Typography fontSize="body-14">{FUEL_KIND[fuel]}</Typography>
        <S.Divider />
        <Typography fontSize="body-14">
          {convertMileageToKilometers(mileage)}
        </Typography>
      </S.DivideArea>
      <Typography fontSize="body-14" fontWeight="bold" color="system-1">
        {price ? price : '상담'}
      </Typography>
    </Container>
  );
};

export default MarketCard;
