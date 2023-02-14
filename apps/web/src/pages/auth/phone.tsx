import { Container, Title } from '@supercarmarket/ui';
import { PhoneForm } from 'components/auth';
import AuthLayout from 'components/layout/authLayout';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import type { NextPageWithLayout, Params } from '@supercarmarket/types/base';

const Phone: NextPageWithLayout = ({
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
      <PhoneForm uuid={uuid} />
    </Container>
  );
};

Phone.Layout = AuthLayout;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { uuid } = ctx.query as Params;

  if (!uuid) return { notFound: true };

  return {
    props: {
      uuid,
    },
  };
};

export default Phone;
