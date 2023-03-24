import {
  dehydrate,
  QueryClient,
  QueryErrorResetBoundary,
} from '@tanstack/react-query';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import type { NextPageWithLayout, Params } from '@supercarmarket/types/base';
import { Alert, applyMediaQuery, Container, Wrapper } from '@supercarmarket/ui';
import Layout from 'components/layout';
import { css } from 'styled-components';
import queries from 'constants/queries';
import { serverApi } from '@supercarmarket/lib';
import { SearchList } from 'components/search';
import HeadSeo from 'components/common/headSeo';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from 'components/fallback';

const Search: NextPageWithLayout = ({
  keyword,
  isKeyword,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <>
      <HeadSeo
        title={`${keyword}`}
        description={`${keyword}에 대한 검색결과입니다.`}
      />
      <Container>
        <Wrapper
          css={css`
            transform: translateY();
            ${applyMediaQuery('mobile')} {
              padding: 0 16px;
            }
          `}
        >
          <QueryErrorResetBoundary>
            {({ reset }) => (
              <ErrorBoundary
                onReset={reset}
                fallbackRender={(props) => <ErrorFallback {...props} />}
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
              </ErrorBoundary>
            )}
          </QueryErrorResetBoundary>
        </Wrapper>
      </Container>
    </>
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
        keyword,
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

  await queryClient.prefetchQuery(
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
      serverApi(`${process.env.NEXT_PUBLIC_SERVER_URL}/supercar/v1/search`, {
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
