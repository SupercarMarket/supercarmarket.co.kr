import {
  applyMediaQuery,
  Container,
  Searchbar,
  Tab,
  Wrapper,
} from '@supercarmarket/ui';
import type { NextPageWithLayout, Params } from '@supercarmarket/types/base';
import {
  dehydrate,
  QueryClient,
  QueryErrorResetBoundary,
} from '@tanstack/react-query';
import layout from 'components/layout';
import MarketContents from 'components/market/marketContents';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useRouter, useSearchParams } from 'next/navigation';
import * as React from 'react';
import { css } from 'styled-components';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from 'components/fallback';
import { CATEGORY } from 'constants/market';
import { makeQuery } from 'utils/market/marketQuery';
import Advertisement from 'components/common/advertisement';
import { prefetchMarketPost, QUERY_KEYS } from 'http/server/market';
import { getSession } from 'http/server/next';
import { useNextQuery } from 'hooks/useNextQuery';

const MarketDetailPage: NextPageWithLayout = ({
  id,
  category,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const { query } = useNextQuery(searchParams);
  const keywordRef = React.useRef<HTMLInputElement>(null);

  const keydownHandler = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && keywordRef.current !== null) {
      const queries = query as Params;

      delete queries.id;
      delete queries.category;
      queries.keyword = keywordRef.current.value;

      const queryString = makeQuery(queries);

      push(`/market?category=all&${queryString}`);
    }
  };

  const listCategory = React.useMemo(() => {
    const foundCategory = CATEGORY.find(
      ({ option }) => option === category
    )?.value;
    return foundCategory;
  }, [category]);

  return (
    <Container>
      <Advertisement />
      <Wrapper
        css={css`
          width: 1200px;
          display: flex;
          flex-direction: column;
          margin: 20px 0 0 0;
          ${applyMediaQuery('mobile')} {
            width: 100%;
            padding: 0 23.5px;
            box-sizing: border-box;
          }
        `}
      >
        <QueryErrorResetBoundary>
          {({ reset }) => (
            <>
              <ErrorBoundary
                onReset={reset}
                fallbackRender={(props) => <ErrorFallback {...props} />}
              >
                <MarketContents id={id} />
              </ErrorBoundary>
              <Wrapper
                css={css`
                  width: 100%;
                  margin-bottom: 36px;
                `}
              >
                <Tab list={`/market?category=${listCategory}`} scroll />
              </Wrapper>
              <Wrapper
                css={css`
                  width: 100%;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  margin-bottom: 160px;
                  ${applyMediaQuery('mobile')} {
                    justify-content: center;
                  }
                `}
              >
                <Wrapper
                  css={css`
                    width: 504px;
                    ${applyMediaQuery('mobile')} {
                      width: 240px;
                    }
                  `}
                >
                  <Searchbar
                    variant="Line"
                    placeholder="검색어를 입력하세요"
                    onKeyDown={keydownHandler}
                    ref={keywordRef}
                  />
                </Wrapper>
              </Wrapper>
            </>
          )}
        </QueryErrorResetBoundary>
      </Wrapper>
    </Container>
  );
};

MarketDetailPage.Layout = layout;

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
}) => {
  const { id, category = 'sports-car' } = query as Params;
  const session = await getSession({ req });

  const queryClient = new QueryClient();

  const boardView = req.cookies['boardView'];

  await queryClient.prefetchQuery({
    queryKey: QUERY_KEYS.id(id),
    queryFn: () =>
      prefetchMarketPost({
        id,
        token: session?.accessToken,
        boardView: `${boardView}[${id}]`,
      }),
  });

  return {
    props: {
      id,
      category,
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default MarketDetailPage;
