import { Container, Title } from '@supercarmarket/ui';
import type { NextPageWithLayout, Params } from '@supercarmarket/types/base';
import { AccountUpdateForm } from 'components/account';
import layout from 'components/layout';
import { AuthProvider } from 'feature/authProvider';
import type { GetServerSideProps } from 'next';
import { getSession } from 'utils/api/auth/user';
import { ModalProvider } from 'feature/modalContext';

const ProfileUpdate: NextPageWithLayout = () => {
  return (
    <Container
      display="flex"
      flexDirection="column"
      alignItems="center"
      margin="80px 0"
    >
      <Title textAlign="center">개인정보 수정</Title>
      <ModalProvider>
        <AuthProvider>
          <AccountUpdateForm />
        </AuthProvider>
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
