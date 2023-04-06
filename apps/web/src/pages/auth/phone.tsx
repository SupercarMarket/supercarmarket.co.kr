import { applyMediaQuery, Container, Title, Wrapper } from '@supercarmarket/ui';
import { PhoneForm } from 'components/auth';
import AuthLayout from 'components/layout/authLayout';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import type { NextPageWithLayout, Params } from '@supercarmarket/types/base';
import { css } from 'styled-components';

const Phone: NextPageWithLayout = ({
  uuid,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <Container display="flex" justifyContent="center">
      <Wrapper
        css={css`
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 60px;
          padding: 53px;
          ${applyMediaQuery('mobile')} {
            gap: 24px;
            padding: 24px;
            width: 328px;
          }
        `}
      >
        <Title textAlign="center">핸드폰 인증</Title>
        <PhoneForm uuid={uuid} />
      </Wrapper>
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
