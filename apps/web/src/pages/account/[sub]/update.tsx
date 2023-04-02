import { Container, Title } from '@supercarmarket/ui';
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

const ProfileUpdate: NextPageWithLayout = ({
  sub,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <Container
      display="flex"
      flexDirection="column"
      alignItems="center"
      margin="80px 0"
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
