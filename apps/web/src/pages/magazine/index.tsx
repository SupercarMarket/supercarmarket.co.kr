import { applyMediaQuery, Container, Title, Wrapper } from '@supercarmarket/ui';
import type { NextPageWithLayout } from '@supercarmarket/types/base';
import { clientFetcher } from '@supercarmarket/lib';
import {
  dehydrate,
  QueryClient,
  QueryErrorResetBoundary,
} from '@tanstack/react-query';
import { ErrorFallback } from 'components/fallback';
import layout from 'components/layout';
import { MagazineBanner, MagazineList } from 'components/magazine';
import queries from 'constants/queries';
import type { GetStaticProps } from 'next/types';
import { ErrorBoundary } from 'react-error-boundary';
import HeadSeo from 'components/common/headSeo';
import { css } from 'styled-components';
import { prefetchMagazine, QUERY_KEYS } from 'utils/api/magazine';

const MagazinePage: NextPageWithLayout = () => {
  return (
    <>
      <HeadSeo
        title="슈마매거진"
        description="슈퍼카에 대한 모든 최신소식을 만나보세요!"
      />
      <Container margin="20px 0 0 0">
        <QueryErrorResetBoundary>
          {({ reset }) => (
            <Wrapper
              css={css`
                display: flex;
                flex-direction: column;
                align-items: center;
                ${applyMediaQuery('mobile')} {
                  padding: 0 16px;
                }
              `}
            >
              <Title marginBottom="20px">따끈따끈한 최근 소식</Title>
              <ErrorBoundary
                onReset={reset}
                fallbackRender={(props) => (
                  <ErrorFallback margin="100px 0" {...props} />
                )}
              >
                <MagazineBanner />
                <MagazineList />
              </ErrorBoundary>
            </Wrapper>
          )}
        </QueryErrorResetBoundary>
      </Container>
    </>
  );
};

export default MagazinePage;

MagazinePage.Layout = layout;

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [...QUERY_KEYS.magazine(), { page: 0 }],
    queryFn: () => prefetchMagazine({ page: 0 }),
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
