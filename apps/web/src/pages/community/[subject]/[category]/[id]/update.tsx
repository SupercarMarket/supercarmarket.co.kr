import { get } from '@supercarmarket/lib';
import { NextPageWithLayout, Params } from '@supercarmarket/types/base';
import { Container, Title, Wrapper } from '@supercarmarket/ui';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { CommunityForm } from 'components/community';
import { ErrorFallback } from 'components/fallback';
import Layout from 'components/layout';
import { getSession } from 'http/server/next';
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
            `}
          >
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
  const { query, req } = ctx;
  const { subject, category, id } = query as Params;
  const session = await getSession({ req });

  if (!(subject && category && id && session)) {
    return {
      notFound: true,
    };
  }

  const initialData = await get(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/supercar/v1/community/${category}/update-id`,
    {
      method: 'GET',
      headers: {
        ACCESS_TOKEN: session.accessToken,
      },
      params: id,
    }
  ).then((res) => {
    return res.data;
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
