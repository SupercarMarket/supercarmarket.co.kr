import React from 'react';
import { NextPageContext } from 'next';
import { useRouter } from 'next/router';
import { css } from 'styled-components';
import { NextPageWithLayout } from '@supercarmarket/types/base';
import {
  dehydrate,
  QueryClient,
  QueryErrorResetBoundary,
} from '@tanstack/react-query';
import {
  Button,
  Pagination,
  Searchbar,
  Table,
  Wrapper,
} from '@supercarmarket/ui';

import usePartnership from 'hooks/queries/usePartnership';
import usePartnershipDetail from 'hooks/queries/usePartnershipDetail';
import Layout from 'components/layout';
import Carousel from 'components/common/carousel';
import PartnershipDetailCard from 'components/partnership/partnershipDetailCard';
import PartnershipIntroduction from 'components/partnership/partnershipIntroduction';
import PartnershipRow from 'components/partnership/partnershipRow/partnershipRow';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from 'components/fallback';

interface PartnershipDetailPageProps {
  pid: string;
}

const PartnershipDetailPage: NextPageWithLayout = ({
  pid,
}: PartnershipDetailPageProps) => {
  const { query, back } = useRouter();

  const scrollToTop = () =>
    window.scrollTo({
      behavior: 'smooth',
      top: 0,
    });

  const { data: partnerships, isLoading } = usePartnershipDetail(pid);
  const { data: list } = usePartnership(query);

  console.log(partnerships);
  console.log(list);

  if (isLoading) return <div>로딩 중???</div>;

  return (
    <Wrapper
      css={css`
        width: 1200px;
        display: flex;
        flex-direction: column;
        margin: 20px 0 0 0;
      `}
    >
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <>
            <ErrorBoundary
              onReset={reset}
              fallbackRender={(props) => <ErrorFallback {...props} />}
            >
              {partnerships && (
                <>
                  <Carousel>
                    <Carousel.CarouselWrapper
                      imgList={partnerships.data.imgSrc}
                      margin="0 0 80px 0"
                    >
                      <Carousel.CarouselTop
                        width={578}
                        height={386}
                        display="flex"
                      >
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
            </ErrorBoundary>
            <ErrorBoundary
              onReset={reset}
              fallbackRender={(props) => <ErrorFallback {...props} />}
            >
              <Wrapper
                css={css`
                  width: 100%;
                  display: flex;
                  flex-direction: column;
                  margin-bottom: 80px;
                `}
              >
                <Table tab="partnership" hidden={false} />{' '}
                {list &&
                  list.data.map((p) => (
                    <PartnershipRow key={p.brdSeq} {...p} />
                  ))}
              </Wrapper>
            </ErrorBoundary>
          </>
        )}
      </QueryErrorResetBoundary>
      <Wrapper
        css={css`
          display: flex;
          justify-content: flex-end;
          margin-bottom: 36px;
          gap: 9px;
        `}
      >
        <Button variant="Line" onClick={back}>
          목록
        </Button>
        <Button variant="Line" onClick={scrollToTop}>
          맨위로 ↑
        </Button>
      </Wrapper>

      <Wrapper
        css={css`
          margin-bottom: 32px;
        `}
      >
        {list && (
          <Pagination
            pageSize={10}
            totalCount={list.totalCount}
            totalPages={list.totalPages}
          />
        )}
      </Wrapper>
      <Wrapper
        css={css`
          display: flex;
          justify-content: center;
          margin-bottom: 130px;
        `}
      >
        <Searchbar width="540px" variant="Line" />
      </Wrapper>
    </Wrapper>
  );
};

PartnershipDetailPage.Layout = Layout;

export const getServerSideProps = async (ctx: NextPageContext) => {
  const { pid } = ctx.query;

  const queryClient = new QueryClient();

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      pid,
    },
  };
};

export default PartnershipDetailPage;
