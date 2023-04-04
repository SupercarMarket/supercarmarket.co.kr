import { Container, Typography, Wrapper } from '@supercarmarket/ui';
import type { CommunityDto } from '@supercarmarket/types/community';
import { CommunityCard } from 'components/community';
import { css } from 'styled-components';
import { applyMediaQuery } from 'styles/mediaQuery';

import RouterButton from '../routerButton';
import { useHome } from 'http/server/home';

interface CommunityProps {
  isMobile?: boolean;
}

const Community = ({ isMobile }: CommunityProps) => {
  const { data: communityBest } = useHome<CommunityDto[]>('community', {
    pageSize: isMobile ? '4' : '8',
  });

  return (
    <Container
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <Wrapper
        css={css`
          display: grid;
          grid-template-columns: 1fr 1fr 1fr 1fr;
          gap: 20px;
          margin-bottom: 40px;
          ${applyMediaQuery('mobile')} {
            column-gap: 8px;
            row-gap: 16px;
            grid-template-columns: 1fr 1fr;
          }
        `}
      >
        {communityBest &&
          communityBest.data.map((d) => (
            <CommunityCard key={d.id} variant="column" {...d} />
          ))}
      </Wrapper>
      <RouterButton href="/community/paparazzi?category=report">
        <Typography fontSize="header-16" fontWeight="bold" color="black">
          커뮤니티 더보기
        </Typography>
      </RouterButton>
    </Container>
  );
};

export default Community;
