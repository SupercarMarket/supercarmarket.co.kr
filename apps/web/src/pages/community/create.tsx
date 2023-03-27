import { Container, Title, Wrapper } from '@supercarmarket/ui';
import type { NextPageWithLayout } from '@supercarmarket/types/base';
import { CommunityForm } from 'components/community';
import layout from 'components/layout';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { getSession } from 'http/server/auth/user';
import { serverFetcher } from '@supercarmarket/lib';
import { ModalProvider } from 'feature/modalContext';
import { CommunityTemporaryStorageDto } from '@supercarmarket/types/community';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from 'components/fallback';
import { css } from 'styled-components';
import Advertisement from 'components/common/advertisement';

const Create: NextPageWithLayout = ({
  temporaryStorage,
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
            <Title>게시글 작성</Title>
            <ErrorBoundary
              onReset={reset}
              fallbackRender={(props) => (
                <ErrorFallback margin="100px 0" {...props} />
              )}
            >
              <ModalProvider>
                <CommunityForm initialData={temporaryStorage} />
              </ModalProvider>
            </ErrorBoundary>
          </Wrapper>
        )}
      </QueryErrorResetBoundary>
    </Container>
  );
};

Create.Layout = layout;

export default Create;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { req } = ctx;
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: '/auth/signin',
        permanent: false,
      },
    };
  }

  const temporaryStorage: CommunityTemporaryStorageDto | null =
    await serverFetcher(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/supercar/v1/community-temp`,
      {
        method: 'GET',
        headers: {
          ACCESS_TOKEN: `${session.accessToken}`,
        },
      }
    ).then((res) => {
      const { ok, status, ...rest } = res;
      console.log(rest);
      return rest.data;
    });

  return {
    props: {
      temporaryStorage,
    },
  };
};
