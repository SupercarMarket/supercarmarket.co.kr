import { Wrapper } from '@supercarmarket/ui';
import theme from 'constants/theme';
import Image from 'next/image';
import React from 'react';
import { css } from 'styled-components';
import { fadeIn } from 'styles/keyframes';
import { WithBlurredImage } from 'types/market';

import ArrowLeftIcon from '../../../assets/svg/arrow-left.svg';
import ArrowRightIcon from '../../../assets/svg/arrow-right.svg';
import CheckIcon from '../../../assets/svg/check.svg';
import * as Styled from './carousel.styled';

interface ICarousel {
  current: number;
  changeCurrent: (n: number) => void;
  page: number;
  changePage: (n: number) => void;
  imgList: WithBlurredImage<{ imgSrc: string }>[];
  changeImgList: (i: WithBlurredImage<{ imgSrc: string }>[]) => void;
}

const CarouselContext = React.createContext<ICarousel | null>(null);

const useCarouselContext = (component: string) => {
  const context = React.useContext(CarouselContext);

  if (!context) {
    throw new Error(`CarouselContext can't find ${component}`);
  }
  return context;
};

interface CarouselProviderProps {
  children?: React.ReactNode;
}

const CarouselProvider = ({ children }: CarouselProviderProps) => {
  const [current, setCurrent] = React.useState<number>(0);
  const [page, setPage] = React.useState<number>(1);
  const [imgList, setImgList] = React.useState<
    WithBlurredImage<{ imgSrc: string }>[]
  >([]);

  const changeCurrent = (n: number) => setCurrent(n);
  const changePage = (n: number) => setPage(n);
  const changeImgList = (n: WithBlurredImage<{ imgSrc: string }>[]) =>
    setImgList(n);

  const value = {
    current,
    changeCurrent,
    page,
    changePage,
    imgList,
    changeImgList,
  };

  return (
    <CarouselContext.Provider value={value}>
      {children}
    </CarouselContext.Provider>
  );
};

interface CarouselProps {
  children?: React.ReactNode;
}

const Carousel = ({ children }: CarouselProps) => {
  return <CarouselProvider>{children}</CarouselProvider>;
};

interface CarouselWrapperProps {
  children?: React.ReactNode;
  imgList: WithBlurredImage<{ imgSrc: string }>[];
  margin?: React.CSSProperties['margin'];
}

const CarouselWrapper = ({
  imgList,
  children,
  margin = '0px',
}: CarouselWrapperProps) => {
  const { changeImgList } = useCarouselContext('Carousel');

  React.useEffect(() => {
    changeImgList(imgList);
  }, [changeImgList, imgList]);

  return (
    <Wrapper
      css={css`
        margin: ${margin};
      `}
    >
      {children}
    </Wrapper>
  );
};

interface CarouselTopProps {
  width?: number;
  height?: number;
  children?: React.ReactNode;
  display?: React.CSSProperties['display'];
}

const CarouselTop = ({
  width = 1200,
  height = 757,
  children,
  display,
}: CarouselTopProps) => {
  const { imgList, current } = useCarouselContext('CarouselTop');

  // console.log('CarouselTop', imgList);

  return (
    <Wrapper.Top css={Styled.top} key={current}>
      <Wrapper.Top
        css={css`
          display: ${display};
          margin-bottom: 10px;
          gap: 20px;
        `}
      >
        <Wrapper.Left
          css={css`
            opacity: 0;
            animation: ${fadeIn} 0.5s ease-in-out forwards;
          `}
        >
          {imgList && imgList[current] && (
            <Image
              width={width}
              height={height}
              alt="image"
              placeholder="blur"
              src={imgList[current].imgSrc}
              blurDataURL={imgList[current].base64}
            />
          )}
        </Wrapper.Left>
        <Wrapper.Right
          css={css`
            width: 100%;
            margin-bottom: 3px;
          `}
        >
          {children}
        </Wrapper.Right>
      </Wrapper.Top>
    </Wrapper.Top>
  );
};

const CarouselBottom = () => {
  const { imgList, current, page, changeCurrent, changePage } =
    useCarouselContext('CarouselBottom');

  if (!imgList) return <></>;

  const isFirst = page === 1;
  const isLast = page === Math.ceil(imgList.length / 8);

  const selectImage = (idx: number) => changeCurrent(idx);

  const prev = () => {
    if (!isFirst) changePage(page - 1);
  };

  const next = () => {
    if (!isLast) changePage(page + 1);
  };

  return (
    <Wrapper.Bottom css={Styled.bottom}>
      <Styled.ArrowButton position="left" onClick={prev} disabled={isFirst}>
        <ArrowLeftIcon width="30px" height="30px" />
      </Styled.ArrowButton>
      <Styled.CarouselArea>
        <Styled.CarouselBox page={page}>
          {imgList.map(({ imgSrc, base64 }, idx) => (
            <Styled.CarouselImageWrapper
              key={idx}
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
  );
};

Carousel.CarouselWrapper = CarouselWrapper;
Carousel.CarouselTop = CarouselTop;
Carousel.CarouselBottom = CarouselBottom;

export default Carousel;
