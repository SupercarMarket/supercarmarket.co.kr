import { FindForm } from 'components/auth';
import Container from 'components/common/container';
import Title from 'components/common/title';
import AuthLayout from 'components/layout/authLayout';
import { useAuthDispatch } from 'feature/authProvider';
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next';
import * as React from 'react';
import type { Params } from 'types/base';
import { isValidQuery } from 'utils/misc';

const Find = ({
  type,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const dispatch = useAuthDispatch();

  React.useLayoutEffect(() => {
    dispatch({ type: 'RESET_FIELD_AUTH' });
  });
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
      {(type === 'id' || type === 'password') && <FindForm type={type} />}
    </Container>
  );
};

Find.Layout = AuthLayout;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const { query } = ctx;
  const { type } = query as Params;

  if (!isValidQuery(type, 'id', 'password')) return { notFound: true };

  return {
    props: {
      type,
    },
  };
};

export default Find;
