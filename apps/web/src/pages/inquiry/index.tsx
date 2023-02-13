import { Container, Title } from '@supercarmarket/ui';
import type { NextPageWithLayout } from '@supercarmarket/types/base';
import { InquiryNavbar } from 'components/inquiry';
import Layout from 'components/layout/layout';
import inquiry from 'constants/inquiry';

const Inquiry: NextPageWithLayout = () => {
  return (
    <Container display="flex" flexDirection="column" gap="20px">
      <Title>어떤 문의를 원하시나요?</Title>
      {inquiry.links.map((list) => (
        <InquiryNavbar key={list.title} {...list} />
      ))}
    </Container>
  );
};

Inquiry.Layout = Layout;

export default Inquiry;
