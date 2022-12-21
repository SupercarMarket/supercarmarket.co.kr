import Wrapper from 'components/common/wrapper/wrapper';
import theme from 'constants/theme';
import Image from 'next/image';
import React, { useState } from 'react';
import { css } from 'styled-components';
import { WithBlurredImage } from 'types/market';

import ArrowLeftIcon from '../../../../../assets/svg/arrow-left.svg';
import ArrowRightIcon from '../../../../../assets/svg/arrow-right.svg';
import CheckIcon from '../../../../../assets/svg/check.svg';
import * as Styled from './marketDetailCarousel.styled';

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
    <Wrapper
      css={css`
        margin-bottom: 60px;
      `}
    >
      <Wrapper.Top css={Styled.top} key={current}>
        <Image
          width={1200}
          height={757}
          alt="image"
          placeholder="blur"
          src={imgSrc[current].imgSrc}
          blurDataURL={imgSrc[current].base64}
        />
      </Wrapper.Top>
      <Wrapper.Bottom css={Styled.bottom}>
        <Styled.ArrowButton position="left" onClick={prev} disabled={isFirst}>
          <ArrowLeftIcon width="30px" height="30px" />
        </Styled.ArrowButton>
        <Styled.CarouselArea>
          <Styled.CarouselBox page={page}>
            {imgSrc.map(({ imgSrc, base64 }, idx) => (
              <Styled.CarouselImageWrapper
                key={imgSrc}
                onClick={() => selectImage(idx)}
              >
                <Image
                  width={141}
                  height={89}
                  alt="image"
                  placeholder="blur"
                  src={imgSrc}
                  blurDataURL={base64}
                />
                {current === idx && (
                  <Styled.CheckBox>
                    <CheckIcon
                      width="30px"
                      height="30px"
                      fill={theme.color['greyScale-1']}
                    />
                  </Styled.CheckBox>
                )}
              </Styled.CarouselImageWrapper>
            ))}
          </Styled.CarouselBox>
        </Styled.CarouselArea>
        <Styled.ArrowButton position="right" onClick={next} disabled={isLast}>
          <ArrowRightIcon width="30px" height="30px" />
        </Styled.ArrowButton>
      </Wrapper.Bottom>
    </Wrapper>
  );
};

export default MarketDetailCarousel;
