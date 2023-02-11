import Container from 'components/common/container';
import Title from 'components/common/title';
import { MiscForm } from 'components/inquiry';
import Layout from 'components/layout/layout';
import { NextPageWithLayout } from 'types/base';

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