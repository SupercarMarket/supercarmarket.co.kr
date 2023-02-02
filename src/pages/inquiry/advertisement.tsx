import Container from 'components/common/container';
import Title from 'components/common/title';
import { AdvertisementForm } from 'components/inquiry';
import Layout from 'components/layout/layout';

const Advertisement = () => {
  return (
    <Container display="flex" flexDirection="column" gap="40px">
      <Title>광고 문의</Title>
      <AdvertisementForm />
    </Container>
  );
};

Advertisement.Layout = Layout;

export default Advertisement;
