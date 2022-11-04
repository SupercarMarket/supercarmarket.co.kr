import Image from 'next/image';
import { MarketDto, WithBlurredImage } from 'types/market';

import Container from '../container';
import Typography from '../typography';

const MarketCard = ({ carName, imgSrc, base64 }: WithBlurredImage<MarketDto>) => {
  return (
    <Container
      position="relative"
      display="flex"
      flexDirection="column"
      width="280px"
    >
      <Image
        src={imgSrc}
        alt="thumbnail"
        width={280}
        height={180}
        layout="fixed"
        placeholder="blur"
        blurDataURL={base64}
        style={{
          borderRadius: '4px',
        }}
      />
      <Typography
        fontSize="header-16"
        fontWeight="bold"
        color="greyScale-6"
        lineHeight="120%"
        style={{
          marginTop: '20px',
        }}
      >
        {carName}
      </Typography>
      <Typography
        fontSize="body-14"
        fontWeight="regular"
        color="greyScale-5"
        lineHeight="150%"
        style={{
          marginTop: '4px',
        }}
      >
        무사고 | 짧은 주행
      </Typography>
      <Typography
        fontSize="body-14"
        fontWeight="bold"
        color="greyScale-6"
        lineHeight="150%"
        style={{
          marginTop: '10px',
        }}
      >
        22/06 | 가솔린 | 3천km
      </Typography>
      <Typography
        fontSize="body-14"
        fontWeight="bold"
        color="system-1"
        lineHeight="120%"
        style={{
          marginTop: '10px',
        }}
      >
        상담
      </Typography>
    </Container>
  );
};

export default MarketCard;
