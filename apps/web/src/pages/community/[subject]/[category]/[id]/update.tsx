import { serverFetcher } from '@supercarmarket/lib';
import { NextPageWithLayout, Params } from '@supercarmarket/types/base';
import { Container, Title } from '@supercarmarket/ui';
import { CommunityForm } from 'components/community';
import Layout from 'components/layout';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';

const CommunityUpdate: NextPageWithLayout = ({
  initialData,
  id,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <Container display="flex" flexDirection="column" gap="20px">
      <Title>게시글 수정</Title>
      <CommunityForm initialData={initialData} id={id} />
    </Container>
  );
};

CommunityUpdate.Layout = Layout;

export default CommunityUpdate;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { query } = ctx;
  const { subject, category, id } = query as Params;

  if (!(subject && category && id)) {
    return {
      notFound: true,
    };
  }

  const initialData = await serverFetcher(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/supercar/v1/community/${category}/update-id`,
    {
      method: 'GET',
      params: id,
    }
  ).then((res) => {
    const { ok, status, ...rest } = res;
    return rest.data;
  });

  return {
    props: {
      subject,
      category,
      id,
      initialData: {
        title: 'hello world',
        category: 'boast',
        contents: '<p>인증..!</p>',
      },
    },
  };
};
