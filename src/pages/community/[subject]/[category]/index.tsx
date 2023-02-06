import Container from 'components/common/container';
import Tab from 'components/common/tab';
import Title from 'components/common/title';
import Wrapper from 'components/common/wrapper';
import { CommunityList } from 'components/community';
import CommunityNavbar from 'components/community/communityNavbar';
import layout from 'components/layout';
import { css } from 'styled-components';

const CommunityCategory = () => {
  return (
    <Container display="flex" flexDirection="column" gap="27.5px">
      <Title>커뮤니티 인기글</Title>
      <Wrapper
        css={css`
          position: relative;
        `}
      >
        <Wrapper.Item
          css={css`
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
          `}
        >
          <Title>제보</Title>
          <Tab />
        </Wrapper.Item>
        <CommunityNavbar />
      </Wrapper>
      <CommunityList />
    </Container>
  );
};

CommunityCategory.Layout = layout;

export default CommunityCategory;
