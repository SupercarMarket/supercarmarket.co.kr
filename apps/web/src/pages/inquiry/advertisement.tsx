import { Container, Title } from '@supercarmarket/ui';
import type { NextPageWithLayout } from '@supercarmarket/types/base';
import { AdvertisementForm } from 'components/inquiry';
import Layout from 'components/layout/layout';

const Advertisement: NextPageWithLayout = () => {
  return (
    <Container display="flex" flexDirection="column" gap="40px">
      <Title>광고 문의</Title>
      <AdvertisementForm />
    </Container>
  );
};

Advertisement.Layout = Layout;

export default Advertisement;
