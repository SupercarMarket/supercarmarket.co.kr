import Container from 'components/common/container';
import React from 'react';
import { WithBlurredImage } from 'types/market';

import * as S from './market-detail-carousel.styled';

interface MarketDetailCarouselProps {
  imgSrc: WithBlurredImage<{ imgSrc: string }>[];
}

const MarketDetailCarousel = ({ imgSrc }: MarketDetailCarouselProps) => {
  console.log(imgSrc);
  return <Container>MarketDetailCarousel</Container>;
};

export default MarketDetailCarousel;
