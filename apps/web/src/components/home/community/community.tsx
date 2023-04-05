import * as React from 'react';
import { Container, Typography, Wrapper } from '@supercarmarket/ui';
import type { CommunityDto } from '@supercarmarket/types/community';
import { CommunityCard } from 'components/community';
import { css } from 'styled-components';
import { applyMediaQuery } from 'styles/mediaQuery';
import RouterButton from '../routerButton';
import { useHome } from 'http/server/home';
import { CardSkeleton } from 'components/fallback/loading';
import {
  useBooleanState,
  useIntersectionObserver,
} from '@supercarmarket/hooks';

interface CommunityProps {
  isMobile?: boolean;
}

const Community = ({ isMobile }: CommunityProps) => {
  const pageSize = isMobile ? 4 : 8;
  const [bool, setTrue] = useBooleanState();
  const [entry, setEntry] = useIntersectionObserver({});
  const {
    data: communityBest,
    isLoading,
    isFetching,
  } = useHome<CommunityDto[]>(
    'community',
    {
      pageSize: String(pageSize),
    },
    {
      enabled: !!bool,
    }
  );

  React.useEffect(() => {
    if (entry?.isIntersecting) setTrue();
  }, [entry?.isIntersecting, setTrue]);

  return (
    <Container
      ref={setEntry}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      {isLoading || isFetching ? (
        <CardSkeleton variant="column" size={4} />
      ) : (
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
      )}
      <RouterButton href="/community/paparazzi?category=report">
        <Typography fontSize="header-16" fontWeight="bold" color="black">
          커뮤니티 더보기
        </Typography>
      </RouterButton>
    </Container>
  );
};

export default Community;
