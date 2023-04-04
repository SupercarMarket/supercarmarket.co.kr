import { Container, Wrapper } from '@supercarmarket/ui';
import type { MarketDto } from '@supercarmarket/types/market';
import MarketCard from 'components/market/marketCard';
import { css } from 'styled-components';
import { applyMediaQuery } from 'styles/mediaQuery';
import { useHome } from 'http/server/home';
import { CardSkeleton } from 'components/fallback/loading';

interface MarketProps {
  isMobile?: boolean;
}

const Market = ({ isMobile }: MarketProps) => {
  const pageSize = isMobile ? 4 : 8;
  const {
    data: marketBest,
    isLoading,
    isFetching,
  } = useHome<MarketDto[]>('best', {
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
        {marketBest &&
          marketBest.data
            .slice(0, isMobile ? 4 : 8)
            .map((post, index) => (
              <MarketCard key={post.id} ranking={index + 1} {...post} />
            ))}
      </Wrapper>
    </Container>
  );
};

export default Market;
