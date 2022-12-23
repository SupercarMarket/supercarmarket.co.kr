import { dehydrate, QueryClient } from '@tanstack/react-query';
import Button from 'components/common/button';
import Searchbar from 'components/common/searchbar';
import Wrapper from 'components/common/wrapper';
import layout from 'components/layout';
import { MarketDetail } from 'components/market/marketDetail';
import MarketTable from 'components/market/marketTable/marketTable';
import queries from 'constants/queries';
import useMarketDetail from 'hooks/queries/useMarketDetail';
import { NextPageContext } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import { css } from 'styled-components';

interface MarketDetailPageProps {
  id: string;
}

const MarketDetailPage = ({ id }: MarketDetailPageProps) => {
  const { push, query, back } = useRouter();
  const { data } = useMarketDetail(id);
  const keywordRef = React.useRef<HTMLInputElement>(null);

  if (!data) return <div>로딩중?</div>;

  const scrollToTop = () =>
    window.scrollTo({
      behavior: 'smooth',
      top: 0,
    });

  const keydownHandler = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && keywordRef.current !== null) {
      const queries = { ...query };

      queries.keyword = keywordRef.current.value;
      keywordRef.current.value = '';

      const queryString = Object.entries(queries)
        .map(([key, value]) => `${key}=${value}`)
        .join('&');

      push(`/market/${query.category}?${queryString}`);
    }
  };

  console.log(data);

  return (
    <Wrapper
      css={css`
        width: 1200px;
        display: flex;
        flex-direction: column;
        margin: 20px 0 0 0;
      `}
    >
      <MarketDetail data={data.data} />
      <MarketTable markets={data.carList} marginBottom="20px" />
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
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 160px;
        `}
      >
        <Searchbar
          variant="Line"
          width="540px"
          placeholder="검색어를 입력하세요"
          onKeyDown={keydownHandler}
          ref={keywordRef}
        />
      </Wrapper>
    </Wrapper>
  );
};

MarketDetailPage.Layout = layout;

const queryClient = new QueryClient();

export const getServerSideProps = async (ctx: NextPageContext) => {
  const { id } = ctx.query;

  queryClient.prefetchQuery(queries.market.detail(id as string), () =>
    fetch(`/api/market/${id}`, {
      method: 'GET',
    }).then((res) => res.json())
  );

  return {
    props: {
      id,
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default MarketDetailPage;
