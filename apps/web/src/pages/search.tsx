import { dehydrate, QueryClient } from '@tanstack/react-query';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import type { NextPageWithLayout, Params } from '@supercarmarket/types/base';
import { Alert, Container, Wrapper } from '@supercarmarket/ui';
import Layout from 'components/layout';
import { css } from 'styled-components';
import queries from 'constants/queries';
import { serverApi } from '@supercarmarket/lib';
import { SearchList } from 'components/search';

const Search: NextPageWithLayout = ({
  isKeyword,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <Container>
      <Wrapper
        css={css`
          transform: translateY();
        `}
      >
        {isKeyword ? (
          <SearchList />
        ) : (
          <Wrapper.Item
            css={css`
              padding-top: 100px;
            `}
          >
            <Alert severity="info" title="검색어를 입력해주세요" />
          </Wrapper.Item>
        )}
      </Wrapper>
    </Container>
  );
};

Search.Layout = Layout;

export default Search;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { query } = ctx;
  const {
    category = null,
    filter = null,
    orderBy = null,
    keyword = null,
  } = query as Params;
  const isKeyword = !!keyword;

  if (!isKeyword) {
    return {
      props: {
        isKeyword,
      },
    };
  }

  let currentQuery = {};

  currentQuery = {
    ...currentQuery,
    category,
    keyword,
    page: 0,
  };

  if (filter)
    currentQuery = {
      ...currentQuery,
      filter,
      orderBy,
    };

  const queryClient = new QueryClient();

  queryClient.prefetchQuery(
    [
      ...queries.search.all,
      ...queries.search.query({
        category: String(category),
        orderBy: String(orderBy),
        filter,
        keyword,
        page: 0,
      }),
    ],
    () =>
      serverApi(`${process.env.NEXT_PUBLIC_SERVER_URL}//supercar/v1/search`, {
        method: 'GET',
        query: currentQuery,
      }).then((res) => {
        const { ok, status, ...rest } = res;
        return rest;
      })
  );

  return {
    props: {
      isKeyword,
      dehydratedState: dehydrate(queryClient),
    },
  };
};
