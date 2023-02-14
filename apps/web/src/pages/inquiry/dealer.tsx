import { Container, Title } from '@supercarmarket/ui';
import type { NextPageWithLayout } from '@supercarmarket/types/base';
import { DealerForm } from 'components/inquiry';
import Layout from 'components/layout/layout';

const Dealer: NextPageWithLayout = () => {
  return (
    <Container display="flex" flexDirection="column" gap="40px">
      <Title>딜러 등록 문의</Title>
      <DealerForm />
    </Container>
  );
};

Dealer.Layout = Layout;

export default Dealer;
