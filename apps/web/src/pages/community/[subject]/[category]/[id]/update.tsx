import { serverFetcher } from '@supercarmarket/lib';
import { NextPageWithLayout, Params } from '@supercarmarket/types/base';
import { Container, Title, Wrapper } from '@supercarmarket/ui';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import Advertisement from 'components/common/advertisement';
import { CommunityForm } from 'components/community';
import { ErrorFallback } from 'components/fallback';
import Layout from 'components/layout';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { ErrorBoundary } from 'react-error-boundary';
import { css } from 'styled-components';

const CommunityUpdate: NextPageWithLayout = ({
  initialData,
  id,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <Container>
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <Wrapper
            css={css`
              display: flex;
              flex-direction: column;
              gap: 20px;
              padding: 0 16px;
            `}
          >
            <Advertisement />
            <Title>게시글 수정</Title>
            <ErrorBoundary
              onReset={reset}
              fallbackRender={(props) => (
                <ErrorFallback margin="100px 0" {...props} />
              )}
            >
              <CommunityForm initialData={initialData} id={id} />
            </ErrorBoundary>
          </Wrapper>
        )}
      </QueryErrorResetBoundary>
    </Container>
  );
};

CommunityUpdate.Layout = Layout;

export default CommunityUpdate;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { query } = ctx;
  const { subject, category, id } = query as Params;

  if (!(subject && category && id)) {
    return {
      notFound: true,
    };
  }

  const initialData = await serverFetcher(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/supercar/v1/community/${category}/update-id`,
    {
      method: 'GET',
      params: id,
    }
  ).then((res) => {
    const { ok, status, ...rest } = res;
    return rest.data;
  });

  return {
    props: {
      subject,
      category,
      id,
      initialData,
    },
  };
};
