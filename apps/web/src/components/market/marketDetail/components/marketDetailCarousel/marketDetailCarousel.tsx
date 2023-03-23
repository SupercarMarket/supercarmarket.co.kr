import { Wrapper, applyMediaQuery } from '@supercarmarket/ui';
import theme from 'constants/theme';
import Image from 'next/image';
import * as React from 'react';
import { css } from 'styled-components';

import ArrowLeftIcon from '../../../../../assets/svg/arrow-left.svg';
import ArrowRightIcon from '../../../../../assets/svg/arrow-right.svg';
import CheckIcon from '../../../../../assets/svg/check.svg';
import * as Styled from './marketDetailCarousel.styled';
import useBase64 from 'hooks/queries/useBase64';
import Skeleton from 'react-loading-skeleton';

interface MarketDetailCarouselProps {
  id: string;
  imgSrc: string[];
}

interface MarketDetailCarouselItemProps {
  imgSrc: string;
  idx: number;
  id: string;
  current: number;
  handleClick: () => void;
}

const MarketDetailCarouselItem = (props: MarketDetailCarouselItemProps) => {
  const { imgSrc, current, idx, id, handleClick } = props;

  const { data, isFetching, isLoading } = useBase64(imgSrc, {
    category: 'market',
    detail: true,
    id,
    idx,
  });

  if (isFetching || isLoading)
    return (
      <Wrapper
        css={css`
          width: 141px;
          height: 89px;

          ${applyMediaQuery('mobile')} {
            width: 80px;
            height: 60px;
          }
        `}
      >
        <Skeleton width="100%" height="100%" />
      </Wrapper>
    );

  return (
    <Styled.CarouselImageWrapper onClick={handleClick}>
      <Styled.ImageWrapper>
        <Image
          alt="image"
          placeholder="blur"
          src={imgSrc}
          blurDataURL={data?.data.base64}
          fill
          style={{ objectFit: 'contain' }}
        />
      </Styled.ImageWrapper>
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
  );
};

const MarketDetailCarousel = ({ imgSrc, id }: MarketDetailCarouselProps) => {
  const [current, setCurrent] = React.useState<number>(0);
  const [page, setPage] = React.useState<number>(1);
  const { data, isFetching, isLoading } = useBase64(imgSrc[current], {
    category: 'market',
    detail: true,
    id,
    idx: current,
  });
  const isFirst = page === 1;
  const isLast = page === Math.ceil(imgSrc.length / 8);

  const selectImage = React.useCallback((idx: number) => setCurrent(idx), []);

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

        ${applyMediaQuery('mobile')} {
          margin-bottom: 32px;
        }
      `}
    >
      <Wrapper.Top css={Styled.top}>
        {isFetching || isLoading ? (
          <Wrapper
            css={css`
              width: 100%;
              height: 900px;

              ${applyMediaQuery('mobile')} {
                width: 100%;
                height: 257px;
              }
            `}
          >
            <Skeleton width="100%" height="100%" />
          </Wrapper>
        ) : (
          <Image
            alt="image"
            placeholder="blur"
            blurDataURL={data?.data.base64}
            src={imgSrc[current]}
            style={{ objectFit: 'contain' }}
            fill
          />
        )}
      </Wrapper.Top>
      <Wrapper.Bottom css={Styled.bottom}>
        <Styled.ArrowButton position="left" onClick={prev} disabled={isFirst}>
          <ArrowLeftIcon width="30px" height="30px" />
        </Styled.ArrowButton>
        <Styled.CarouselArea>
          <Styled.CarouselBox page={page}>
            {imgSrc.map((src, idx) => (
              <MarketDetailCarouselItem
                key={src}
                imgSrc={src}
                idx={idx}
                current={current}
                id={id}
                handleClick={() => {
                  selectImage(idx);
                }}
              />
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
