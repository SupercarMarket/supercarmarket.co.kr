import {
  applyMediaQuery,
  Container,
  Typography,
  Wrapper,
} from '@supercarmarket/ui';
import type { MarketDto } from '@supercarmarket/types/market';
import MarketCard from 'components/market/marketCard';
import { css } from 'styled-components';
import RouterButton from '../routerButton';
import { useHome } from 'http/server/home';
import { CardSkeleton } from 'components/fallback/loading';

interface MarketProps {
  isMobile?: boolean;
}

const MarketNew = ({ isMobile }: MarketProps) => {
  const pageSize = isMobile ? 4 : 8;

  const {
    data: marketNew,
    isLoading,
    isFetching,
  } = useHome<MarketDto[]>('new', {
    pageSize: String(pageSize),
  });

  if (isLoading || isFetching)
    return <CardSkeleton size={pageSize} variant="column" />;

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
          column-gap: 20px;
          row-gap: 40px;
          margin-bottom: 40px;
          ${applyMediaQuery('mobile')} {
            column-gap: 8px;
            row-gap: 16px;
            grid-template-columns: 1fr 1fr;
          }
        `}
      >
        {marketNew &&
          marketNew.data
            .slice(0, isMobile ? 4 : 8)
            .map((post) => <MarketCard key={post.id} {...post} />)}
      </Wrapper>
      <RouterButton href="/market">
        <Typography fontSize="header-16" fontWeight="bold" color="black">
          최신매물
        </Typography>
      </RouterButton>
    </Container>
  );
};

export default MarketNew;
