import Container from 'components/common/container';
import Title from 'components/common/title';
import { InquiryNavbar } from 'components/inquiry';
import Layout from 'components/layout/layout';
import inquiry from 'constants/inquiry';

const Inquiry = () => {
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
