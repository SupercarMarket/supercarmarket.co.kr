import { PhoneForm } from 'components/auth';
import Container from 'components/common/container';
import Title from 'components/common/title';
import layout from 'components/layout';
import { AuthProvider } from 'feature/authProvider';
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next';
import type { Params } from 'types/base';

const Phone = ({
  uuid,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <Container
      display="flex"
      flexDirection="column"
      alignItems="center"
      margin="80px 0"
      gap="60px"
    >
      <Title textAlign="center">핸드폰 인증</Title>
      <AuthProvider>
        <PhoneForm uuid={uuid} />
      </AuthProvider>
    </Container>
  );
};

Phone.Layout = layout;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const { uuid } = ctx.query as Params;

  if (!uuid) return { notFound: true };

  return {
    props: {
      uuid,
    },
  };
};

export default Phone;
