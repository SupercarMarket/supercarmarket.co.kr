import Carousel from 'components/common/carousel';
import usePartnershipDetail from 'hooks/queries/usePartnershipDetail';
import React from 'react';
import PartnershipDetailCard from '../partnershipDetailCard/partnershipDetailCard';
import PartnershipIntroduction from '../partnershipIntroduction/partnershipIntroduction';
import Comment from 'components/common/comment/comment';
import { Wrapper } from '@supercarmarket/ui';
import { css } from 'styled-components';

interface Props {
  pid: string;
}

const PartnershipDetail = ({ pid }: Props) => {
  const { data: partnerships, isLoading } = usePartnershipDetail(pid);

  if (isLoading) return <div>로딩 중???</div>;

  return (
    <Wrapper
      css={css`
        margin-bottom: 80px;
      `}
    >
      {partnerships && (
        <>
          <Carousel>
            <Carousel.CarouselWrapper
              imgList={partnerships.data.imgSrc}
              margin="0 0 80px 0"
            >
              <Carousel.CarouselTop width={578} height={386} display="flex">
                <PartnershipDetailCard info={partnerships.data} />
              </Carousel.CarouselTop>
              <Carousel.CarouselBottom />
            </Carousel.CarouselWrapper>
          </Carousel>
          <PartnershipIntroduction
            introduction={partnerships.data.introduction}
          />
        </>
      )}
      <React.Suspense fallback={<div>loading..</div>}>
        <Comment id={pid} />
      </React.Suspense>
    </Wrapper>
  );
};

export default PartnershipDetail;
