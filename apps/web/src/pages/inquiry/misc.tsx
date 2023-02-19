import { Container, Title } from '@supercarmarket/ui';
import type { NextPageWithLayout } from '@supercarmarket/types/base';
import { MiscForm } from 'components/inquiry';
import Layout from 'components/layout/layout';

const Misc: NextPageWithLayout = () => {
  return (
    <Container display="flex" flexDirection="column" gap="40px">
      <Title>기타 문의</Title>
      <MiscForm />
    </Container>
  );
};

Misc.Layout = Layout;

export default Misc;
