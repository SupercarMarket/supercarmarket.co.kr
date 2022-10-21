import { dehydrate, QueryClient } from '@tanstack/react-query';
import Container from 'components/common/container';
import Title from 'components/common/title';
import layout from 'components/layout';
import { MagazineBanner, MagazineList } from 'components/magazine';
import queries from 'constants/queries';
import useMagazine from 'hooks/queries/useMagazine';
import { useRouter } from 'next/router';
import { GetStaticProps } from 'next/types';
import { useMemo } from 'react';

const Magazine = () => {
  const { data: magazine } = useMagazine();
  const { query } = useRouter();
  const page = useMemo(
    () =>
      query.page && typeof query.page === 'string' ? parseInt(query.page) : 0,
    [query.page]
  );
  return (
    <Container
      display="flex"
      flexDirection="column"
      alignItems="center"
      margin="20px 0 0 0"
    >
      <Title>따끈따끈한 최근 소식</Title>
      {magazine && <MagazineBanner data={magazine.data[0]} />}
      {magazine && <MagazineList data={magazine} page={page} />}
    </Container>
  );
};

export default Magazine;

Magazine.Layout = layout;

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(queries.magazine.lists(), () =>
    fetch('http://localhost:3000/api/magazine', {
      method: 'GET',
    }).then((res) => res.json())
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
