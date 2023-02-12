import { AccountUpdateForm } from 'components/account';
import Container from 'components/common/container';
import Title from 'components/common/title';
import layout from 'components/layout';
import { AuthProvider } from 'feature/authProvider';
import { GetServerSideProps } from 'next';
import React from 'react';
import type { NextPageWithLayout, Params } from 'types/base';
import { getSession } from 'utils/api/auth/user';

const ProfileUpdate: NextPageWithLayout = () => {
  return (
    <Container
      display="flex"
      flexDirection="column"
      alignItems="center"
      margin="80px 0"
    >
      <Title textAlign="center">개인정보 수정</Title>
      <AuthProvider>
        <AccountUpdateForm />
      </AuthProvider>
    </Container>
  );
};

ProfileUpdate.Layout = layout;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { req, params } = ctx;
  const { sub } = params as Params;
  const session = await getSession({ req });

  if (sub !== session?.sub) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      title: '',
    },
  };
};

export default ProfileUpdate;
