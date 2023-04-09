import { applyMediaQuery, Container, Title, Wrapper } from '@supercarmarket/ui';
import type { NextPageWithLayout, Params } from '@supercarmarket/types/base';
import layout from 'components/layout';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { AccountPasswordForm } from 'components/account';
import { getSession } from 'http/server/next';
import { css } from 'styled-components';

const ProfilePasswordUpdate: NextPageWithLayout = ({
  sub,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <Container width="100%">
      <Wrapper
        css={css`
          width: 100%;
          display: flex;
          align-items: center;
          flex-direction: column;
          margin-top: 53px;
          gap: 60px;
          ${applyMediaQuery('mobile')} {
            margin-top: 24px;
            gap: 24px;
          }
        `}
      >
        <Title textAlign="center">비밀번호 수정</Title>
        <AccountPasswordForm sub={sub} />
      </Wrapper>
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
