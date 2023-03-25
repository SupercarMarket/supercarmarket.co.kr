import { applyMediaQuery, Wrapper } from '@supercarmarket/ui';
import theme from 'constants/theme';
import Image from 'next/image';
import React from 'react';
import { css } from 'styled-components';
import { fadeIn } from 'styles/keyframes';

import ArrowLeftIcon from '../../../assets/svg/arrow-left.svg';
import ArrowRightIcon from '../../../assets/svg/arrow-right.svg';
import CheckIcon from '../../../assets/svg/check.svg';
import * as Styled from './carousel.styled';
import useBase64 from 'hooks/queries/useBase64';
import Skeleton from 'react-loading-skeleton';

interface ICarousel {
  current: number;
  changeCurrent: (n: number) => void;
  page: number;
  changePage: (n: number) => void;
  imgSrc: string[];
  changeImgList: (i: string[]) => void;
  carouselId: string;
  carouselCategory: 'market' | 'partnership';
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
  imgList: string[];
  id: string;
  category: 'market' | 'partnership';
}

const CarouselProvider = ({
  children,
  id,
  imgList,
  category,
}: CarouselProviderProps) => {
  const [current, setCurrent] = React.useState<number>(0);
  const [page, setPage] = React.useState<number>(1);
  const [imgSrc, setImgList] = React.useState<string[]>(imgList);
  const carouselId = React.useMemo(() => id, [id]);
  const carouselCategory = React.useMemo(() => category, [category]);

  const changeCurrent = (n: number) => setCurrent(n);
  const changePage = (n: number) => setPage(n);
  const changeImgList = (n: string[]) => setImgList(n);

  const value = {
    current,
    changeCurrent,
    page,
    changePage,
    imgSrc,
    changeImgList,
    carouselId,
    carouselCategory,
  };

  return (
    <CarouselContext.Provider value={value}>
      {children}
    </CarouselContext.Provider>
  );
};

interface CarouselProps {
  children?: React.ReactNode;
  imgSrc: string[];
  id: string;
  category: 'market' | 'partnership';
}

const Carousel = ({ children, id, imgSrc, category }: CarouselProps) => {
  return (
    <CarouselProvider id={id} imgList={imgSrc} category={category}>
      {children}
    </CarouselProvider>
  );
};

interface CarouselTopProps {
  children?: React.ReactNode;
}

const CarouselTop = ({ children }: CarouselTopProps) => {
  return <Wrapper.Top css={Styled.top}>{children}</Wrapper.Top>;
};

const CarouselMainImage = () => {
  const { carouselId, imgSrc, current } =
    useCarouselContext('CarouselMainImage');
  const { data, isFetching, isLoading } = useBase64(imgSrc[current], {
    category: 'market',
    detail: true,
    id: carouselId,
    idx: current,
  });

  return (
    <Wrapper.Left
      css={css`
        opacity: 0;
        animation: ${fadeIn} 0.5s ease-in-out forwards;
        position: relative;
        width: 100%;
        height: 100%;
      `}
    >
      {isFetching || isLoading ? (
        <Skeleton />
      ) : (
        <Image
          placeholder="blur"
          src={imgSrc[current]}
          blurDataURL={data?.data.base64}
          alt="image"
          style={{ objectFit: 'contain' }}
          fill
        />
      )}
    </Wrapper.Left>
  );
};

const CarouselBottom = () => {
  const { imgSrc, page, changePage } = useCarouselContext('CarouselBottom');

  const isFirst = page === 1;
  const isLast = page === Math.ceil(imgSrc.length / 8);

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
          {imgSrc.map((src, idx) => (
            <CarouselItem key={src} idx={idx} />
          ))}
        </Styled.CarouselBox>
      </Styled.CarouselArea>
      <Styled.ArrowButton position="right" onClick={next} disabled={isLast}>
        <ArrowRightIcon width="30px" height="30px" />
      </Styled.ArrowButton>
    </Wrapper.Bottom>
  );
};

interface CarouselItemProps {
  idx: number;
}

const CarouselItem = ({ idx }: CarouselItemProps) => {
  const { imgSrc, current, changeCurrent, carouselId, carouselCategory } =
    useCarouselContext('CarouselItem');

  const { data, isFetching, isLoading } = useBase64(imgSrc[idx], {
    category: carouselCategory,
    detail: true,
    id: carouselId,
    idx,
  });

  const selectImage = (idx: number) => changeCurrent(idx);

  if (isFetching || isLoading) return <Skeleton width={141} height={89} />;

  return (
    <Styled.CarouselImageWrapper key={idx} onClick={() => selectImage(idx)}>
      <Image
        alt="image"
        placeholder="blur"
        src={imgSrc[idx]}
        blurDataURL={data?.data.base64}
        style={{ objectFit: 'contain' }}
        fill
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
  );
};

Carousel.CarouselTop = CarouselTop;
Carousel.CarouselMainImage = CarouselMainImage;
Carousel.CarouselBottom = CarouselBottom;

export default Carousel;
