import { AccountUpdateForm } from 'components/account';
import Container from 'components/common/container';
import Title from 'components/common/title';
import layout from 'components/layout';
import { GetServerSidePropsContext } from 'next';
import React from 'react';
import { Params } from 'types/base';
import { getSession } from 'utils/api/auth/user';

const ProfileUpdate = () => {
  return (
    <Container
      display="flex"
      flexDirection="column"
      alignItems="center"
      margin="80px 0"
    >
      <Title textAlign="center">개인정보 수정</Title>
      <AccountUpdateForm />
    </Container>
  );
};

ProfileUpdate.Layout = layout;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
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
