import { CommunityCard } from 'components/common/card';
import Container from 'components/common/container';
import Typography from 'components/common/typography';
import type { CommunityDto } from 'types/community';
import type { WithBlurredImage } from 'types/market';

import RouterButton from '../routerButton';
import * as Styled from './community.styled';

interface CommunityProps {
  data: WithBlurredImage<CommunityDto>[];
}

const Community = ({ data }: CommunityProps) => {
  return (
    <Container
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <Styled.Wrapper>
        {data.map((d) => (
          <CommunityCard key={d.id} {...d} />
        ))}
      </Styled.Wrapper>
      <RouterButton href="/community">
        <Typography fontSize="header-16" fontWeight="bold" color="black">
          커뮤니티 더보기
        </Typography>
      </RouterButton>
    </Container>
  );
};

export default Community;
