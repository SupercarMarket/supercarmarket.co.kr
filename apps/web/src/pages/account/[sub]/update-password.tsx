import { Container, Title } from '@supercarmarket/ui';
import type { NextPageWithLayout, Params } from '@supercarmarket/types/base';
import layout from 'components/layout';
import { GetServerSideProps } from 'next';
import { getSession } from 'utils/api/auth/user';
import { AccountPasswordForm } from 'components/account';

const ProfilePasswordUpdate: NextPageWithLayout = () => {
  return (
    <Container
      display="flex"
      flexDirection="column"
      alignItems="center"
      margin="80px 0"
    >
      <Title textAlign="center">비밀번호 수정</Title>
      <AccountPasswordForm />
    </Container>
  );
};

ProfilePasswordUpdate.Layout = layout;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { req, query } = ctx;
  const { sub } = query as Params;
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: '/auth/signin',
        permanent: false,
      },
    };
  }

  if (sub != session.sub) {
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

export default ProfilePasswordUpdate;
