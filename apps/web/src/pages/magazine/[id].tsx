import { applyMediaQuery, Container, Wrapper } from '@supercarmarket/ui';
import type { NextPageWithLayout } from '@supercarmarket/types/base';
import {
  dehydrate,
  QueryClient,
  QueryErrorResetBoundary,
} from '@tanstack/react-query';
import Posting from 'components/common/posting';
import { ErrorFallback } from 'components/fallback';
import layout from 'components/layout';
import { MagazineDealer } from 'components/magazine';
import queries from 'constants/queries';
import { ModalProvider } from 'feature/modalContext';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import dynamic from 'next/dynamic';
import type { ParsedUrlQuery } from 'querystring';
import * as React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { css } from 'styled-components';
import { serverFetcher } from '@supercarmarket/lib';
import { getSession } from 'utils/api/auth/user';

const Comment = dynamic(() => import('components/common/comment'), {
  ssr: false,
});

interface IParams extends ParsedUrlQuery {
  id: string;
}

const MagazinePost: NextPageWithLayout = ({
  id,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <ModalProvider>
      <Container>
        <QueryErrorResetBoundary>
          {({ reset }) => (
            <Wrapper
              css={css`
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: flex-start;
                gap: 80px;
                ${applyMediaQuery('mobile')} {
                  padding: 0 16px;
                }
              `}
            >
              <ErrorBoundary
                onReset={reset}
                fallbackRender={(props) => (
                  <ErrorFallback margin="100px 0" {...props} />
                )}
              >
                <Posting postId={id} type="magazine" />
                <MagazineDealer postId={id} />
                <Comment id={id} />
              </ErrorBoundary>
            </Wrapper>
          )}
        </QueryErrorResetBoundary>
      </Container>
    </ModalProvider>
  );
};

export default MagazinePost;

MagazinePost.Layout = layout;

export const getServerSideProps: GetServerSideProps = async ({
  req,
  params,
}) => {
  const session = await getSession({ req });
  const { id } = params as IParams;

  const queryClient = new QueryClient();

  let headers = {};
  const boardView = req.cookies['boardView'];

  if (session) headers = { ...headers, ACCESS_TOKEN: session.accessToken };
  if (boardView) headers = { ...headers, Cookie: `boardView=${boardView}` };

  await queryClient.prefetchQuery(queries.magazine.id(id), () =>
    serverFetcher(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/supercar/v1/magazine`,
      {
        method: 'GET',
        headers,
        params: id,
      }
    ).then((res) => {
      const { ok, status, ...rest } = res;

      return rest;
    })
  );

  return {
    props: {
      id,
      dehydratedState: dehydrate(queryClient),
    },
  };
};
