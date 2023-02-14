import { Container, Title } from '@supercarmarket/ui';
import type { NextPageWithLayout } from '@supercarmarket/types/base';
import { CommunityForm } from 'components/community';
import layout from 'components/layout';

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
