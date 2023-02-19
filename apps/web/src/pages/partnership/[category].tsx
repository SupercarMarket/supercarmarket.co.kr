import { NextPageWithLayout } from '@supercarmarket/types/base';
import { Searchbar, Wrapper } from '@supercarmarket/ui';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import layout from 'components/layout';
import Banner from 'components/partnership/banner';
import Category from 'components/partnership/category';
import Table from 'components/partnership/table';
import {
  PARTNERSHIP_CATEGORY,
  PARTNERSHIP_TABLE_HEAD,
} from 'constants/partnership';
import usePartnership from 'hooks/queries/usePartnership';
import { NextPageContext } from 'next/types';
import type { ParsedUrlQuery } from 'querystring';
import React from 'react';
import { css } from 'styled-components';

interface IParams extends ParsedUrlQuery {
  category: string;
}

const PartnershipPage: NextPageWithLayout = () => {
  const { data } = usePartnership();
  console.log(data);

  return (
    <>
      <Banner
        title="제휴업체 등록을 원하시나요?"
        btnTitle="등록 문의하기"
        url=""
      />
      <Wrapper.Top
        css={css`
          height: 200px;
          display: flex;
          align-items: center;
          justify-content: center;
        `}
      >
        <Searchbar
          width="880px"
          variant="Line"
          placeholder="원하시는 업체를 검색하세요"
        />
      </Wrapper.Top>
      <Category domain="partnership" category={PARTNERSHIP_CATEGORY} />
      {data && <Table data={data.data} tableHeaders={PARTNERSHIP_TABLE_HEAD} />}
    </>
  );
};

PartnershipPage.Layout = layout;

export const getServerSideProps = async (ctx: NextPageContext) => {
  const { category } = ctx.query as IParams;

  const queryClient = new QueryClient();

  if (
    !category ||
    !PARTNERSHIP_CATEGORY.map(({ value }) => value).includes(category as string)
  )
    return {
      redirect: {
        destination: '/partnership/all',
        permanent: false,
      },
    };

  // queryClient.prefetchQuery(queries.partnership.lists([]), () =>
  //   fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/supercar/v1/shop`, {
  //     method: 'GET',
  //   }).then((res) => res.json())
  // );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default PartnershipPage;
