import Carousel from 'components/common/carousel';
import * as React from 'react';
import PartnershipDetailCard from '../partnershipDetailCard';
import PartnershipIntroduction from '../partnershipIntroduction';
import Comment from 'components/common/comment/comment';
import { applyMediaQuery, Wrapper } from '@supercarmarket/ui';
import { css } from 'styled-components';
import { PartnershipDetailSkeleton } from 'components/fallback/loading';
import { usePartnershipPost } from 'http/server/partnership';

interface Props {
  id: string;
}

const PartnershipDetail = ({ id }: Props) => {
  const { data: partnerships, isLoading, isFetching } = usePartnershipPost(id);

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
                    gap: 20px;

                    ${applyMediaQuery('mobile')} {
                      flex-direction: column-reverse;
                      gap: 34px;
                    }
                  `}
                >
                  <Wrapper.Item
                    css={css`
                      width: 578px;
                      aspect-ratio: 4/3;
                      position: relative;

                      ${applyMediaQuery('mobile')} {
                        width: 100%;
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
