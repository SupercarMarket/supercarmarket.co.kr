import Container from 'components/common/container';
import Title from 'components/common/title';
import Layout from 'components/layout/layout';
import inquiry from 'constants/inquiry';

const Inquiry = () => {
  return (
    <Container>
      <Title>어떤 문의를 원하시나요?</Title>
      {inquiry.links.map((list) => (
        <div key={list.title}>{list.title}</div>
      ))}
    </Container>
  );
};

Inquiry.Layout = Layout;

export default Inquiry;
