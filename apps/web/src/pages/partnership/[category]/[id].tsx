import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { css } from 'styled-components';
import { NextPageWithLayout, Params } from '@supercarmarket/types/base';
import {
  dehydrate,
  QueryClient,
  QueryErrorResetBoundary,
} from '@tanstack/react-query';
import { applyMediaQuery, Searchbar, Tab, Wrapper } from '@supercarmarket/ui';
import { ErrorBoundary } from 'react-error-boundary';
import Layout from 'components/layout';
import { ErrorFallback } from 'components/fallback';
import { useSearchKeyword } from 'hooks/useSearchKeyword';
import { serverFetcher } from '@supercarmarket/lib';
import queries from 'constants/queries';
import PartnershipContents from 'components/partnership/partnershipContents';

const PartnershipDetailPage: NextPageWithLayout = ({
  id,
  category,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { keydownHandler, keywordRef } = useSearchKeyword({
    domain: 'partnership',
  });

  return (
    <Wrapper
      css={css`
        width: 1200px;
        display: flex;
        flex-direction: column;
        margin: 20px 0 0 0;
        ${applyMediaQuery('mobile')} {
          padding: 0 16px;
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
              <PartnershipContents id={id} category={category} />
            </ErrorBoundary>
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
                ref={keywordRef}
                onKeyDown={keydownHandler}
              />
            </Wrapper>
          </>
        )}
      </QueryErrorResetBoundary>
      <Tab list={`/partnership?category=${category}`} scroll />
    </Wrapper>
  );
};

PartnershipDetailPage.Layout = Layout;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { query } = ctx;
  const { id, category } = query as Params;

  const queryClient = new QueryClient();

  queryClient.prefetchQuery(queries.partnership.id(id), () =>
    serverFetcher(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/supercar/v1/partnership`,
      {
        method: 'GET',
        params: id,
      }
    ).then((res) => {
      const { ok, status, ...rest } = res;
      return rest;
    })
  );

  ctx.res.setHeader('Cache-Control', 'public, max-age=500, immutable');

  return {
    props: {
      category,
      id,
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default PartnershipDetailPage;
