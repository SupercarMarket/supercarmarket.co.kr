import { Container, Title } from '@supercarmarket/ui';
import type { NextPageWithLayout } from '@supercarmarket/types/base';
import { CommunityForm } from 'components/community';
import layout from 'components/layout';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { getSession } from 'utils/api/auth/user';
import { serverFetcher } from '@supercarmarket/lib';
import { ModalProvider } from 'feature/modalContext';

const Create: NextPageWithLayout = ({
  temporaryStorage,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <Container display="flex" flexDirection="column" gap="20px">
      <Title>게시글 작성</Title>
      <ModalProvider>
        <CommunityForm temporaryStorage={temporaryStorage} />
      </ModalProvider>
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

  const temporaryStorage = await serverFetcher(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/supercar/v1/community-temp`,
    {
      method: 'GET',
      headers: {
        ACCESS_TOKEN: `${session.accessToken}`,
      },
    }
  ).then((res) => {
    const { ok, status, ...rest } = res;
    return rest;
  });

  return {
    props: {
      temporaryStorage,
    },
  };
};
