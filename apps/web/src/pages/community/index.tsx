import { type GetServerSideProps } from 'next';

function RedirectPage() {
  return;
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      permanent: false,
      destination: '/community/paparazzi?category=report',
    },
  };
};

export default RedirectPage;
