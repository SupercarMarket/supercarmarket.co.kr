import Carousel from 'components/common/carousel';
import usePartnershipDetail from 'hooks/queries/usePartnershipDetail';
import React from 'react';
import PartnershipDetailCard from '../partnershipDetailCard/partnershipDetailCard';
import PartnershipIntroduction from '../partnershipIntroduction/partnershipIntroduction';
import Comment from 'components/common/comment/comment';
import { Wrapper } from '@supercarmarket/ui';
import { css } from 'styled-components';
import { PartnershipDetailSkeleton } from 'components/fallback/loading';

interface Props {
  id: string;
}

const PartnershipDetail = ({ id }: Props) => {
  const {
    data: partnerships,
    isLoading,
    isFetching,
  } = usePartnershipDetail(id);

  if (isLoading || isFetching) return <PartnershipDetailSkeleton />;

  return (
    <Wrapper
      css={css`
        margin-bottom: 80px;
      `}
    >
      {partnerships && (
        <>
          <Wrapper.Top
            css={css`
              margin-bottom: 80px;
            `}
          >
            <Carousel
              id={id}
              category="partnership"
              imgSrc={partnerships.data.imgSrc}
            >
              <Carousel.CarouselTop>
                <Carousel.CarouselMainImage width={578} height={386} />
                <PartnershipDetailCard info={partnerships.data} />
              </Carousel.CarouselTop>
              <Carousel.CarouselBottom />
            </Carousel>
          </Wrapper.Top>
          <PartnershipIntroduction
            introduction={partnerships.data.introduction}
          />
        </>
      )}
      <React.Suspense fallback={<div>loading..</div>}>
        <Comment id={id} />
      </React.Suspense>
    </Wrapper>
  );
};

export default PartnershipDetail;
