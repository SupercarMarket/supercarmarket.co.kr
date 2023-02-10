import Container from 'components/common/container';
import Title from 'components/common/title';
import { DealerForm } from 'components/inquiry';
import Layout from 'components/layout/layout';
import { NextPageWithLayout } from 'types/base';

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
