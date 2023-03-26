import { applyMediaQuery, Container, Title, Wrapper } from '@supercarmarket/ui';
import type { NextPageWithLayout } from '@supercarmarket/types/base';
import { SaleForm } from 'components/inquiry';
import Layout from 'components/layout/layout';
import { css } from 'styled-components';
import { ModalProvider } from 'feature/modalContext';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { serverFetcher } from '@supercarmarket/lib';
import { getSession } from 'http/server/auth/user';

const Market: NextPageWithLayout = ({
  role,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <Container>
      <Wrapper
        css={css`
          display: flex;
          flex-direction: column;
          gap: 40px;
          ${applyMediaQuery('mobile')} {
            padding: 0 16px;
          }
        `}
      >
        <Title>판매차량 등록 문의</Title>
        <ModalProvider>
          <SaleForm role={role} />
        </ModalProvider>
      </Wrapper>
    </Container>
  );
};

Market.Layout = Layout;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { req } = ctx;

  const session = await getSession({ req });

  if (!session) {
    return {
      notFound: true,
    };
  }

  const { ok, status, ...result } = await serverFetcher(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/supercar/v1/user/info`,
    {
      method: 'GET',
      headers: {
        ACCESS_TOKEN: session.accessToken,
      },
    }
  );

  if (!ok) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      role: result.data.role,
    },
  };
};

export default Market;
