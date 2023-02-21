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

const makeQuery = (query: Params) =>
  Object.entries(query)
    .map(([key, value]) => `${key}=${value}`)
    .join('&');

const MarketDetailPage: NextPageWithLayout = ({
  id,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { push, query } = useRouter();
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
      delete query.id;

      query.keyword = keywordRef.current.value;
      keywordRef.current.value = '';

      const queryString = makeQuery(query as Params);

      push(`/market/${query.category}?${queryString}`);
    }
  };

  const backToMarketList = () => {
    delete query.id;
    const queryString = makeQuery(query as Params);

    push(`/market/${query.category}?${queryString}`);
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
        <Button variant="Line" onClick={backToMarketList}>
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

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { id } = ctx.query as Params;
  const queryClient = new QueryClient();

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
