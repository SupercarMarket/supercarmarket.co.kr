import { dehydrate, QueryClient } from '@tanstack/react-query';
import Container from 'components/common/container';
import Title from 'components/common/title';
import Magazine from 'components/home/magazine/magazine';
import Layout from 'components/layout';
import queries from 'constants/queries';
import useMagazine from 'hooks/queries/useMagazine';
import { GetServerSideProps } from 'next';

const Home = () => {
  const { data: magazine } = useMagazine();
  return (
    <Container>
      <Title>슈마매거진</Title>
      {magazine && <Magazine data={magazine.data.slice(0, 5)} />}
      <Title>매물 관심 베스트</Title>
    </Container>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery(queries.magazine.lists(), () =>
      fetch('http://localhost:3000/api/magazine', {
        method: 'GET',
      }).then((res) => res.json())
    ),
  ]);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

Home.Layout = Layout;
