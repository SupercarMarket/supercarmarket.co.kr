import Container from 'components/common/container';
import Title from 'components/common/title';
import { CommunityForm } from 'components/community';
import layout from 'components/layout';
import { NextPageWithLayout } from 'types/base';

const Create: NextPageWithLayout = () => {
  return (
    <Container>
      <Title>게시글 작성</Title>
      <CommunityForm />
    </Container>
  );
};

Create.Layout = layout;

export default Create;
