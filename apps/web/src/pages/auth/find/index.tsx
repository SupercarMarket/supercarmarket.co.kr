import { Container, Title } from '@supercarmarket/ui';
import type { NextPageWithLayout, Params } from '@supercarmarket/types/base';
import { FindForm } from 'components/auth';
import AuthLayout from 'components/layout/authLayout';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import * as React from 'react';
import { isValidQuery } from 'utils/misc';
import { ModalProvider } from 'feature/modalContext';

const Find: NextPageWithLayout = ({
  type,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <Container
      display="flex"
      flexDirection="column"
      alignItems="center"
      margin="80px 0"
      gap="60px"
    >
      <Title textAlign="center">
        {type === 'id' ? '아이디' : '비밀번호'} 찾기
      </Title>
      <ModalProvider>
        <FindForm type={type} />
      </ModalProvider>
    </Container>
  );
};

Find.Layout = AuthLayout;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { query } = ctx;
  const { type } = query as Params;

  if (!isValidQuery(type, 'id', 'password', 'result-password'))
    return { notFound: true };

  return {
    props: {
      type,
    },
  };
};

export default Find;
