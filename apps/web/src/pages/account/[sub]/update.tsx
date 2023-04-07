import { applyMediaQuery, Container, Title, Wrapper } from '@supercarmarket/ui';
import { AccountUpdateForm } from 'components/account';
import layout from 'components/layout';
import { type NextPageWithLayout, Params } from '@supercarmarket/types/base';
import {
  type GetServerSideProps,
  type InferGetServerSidePropsType,
} from 'next';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from 'components/fallback';
import { getSession } from 'http/server/next';
import { ModalProvider } from 'feature/ModalProvider';
import { css } from 'styled-components';

const ProfileUpdate: NextPageWithLayout = ({
  sub,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <Container>
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
        <Title textAlign="center">개인정보 수정</Title>
        <ModalProvider>
          <QueryErrorResetBoundary>
            {({ reset }) => (
              <ErrorBoundary
                onReset={reset}
                fallbackRender={(props) => <ErrorFallback {...props} />}
              >
                <AccountUpdateForm sub={sub} />
              </ErrorBoundary>
            )}
          </QueryErrorResetBoundary>
        </ModalProvider>
      </Wrapper>
    </Container>
  );
};

ProfileUpdate.Layout = layout;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { req, params } = ctx;
  const { sub } = params as Params;
  const session = await getSession({ req });

  if (sub != session?.sub) {
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

export default ProfileUpdate;
