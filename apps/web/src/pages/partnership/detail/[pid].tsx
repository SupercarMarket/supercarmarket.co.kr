import { dehydrate, QueryClient } from '@tanstack/react-query';
import Button from 'components/common/button';
import Carousel from 'components/common/carousel';
import Pagination from 'components/common/pagination';
import Searchbar from 'components/common/searchbar';
import Wrapper from 'components/common/wrapper';
import Layout from 'components/layout';
import PartnershipDetailCard from 'components/partnership/partnershipDetailCard';
import PartnershipIntroduction from 'components/partnership/partnershipIntroduction';
import Table from 'components/partnership/table';
import { PARTNERSHIP_TABLE_HEAD } from 'constants/partnership';
import usePartnership from 'hooks/queries/usePartnership';
import usePartnershipDetail from 'hooks/queries/usePartnershipDetail';
import { NextPageContext } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import { css } from 'styled-components';

interface PartnershipDetailPageProps {
  pid: string;
}

const PartnershipDetailPage = ({ pid }: PartnershipDetailPageProps) => {
  const { back } = useRouter();

  const scrollToTop = () =>
    window.scrollTo({
      behavior: 'smooth',
      top: 0,
    });

  const { data, isLoading } = usePartnershipDetail(pid);
  const { data: list } = usePartnership();
  console.log('list', list);

  console.log(data);

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
      {data && (
        <>
          <Carousel>
            <Carousel.CarouselWrapper
              imgList={data.data.partnerDetail.imgSrc}
              margin="0 0 80px 0"
            >
              <Carousel.CarouselTop width={578} height={386} display="flex">
                <PartnershipDetailCard />
              </Carousel.CarouselTop>
              <Carousel.CarouselBottom />
            </Carousel.CarouselWrapper>
          </Carousel>
          <PartnershipIntroduction />
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
        {data && (
          <Pagination
            page={data.page}
            pageSize={10}
            totalCount={data.totalCount}
            totalPages={data.totalPages}
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
