import { Button, Searchbar, Wrapper } from '@supercarmarket/ui';
import type { NextPageWithLayout, Params } from '@supercarmarket/types/base';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import layout from 'components/layout';
import MarketContents from 'components/market/marketContents';
import queries from 'constants/queries';
import useMarketDetail from 'hooks/queries/useMarketDetail';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import * as React from 'react';
import { css } from 'styled-components';

const MarketDetailPage: NextPageWithLayout = ({
  id,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
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

  return (
    <Wrapper
      css={css`
        width: 1200px;
        display: flex;
        flex-direction: column;
        margin: 20px 0 0 0;
      `}
    >
      <MarketContents id={id} />
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

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { id } = ctx.query as Params;

  queryClient.prefetchQuery(queries.market.detail(id), () =>
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
