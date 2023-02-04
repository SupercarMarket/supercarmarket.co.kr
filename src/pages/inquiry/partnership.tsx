import Container from 'components/common/container';
import Title from 'components/common/title';
import { PartnershipForm } from 'components/inquiry';
import Layout from 'components/layout/layout';

const Partnership = () => {
  return (
    <Container display="flex" flexDirection="column" gap="40px">
      <Title>제휴업체 등록 문의</Title>
      <PartnershipForm />
    </Container>
  );
};

Partnership.Layout = Layout;

export default Partnership;
