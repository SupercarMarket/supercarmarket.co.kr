import Button from 'components/common/button';
import Typography from 'components/common/typography';
import Layout from 'components/layout';

const Home = () => {
  return (
    <div>
      <Typography as="h1" fontSize="header-36" fontWeight="bold" space>
        {`Hello World\nSupercar Market`}
      </Typography>
      <Button border="rounded" disabled>
        보러가기
      </Button>
    </div>
  );
};

export default Home;

Home.Layout = Layout;
