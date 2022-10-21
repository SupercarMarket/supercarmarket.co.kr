import { dehydrate, QueryClient } from '@tanstack/react-query';
import Title from 'components/common/title';
import layout from 'components/layout';
import { MagazineBanner } from 'components/magazine';
import queries from 'constants/queries';
import useMagazine from 'hooks/queries/useMagazine';
import { GetStaticProps } from 'next/types';

const Magazine = () => {
  const { data: magazine } = useMagazine();
  return (
    <div>
      <Title>따끈따끈한 최근 소식</Title>
      {magazine && <MagazineBanner data={magazine.data[0]} />}
    </div>
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
