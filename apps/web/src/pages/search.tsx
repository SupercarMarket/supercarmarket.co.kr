import {
  dehydrate,
  QueryClient,
  QueryErrorResetBoundary,
} from '@tanstack/react-query';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import type { NextPageWithLayout, Params } from '@supercarmarket/types/base';
import { Alert, Container, Wrapper } from '@supercarmarket/ui';
import Layout from 'components/layout';
import { css } from 'styled-components';
import { SearchList } from 'components/search';
import HeadSeo from 'components/common/headSeo';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from 'components/fallback';
import { prefetchSearch, QUERY_KEYS } from 'http/server/search';

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
        <Wrapper>
          <QueryErrorResetBoundary>
            {({ reset }) => (
              <ErrorBoundary
                onReset={reset}
                fallbackRender={(props) => <ErrorFallback {...props} />}
              >
                {isKeyword ? (
                  <SearchList keyword={keyword} />
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
    category = 'all',
    filter = 'created_date',
    keyword,
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

  if (
    category !== 'all' &&
    category !== 'community' &&
    category !== 'product' &&
    category !== 'magazine' &&
    category !== 'partnership'
  ) {
    return {
      notFound: true,
    };
  }

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [
      ...QUERY_KEYS.all,
      {
        keyword,
        filter,
        category,
        page: 0,
      },
    ],
    queryFn: () => prefetchSearch({ keyword, filter, category, page: 0 }),
  });

  return {
    props: {
      isKeyword,
      keyword,
      dehydratedState: dehydrate(queryClient),
    },
  };
};
