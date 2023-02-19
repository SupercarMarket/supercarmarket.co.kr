import { Container, Title } from '@supercarmarket/ui';
import type { NextPageWithLayout } from '@supercarmarket/types/base';
import { SaleForm } from 'components/inquiry';
import Layout from 'components/layout/layout';

const Market: NextPageWithLayout = () => {
  return (
    <Container display="flex" flexDirection="column" gap="40px">
      <Title>판매차량 등록 문의</Title>
      <SaleForm />
    </Container>
  );
};

Market.Layout = Layout;

export default Market;
