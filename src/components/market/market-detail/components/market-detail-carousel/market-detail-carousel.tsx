import Container from 'components/common/container';
import theme from 'constants/theme';
import Image from 'next/image';
import React, { useState } from 'react';
import { WithBlurredImage } from 'types/market';

import ArrowLeftIcon from '../../../../../assets/svg/arrow-left.svg';
import ArrowRightIcon from '../../../../../assets/svg/arrow-right.svg';
import CheckIcon from '../../../../../assets/svg/check.svg';
import * as S from './market-detail-carousel.styled';

interface MarketDetailCarouselProps {
  imgSrc: WithBlurredImage<{ imgSrc: string }>[];
}

const MarketDetailCarousel = ({ imgSrc }: MarketDetailCarouselProps) => {
  const [current, setCurrent] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const isFirst = page === 1;
  const isLast = page === Math.ceil(imgSrc.length / 8);

  const selectImage = (idx: number) => setCurrent(idx);

  const prev = () => {
    if (!isFirst) setPage(page - 1);
  };

  const next = () => {
    if (!isLast) setPage(page + 1);
  };

  return (
    <Container margin="0 0 60px 0">
      <S.MainImageWrapper key={current}>
        <Image
          width={1200}
          height={757}
          alt="image"
          layout="fixed"
          placeholder="blur"
          src={imgSrc[current].imgSrc}
          blurDataURL={imgSrc[current].base64}
        />
      </S.MainImageWrapper>
      <S.CarouselWrapper>
        <S.ArrowButton position="left" onClick={prev} disabled={isFirst}>
          <ArrowLeftIcon width="30px" height="30px" />
        </S.ArrowButton>
        <S.CarouselArea>
          <S.CarouselBox page={page}>
            {imgSrc.map(({ imgSrc, base64 }, idx) => (
              <S.CarouselImageWrapper
                key={imgSrc}
                onClick={() => selectImage(idx)}
              >
                <Image
                  width={141}
                  height={89}
                  layout="fixed"
                  alt="image"
                  placeholder="blur"
                  src={imgSrc}
                  blurDataURL={base64}
                />
                {current === idx && (
                  <S.CheckBox>
                    <CheckIcon
                      width="30px"
                      height="30px"
                      fill={theme.color['greyScale-1']}
                    />
                  </S.CheckBox>
                )}
              </S.CarouselImageWrapper>
            ))}
          </S.CarouselBox>
        </S.CarouselArea>
        <S.ArrowButton position="right" onClick={next} disabled={isLast}>
          <ArrowRightIcon width="30px" height="30px" />
        </S.ArrowButton>
      </S.CarouselWrapper>
    </Container>
  );
};

export default MarketDetailCarousel;
