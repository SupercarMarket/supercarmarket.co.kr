import Container from 'components/common/container';
import Title from 'components/common/title';
import layout from 'components/layout';

const CommunityCategory = () => {
  return (
    <Container>
      <Title>커뮤니티 인기글</Title>
      <Title>제보</Title>
    </Container>
  );
};

CommunityCategory.Layout = layout;

export default CommunityCategory;
