import { Container, Title, Wrapper } from '@supercarmarket/ui';
import type { NextPageWithLayout } from '@supercarmarket/types/base';
import layout from 'components/layout';
import { GetServerSideProps } from 'next';
import { css } from 'styled-components';
import { getSession } from 'http/server/next';
import { ModalProvider } from 'feature/ModalProvider';
import { CommunityCreate } from 'components/community/communityForm';

const Create: NextPageWithLayout = () => {
  return (
    <Container>
      <Wrapper
        css={css`
          display: flex;
          flex-direction: column;
          gap: 20px;
        `}
      >
        <Title>게시글 작성</Title>
        <ModalProvider>
          <CommunityCreate />
        </ModalProvider>
      </Wrapper>
    </Container>
  );
};

Create.Layout = layout;

export default Create;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { req } = ctx;
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: '/auth/signin',
        permanent: false,
      },
    };
  }

  return {
    props: {
      sub: session.sub,
    },
  };
};
