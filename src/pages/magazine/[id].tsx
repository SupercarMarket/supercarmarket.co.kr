import Comment from 'components/common/comment';
import Container from 'components/common/container';
import Posting from 'components/common/posting';
import layout from 'components/layout';
import MagazineDealer from 'components/magazine/magazineDealer';
import { ModalProvider } from 'feature/modalContext';
import useComment from 'hooks/queries/useComment';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import type { ParsedUrlQuery } from 'querystring';

interface IParams extends ParsedUrlQuery {
  id: string;
}

const MagazinePost = ({
  id,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { data: comment } = useComment(id, {
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
        {comment && <Comment {...comment} />}
      </Container>
    </ModalProvider>
  );
};

export default MagazinePost;

MagazinePost.Layout = layout;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params as IParams;

  return {
    props: {
      id,
    },
  };
};
