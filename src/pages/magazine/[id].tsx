import { dehydrate, QueryClient } from '@tanstack/react-query';
import Comment from 'components/common/comment';
import Container from 'components/common/container';
import Posting from 'components/common/posting';
import layout from 'components/layout';
import MagazineDealer from 'components/magazine/magazineDealer';
import queries from 'constants/queries';
import { ModalProvider } from 'feature/modalContext';
import useComment from 'hooks/queries/useComment';
import useMagazinePost from 'hooks/queries/useMagazinePost';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import type { ParsedUrlQuery } from 'querystring';
import { baseFetcher } from 'utils/api/fetcher';

interface IParams extends ParsedUrlQuery {
  id: string;
}

const MagazinePost = ({
  id,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { data: comment, refetch } = useComment(id, {
    enabled: !!id,
  });
  const { data: magazinePost } = useMagazinePost(id, {
    enabled: !!id,
  });

  return (
    <ModalProvider>
      <Container
        display="flex"
        alignItems="center"
        justifyContent="flex-start"
        flexDirection="column"
        gap="80px"
      >
        <Posting />
        <MagazineDealer />
        {comment && <Comment id={id} {...comment} />}
      </Container>
    </ModalProvider>
  );
};

export default MagazinePost;

MagazinePost.Layout = layout;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params as IParams;

  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery(queries.comment.id(id), () =>
      baseFetcher(`${process.env.NEXT_PUBLIC_URL}/api/comment`, {
        method: 'GET',
        params: id,
      })
    ),
    queryClient.prefetchQuery(queries.magazine.id(id), () =>
      baseFetcher(`${process.env.NEXT_PUBLIC_URL}/api/magazine`, {
        method: 'GET',
        params: id,
      })
    ),
  ]);

  return {
    props: {
      id,
      dehydratedState: dehydrate(queryClient),
    },
  };
};
