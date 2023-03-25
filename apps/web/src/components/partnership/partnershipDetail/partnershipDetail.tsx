import Carousel from 'components/common/carousel';
import usePartnershipDetail from 'hooks/queries/usePartnershipDetail';
import React from 'react';
import PartnershipDetailCard from '../partnershipDetailCard/partnershipDetailCard';
import PartnershipIntroduction from '../partnershipIntroduction/partnershipIntroduction';
import Comment from 'components/common/comment/comment';
import { applyMediaQuery, Wrapper } from '@supercarmarket/ui';
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

              ${applyMediaQuery('mobile')} {
                margin-bottom: 32px;
              }
            `}
          >
            <Carousel
              id={id}
              category="partnership"
              imgSrc={partnerships.data.imgSrc}
            >
              <Carousel.CarouselTop>
                <Wrapper.Top
                  css={css`
                    display: flex;
                    width: 100%;

                    ${applyMediaQuery('mobile')} {
                      flex-direction: column-reverse;
                      gap: 34px;
                    }
                  `}
                >
                  <Wrapper.Item
                    css={css`
                      width: 578px;
                      height: 386px;
                      position: relative;

                      ${applyMediaQuery('mobile')} {
                        width: 100%;
                        height: 257px;
                      }
                    `}
                  >
                    <Carousel.CarouselMainImage />
                  </Wrapper.Item>
                  <PartnershipDetailCard info={partnerships.data} />
                </Wrapper.Top>
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
        <Comment id={id} kind="partnership" />
      </React.Suspense>
    </Wrapper>
  );
};

export default PartnershipDetail;
