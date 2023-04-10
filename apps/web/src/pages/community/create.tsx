import { Container, Title, Wrapper } from '@supercarmarket/ui';
import type { NextPageWithLayout } from '@supercarmarket/types/base';
import layout from 'components/layout';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from 'components/fallback';
import { css } from 'styled-components';
import { prefetchTemporaryStorage } from 'http/server/community';
import { getSession } from 'http/server/next';
import { ModalProvider } from 'feature/ModalProvider';
import { CommunityForm } from 'components/community';
import CommunityCreate from 'components/community/communityForm/communityCreate';

const Create: NextPageWithLayout = ({
  temporaryStorage,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <Container>
      <Wrapper
        css={css`
          display: flex;
          flex-direction: column;
          gap: 20px;
        `}
      >
        <Title>게시글 작성</Title>
        <ModalProvider>
          <CommunityCreate />
        </ModalProvider>
      </Wrapper>
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

  const temporaryStorage = await prefetchTemporaryStorage(
    session.accessToken
  ).then((res) => res.data);

  return {
    props: {
      temporaryStorage: temporaryStorage,
    },
  };
};
