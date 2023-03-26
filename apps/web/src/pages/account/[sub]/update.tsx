import { Container, Title } from '@supercarmarket/ui';
import { AccountUpdateForm } from 'components/account';
import layout from 'components/layout';
import { type NextPageWithLayout, Params } from '@supercarmarket/types/base';
import {
  type GetServerSideProps,
  type InferGetServerSidePropsType,
} from 'next';
import { getSession } from 'http/server/auth/user';
import { ModalProvider } from 'feature/modalContext';

const ProfileUpdate: NextPageWithLayout = ({
  sub,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <Container
      display="flex"
      flexDirection="column"
      alignItems="center"
      margin="80px 0"
    >
      <Title textAlign="center">개인정보 수정</Title>
      <ModalProvider>
        <AccountUpdateForm sub={sub} />
      </ModalProvider>
    </Container>
  );
};

ProfileUpdate.Layout = layout;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { req, params } = ctx;
  const { sub } = params as Params;
  const session = await getSession({ req });

  if (sub != session?.sub) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      sub,
    },
  };
};

export default ProfileUpdate;
