import { dehydrate, QueryClient } from '@tanstack/react-query';
import Container from 'components/common/container';
import Title from 'components/common/title';
import Community from 'components/home/community';
import Magazine from 'components/home/magazine/magazine';
import { MarketBest, MarketNew } from 'components/home/market';
import Layout from 'components/layout';
import queries from 'constants/queries';
import useHome from 'hooks/queries/home/userHomeMagazine';
import { GetServerSideProps } from 'next';
import { CommunityDto } from 'types/community';
import { MagazineDto } from 'types/magazine';
import { MarketDto } from 'types/market';

const Home = () => {
  const { data: magazine } = useHome<MagazineDto>('magazine');
  const { data: marketBest } = useHome<MarketDto>('best');
  const { data: marketNew } = useHome<MarketDto>('new');
  const { data: communityBest } = useHome<CommunityDto>('community');

  return (
    <Container>
      <Title>슈마매거진</Title>
      {magazine && <Magazine data={magazine.data.slice(0, 5)} />}
      <Title marginTop="80px">매물 관심 베스트</Title>
      {marketBest && <MarketBest marketBest={marketBest.data} />}
      <Title marginTop="40px">최신 매물</Title>
      {marketNew && <MarketNew marketNew={marketNew.data} />}
      <Title marginTop="80px">커뮤니티 인기글</Title>
      {communityBest && <Community data={communityBest.data} />}
    </Container>
  );
};

export default Home;

const queryClient = new QueryClient();

export const getServerSideProps: GetServerSideProps = async () => {
  await Promise.all([
    queryClient.prefetchQuery(queries.home.magazine(), () =>
      fetch(`${process.env.NEXT_PULBIC_URL}/api/home?category=magazine`, {
        method: 'GET',
      }).then((res) => res.json())
    ),
    queryClient.prefetchQuery(queries.home.best(), () =>
      fetch(`${process.env.NEXT_PULBIC_URL}/api/home?category=best`, {
        method: 'GET',
      }).then((res) => res.json())
    ),
    queryClient.prefetchQuery(queries.home.new(), () =>
      fetch(`${process.env.NEXT_PULBIC_URL}/api/home?category=new`, {
        method: 'GET',
      }).then((res) => res.json())
    ),
    queryClient.prefetchQuery(queries.home.community(), () =>
      fetch(`${process.env.NEXT_PULBIC_URL}/api/home?category=community`, {
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
