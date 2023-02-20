import React from 'react';
import { NextPageContext } from 'next';
import { useRouter } from 'next/router';
import { css } from 'styled-components';
import { NextPageWithLayout } from '@supercarmarket/types/base';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { Button, Pagination, Searchbar, Wrapper } from '@supercarmarket/ui';

import { PARTNERSHIP_TABLE_HEAD } from 'constants/partnership';
import usePartnership from 'hooks/queries/usePartnership';
import usePartnershipDetail from 'hooks/queries/usePartnershipDetail';
import Layout from 'components/layout';
import Table from 'components/partnership/table';
import Carousel from 'components/common/carousel';
import PartnershipDetailCard from 'components/partnership/partnershipDetailCard';
import PartnershipIntroduction from 'components/partnership/partnershipIntroduction';

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
      {list && (
        <Table
          data={list.data}
          tableHeaders={PARTNERSHIP_TABLE_HEAD}
          marginBottom="20px"
        />
      )}
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
        {partnerships && (
          <Pagination
            pageSize={10}
            totalCount={partnerships.totalCount}
            totalPages={partnerships.totalPages}
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
